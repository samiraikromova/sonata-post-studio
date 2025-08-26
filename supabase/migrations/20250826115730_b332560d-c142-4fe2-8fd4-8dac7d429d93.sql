-- Fix the remaining function search path issue for the match_documents function
CREATE OR REPLACE FUNCTION public.match_documents(query_embedding vector, match_count integer DEFAULT NULL::integer, filter jsonb DEFAULT '{}'::jsonb)
RETURNS TABLE(id uuid, content text, file_name text, file_id uuid, similarity double precision)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
#variable_conflict use_column
BEGIN
  RETURN QUERY
  SELECT
    kb.id,
    kb.content,
    kf.file_name,
    kb.file_id,
    1 - (kb.embedding <=> query_embedding) AS similarity
  FROM knowledge_base kb
  JOIN knowledge_file kf ON kb.file_id = kf.id
  ORDER BY kb.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;