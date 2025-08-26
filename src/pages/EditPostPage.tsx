import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "@/components/PostForm";
import { usePosts } from "@/hooks/usePosts";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const EditPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPost, updatePost } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const fetchedPost = await getPost(parseInt(id));
        setPost(fetchedPost);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id, getPost]);

  const handleSubmit = async (updatedPost: { title: string; body: string; userId: number }) => {
    if (post) {
      try {
        await updatePost(post.id, updatedPost);
        navigate(`/posts/${post.id}`);
      } catch (error) {
        // Error handling is done in the hook
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground">The post you're trying to edit doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <PostForm post={post} onSubmit={handleSubmit} isEditing />;
};

export default EditPostPage;