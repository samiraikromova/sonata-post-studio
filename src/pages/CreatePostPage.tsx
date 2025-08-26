import { useNavigate } from "react-router-dom";
import PostForm from "@/components/PostForm";
import { usePosts } from "@/hooks/usePosts";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { createPost } = usePosts();

  const handleSubmit = async (post: { title: string; body: string; userId: number }) => {
    try {
      await createPost(post);
      navigate("/posts");
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  return <PostForm onSubmit={handleSubmit} />;
};

export default CreatePostPage;