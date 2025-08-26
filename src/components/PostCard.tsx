import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
}

const PostCard = ({ post, onDelete }: PostCardProps) => {
  return (
    <Card className="harmony-card group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          <div className="treble-clef opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-3">
          {post.body}
        </p>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm text-muted-foreground">
            By User #{post.userId}
          </span>
          <div className="flex items-center space-x-2">
            <Link to={`/posts/${post.id}`}>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            <Link to={`/posts/${post.id}/edit`}>
              <Button variant="musical" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete(post.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;