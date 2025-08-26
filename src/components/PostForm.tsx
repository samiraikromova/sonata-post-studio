import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Post {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

interface PostFormProps {
  post?: Post;
  onSubmit: (post: Omit<Post, 'id'>) => void;
  isEditing?: boolean;
}

const PostForm = ({ post, onSubmit, isEditing = false }: PostFormProps) => {
  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        title,
        body,
        userId: 1, // Default user for demo
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/posts">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Back to Posts
              </Button>
            </Link>
            <h1 className="font-serif text-2xl font-bold">
              {isEditing ? "Edit Post" : "Create New Post"}
            </h1>
          </div>

          <Card className="harmony-card">
            <CardHeader>
              <CardTitle className="font-serif flex items-center space-x-2">
                <span>{isEditing ? "Edit Your Musical Thoughts" : "Share Your Musical Inspiration"}</span>
                <div className="treble-clef" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    placeholder="Enter a captivating title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="font-serif"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="body" className="text-sm font-medium">
                    Content
                  </label>
                  <Textarea
                    id="body"
                    placeholder="Share your thoughts about classical music, compositions, instruments, or any musical insights..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    rows={8}
                    className="resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Link to="/posts">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button 
                    type="submit" 
                    variant="hero"
                    disabled={isSubmitting}
                  >
                    <Save className="h-4 w-4" />
                    {isSubmitting ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostForm;