import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Users, BookOpen, ArrowRight, Piano, Music4, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-musical.jpg";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Classical music instruments" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="musical-float">
              <h1 className="font-serif text-4xl lg:text-6xl font-bold leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-classical bg-clip-text text-transparent">
                  Sonata Post Studio
                </span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A harmonious community where classical music enthusiasts share insights, 
              discoveries, and passionate discussions about the timeless world of orchestral artistry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/posts">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Explore Posts
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/posts/new">
                <Button variant="golden" size="lg" className="w-full sm:w-auto">
                  Share Your Voice
                  <Music className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              Join Our Musical Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow music lovers and share your passion for classical compositions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="harmony-card instrument-glow text-center">
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="w-16 h-16 bg-gradient-classical rounded-full mx-auto flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold">Share Insights</h3>
                <p className="text-muted-foreground">
                  Post about your favorite compositions, instruments, and musical discoveries
                </p>
              </CardContent>
            </Card>

            <Card className="harmony-card instrument-glow text-center">
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="w-16 h-16 bg-gradient-golden rounded-full mx-auto flex items-center justify-center">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold">Connect</h3>
                <p className="text-muted-foreground">
                  Engage with fellow classical music enthusiasts and build meaningful connections
                </p>
              </CardContent>
            </Card>

            <Card className="harmony-card instrument-glow text-center">
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="w-16 h-16 bg-gradient-classical rounded-full mx-auto flex items-center justify-center">
                  <Music className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold">Discover</h3>
                <p className="text-muted-foreground">
                  Explore new perspectives and deepen your appreciation for classical music
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Instruments Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
                Celebrate Every Instrument
              </h2>
              <p className="text-xl text-muted-foreground">
                From the grandest piano to the most delicate violin, every instrument has a story
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3 group">
                <div className="w-20 h-20 bg-card rounded-full mx-auto flex items-center justify-center group-hover:shadow-golden transition-all duration-300">
                  <Piano className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-serif font-semibold">Piano</h3>
                <p className="text-sm text-muted-foreground">The king of instruments</p>
              </div>

              <div className="text-center space-y-3 group">
                <div className="w-20 h-20 bg-card rounded-full mx-auto flex items-center justify-center group-hover:shadow-golden transition-all duration-300">
                  <Music4 className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-serif font-semibold">Strings</h3>
                <p className="text-sm text-muted-foreground">The soul of the orchestra</p>
              </div>

              <div className="text-center space-y-3 group">
                <div className="w-20 h-20 bg-card rounded-full mx-auto flex items-center justify-center group-hover:shadow-golden transition-all duration-300">
                  <Mic className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-serif font-semibold">Voice</h3>
                <p className="text-sm text-muted-foreground">The most natural instrument</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold">
              Ready to Join the Symphony?
            </h2>
            <p className="text-xl text-muted-foreground">
              Start sharing your musical thoughts and connect with our passionate community today.
            </p>
            <Link to="/posts/new">
              <Button variant="hero" size="lg">
                Create Your First Post
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;