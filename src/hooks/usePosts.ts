import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const API_BASE = 'https://jsonplaceholder.typicode.com';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/posts`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (post: Omit<Post, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      
      if (!response.ok) throw new Error('Failed to create post');
      
      const newPost = await response.json();
      // Since JSONPlaceholder doesn't persist data, we'll add it locally
      setPosts(prev => [{ ...newPost, id: Date.now() }, ...prev]);
      
      toast({
        title: "Success",
        description: "Post created successfully!",
      });
      
      return newPost;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePost = async (id: number, post: Omit<Post, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...post, id }),
      });
      
      if (!response.ok) throw new Error('Failed to update post');
      
      const updatedPost = await response.json();
      setPosts(prev => prev.map(p => p.id === id ? updatedPost : p));
      
      toast({
        title: "Success",
        description: "Post updated successfully!",
      });
      
      return updatedPost;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deletePost = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE}/posts/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete post');
      
      setPosts(prev => prev.filter(p => p.id !== id));
      
      toast({
        title: "Success",
        description: "Post deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getPost = async (id: number): Promise<Post | null> => {
    try {
      const response = await fetch(`${API_BASE}/posts/${id}`);
      if (!response.ok) throw new Error('Failed to fetch post');
      return await response.json();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch post. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    getPost,
    refetch: fetchPosts,
  };
};