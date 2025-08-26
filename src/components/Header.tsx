import { Button } from "@/components/ui/button";
import { Music, Plus, Home, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-classical rounded-full">
            <Music className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold bg-gradient-classical bg-clip-text text-transparent">
              Sonata Post Studio
            </h1>
            <p className="text-xs text-muted-foreground">Classical Music Community</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link to="/posts" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
            <BookOpen className="h-4 w-4" />
            <span>Posts</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link to="/posts/new">
            <Button variant="hero" size="sm" className="hidden sm:flex">
              <Plus className="h-4 w-4" />
              New Post
            </Button>
          </Link>
          <Link to="/posts/new">
            <Button variant="hero" size="icon" className="sm:hidden">
              <Plus className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;