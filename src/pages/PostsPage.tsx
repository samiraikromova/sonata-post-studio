import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostCard from "@/components/PostCard";
import { usePosts } from "@/hooks/usePosts";
import { Search, Plus, Music } from "lucide-react";
import { Link } from "react-router-dom";

const PostsPage = () => {
  const { posts, loading, deletePost } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-3">
              Musical Posts
              <div className="treble-clef" />
            </h1>
            <p className="text-muted-foreground">
              Discover and share insights about classical music
            </p>
          </div>
          <Link to="/posts/new">
            <Button variant="hero" size="lg">
              <Plus className="h-5 w-5" />
              New Post
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="harmony-card animate-pulse">
                <div className="h-48 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="animate-fade-in">
                <PostCard post={post} onDelete={deletePost} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full mx-auto flex items-center justify-center mb-6">
              <Music className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-2">
              {searchTerm ? "No posts found" : "No posts yet"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm 
                ? "Try adjusting your search terms" 
                : "Be the first to share your musical thoughts with the community"
              }
            </p>
            {!searchTerm && (
              <Link to="/posts/new">
                <Button variant="hero">
                  <Plus className="h-4 w-4" />
                  Create First Post
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;