import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePosts } from "@/hooks/usePosts";
import { ArrowLeft, Edit, Trash2, Calendar, User } from "lucide-react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost, deletePost } = usePosts();
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

  const handleDelete = async () => {
    if (post && window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(post.id);
      window.location.href = "/posts";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="harmony-card animate-pulse">
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container py-8">
          <div className="max-w-4xl mx-auto text-center py-20">
            <h1 className="font-serif text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/posts">
              <Button variant="hero">
                <ArrowLeft className="h-4 w-4" />
                Back to Posts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/posts">
              <Button variant="ghost">
                <ArrowLeft className="h-4 w-4" />
                Back to Posts
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Link to={`/posts/${post.id}/edit`}>
                <Button variant="musical">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>

          {/* Post Content */}
          <Card className="harmony-card">
            <CardHeader className="pb-6">
              <div className="flex items-start justify-between mb-4">
                <CardTitle className="font-serif text-2xl lg:text-3xl leading-tight">
                  {post.title}
                </CardTitle>
                <div className="treble-clef" />
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>User #{post.userId}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Published today</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {post.body}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Actions */}
          <div className="mt-8 text-center">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-semibold">
                Enjoy this post?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/posts/new">
                  <Button variant="hero" className="w-full sm:w-auto">
                    Share Your Own Thoughts
                  </Button>
                </Link>
                <Link to="/posts">
                  <Button variant="musical" className="w-full sm:w-auto">
                    Discover More Posts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;