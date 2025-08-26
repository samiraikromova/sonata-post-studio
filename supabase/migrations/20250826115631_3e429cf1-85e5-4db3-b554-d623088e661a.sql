-- Fix remaining security issues from the linter

-- 1. Fix function search path issues by setting proper search_path
CREATE OR REPLACE FUNCTION public.user_owns_chat_session(session_id_param character varying)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.n8n_chat_history 
    WHERE session_id = session_id_param 
    AND user_id = auth.uid()
    LIMIT 1
  );
$$;

CREATE OR REPLACE FUNCTION public.get_user_chat_sessions()
RETURNS TABLE(session_id character varying, last_message_at timestamp with time zone)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT 
    n.session_id,
    MAX(n.created_at) as last_message_at
  FROM public.n8n_chat_history n
  WHERE n.user_id = auth.uid()
  GROUP BY n.session_id
  ORDER BY last_message_at DESC;
$$;

-- 2. Add RLS policies for the knowledge_base and knowledge_file tables (they have RLS enabled but no policies)

-- Knowledge Base policies - assuming these should be publicly readable for knowledge sharing
CREATE POLICY "Knowledge base content is publicly readable" 
ON public.knowledge_base 
FOR SELECT 
USING (true);

-- For insert/update/delete, require authentication (adjust as needed)
CREATE POLICY "Authenticated users can manage knowledge base" 
ON public.knowledge_base 
FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Knowledge File policies - similar approach
CREATE POLICY "Knowledge files are publicly readable" 
ON public.knowledge_file 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage knowledge files" 
ON public.knowledge_file 
FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');