import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import HomePage from "@/pages/HomePage";
import PostsPage from "@/pages/PostsPage";
import PostDetailPage from "@/pages/PostDetailPage";
import CreatePostPage from "@/pages/CreatePostPage";
import EditPostPage from "@/pages/EditPostPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/posts/new" element={<CreatePostPage />} />
              <Route path="/posts/:id" element={<PostDetailPage />} />
              <Route path="/posts/:id/edit" element={<EditPostPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
