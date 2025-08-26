-- Fix n8n_chat_history security issue by adding user association and proper RLS policies

-- 1. Add user_id column to associate chat history with users
ALTER TABLE public.n8n_chat_history 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Create index for better performance on user_id queries
CREATE INDEX idx_n8n_chat_history_user_id ON public.n8n_chat_history(user_id);
CREATE INDEX idx_n8n_chat_history_session_user ON public.n8n_chat_history(session_id, user_id);

-- 3. Create RLS policies to secure chat conversations

-- Policy 1: Users can only view their own chat history
CREATE POLICY "Users can view their own chat history" 
ON public.n8n_chat_history 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 2: Users can only insert chat messages for themselves
CREATE POLICY "Users can insert their own chat messages" 
ON public.n8n_chat_history 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users can update their own chat messages (if needed for editing)
CREATE POLICY "Users can update their own chat messages" 
ON public.n8n_chat_history 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy 4: Users can delete their own chat messages
CREATE POLICY "Users can delete their own chat messages" 
ON public.n8n_chat_history 
FOR DELETE 
USING (auth.uid() = user_id);

-- 5. Create a function to help with session-based access (if needed)
CREATE OR REPLACE FUNCTION public.user_owns_chat_session(session_id_param character varying)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.n8n_chat_history 
    WHERE session_id = session_id_param 
    AND user_id = auth.uid()
    LIMIT 1
  );
$$;

-- 6. Add a helper function to get user's chat sessions
CREATE OR REPLACE FUNCTION public.get_user_chat_sessions()
RETURNS TABLE(session_id character varying, last_message_at timestamp with time zone)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT DISTINCT 
    n.session_id,
    MAX(n.created_at) as last_message_at
  FROM public.n8n_chat_history n
  WHERE n.user_id = auth.uid()
  GROUP BY n.session_id
  ORDER BY last_message_at DESC;
$$;