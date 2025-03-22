
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Bell, MessageSquare, ChevronDown } from "lucide-react";
import AnimatedButton from "../ui/AnimatedButton";
import { cn } from "@/lib/utils";

const NavItem = ({ to, label, active }: { to: string; label: string; active: boolean }) => (
  <Link 
    to={to} 
    className={cn(
      "px-4 py-2 text-sm font-medium transition-all relative",
      "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5",
      "after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300",
      active 
        ? "text-kiit-gold after:bg-kiit-gold after:scale-x-100" 
        : "text-white/80 hover:text-white after:bg-kiit-gold/50 hover:after:scale-x-100 hover:after:origin-bottom-left"
    )}
  >
    {label}
  </Link>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/alumni", label: "Alumni" },
    { to: "/events", label: "Events" },
    { to: "/jobs", label: "Jobs" },
    { to: "/communities", label: "Communities" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-kiit-black/80 backdrop-blur-lg shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-8">
            <h1 className="text-xl font-display font-bold text-white flex items-center">
              <span className="text-gold-gradient">KIIT</span>
              <span className="ml-1">Connect</span>
            </h1>
          </Link>
          
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <NavItem 
                key={item.label} 
                to={item.to} 
                label={item.label} 
                active={location.pathname === item.to} 
              />
            ))}
          </nav>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
            <Search size={18} />
          </button>
          <button className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-kiit-gold rounded-full"></span>
          </button>
          <Link to="/messages">
            <button className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              <MessageSquare size={18} />
            </button>
          </Link>
          
          <div className="pl-4 border-l border-white/10 flex items-center">
            <Link to="/profile" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-kiit-gold/80 to-kiit-gold overflow-hidden border border-white/20">
                <div className="w-full h-full bg-kiit-darkgray/90 flex items-center justify-center text-xs font-medium text-white">
                  KD
                </div>
              </div>
              <div className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                <div className="flex items-center">
                  Profile <ChevronDown size={14} className="ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-kiit-black/95 backdrop-blur-lg z-40 md:hidden transition-all duration-300 flex flex-col",
          "pt-24 px-6 pb-8 transform",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-3">
          {navItems.map((item) => (
            <Link 
              key={item.label}
              to={item.to} 
              className={cn(
                "px-4 py-3 rounded-lg text-base font-medium transition-all",
                location.pathname === item.to 
                  ? "bg-kiit-darkgray text-kiit-gold" 
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="mt-8 flex flex-col space-y-3">
          <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-kiit-darkgray">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-kiit-gold/80 to-kiit-gold overflow-hidden border border-white/20">
                <div className="w-full h-full bg-kiit-darkgray/90 flex items-center justify-center text-sm font-medium text-white">
                  KD
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-white/90">John Doe</div>
                <div className="text-xs text-white/60">View Profile</div>
              </div>
            </div>
          </Link>
          
          <div className="flex space-x-4 p-2">
            <button className="flex-1 text-white/70 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/5 flex items-center justify-center">
              <Search size={20} />
            </button>
            <button className="flex-1 text-white/70 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/5 flex items-center justify-center relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-kiit-gold rounded-full"></span>
            </button>
            <Link to="/messages" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full text-white/70 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/5 flex items-center justify-center">
                <MessageSquare size={20} />
              </button>
            </Link>
          </div>
        </div>
        
        <div className="mt-auto">
          <AnimatedButton 
            variant="outline" 
            className="w-full"
            onClick={() => {
              // Sign out functionality would go here
              setIsMobileMenuOpen(false);
            }}
          >
            Sign Out
          </AnimatedButton>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
