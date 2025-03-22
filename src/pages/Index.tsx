
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, Users, CalendarDays, Briefcase, ChevronRight, 
  ArrowRight, GraduationCap, Globe, Award, Sparkles
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedButton from "@/components/ui/AnimatedButton";
import GlassCard from "@/components/ui/GlassCard";
import ProfileCard, { ProfileData } from "@/components/alumni/ProfileCard";
import EventCard, { EventData } from "@/components/alumni/EventCard";
import JobListing, { JobData } from "@/components/alumni/JobListing";
import { cn } from "@/lib/utils";

// Mock data for featured profiles
const featuredProfiles: ProfileData[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Software Engineer",
    company: "Google",
    location: "San Francisco, CA",
    graduationYear: 2018,
    department: "Computer Science",
    skills: ["React", "TypeScript", "Node.js", "AI"],
    connection: "connected",
  },
  {
    id: "2",
    name: "Raj Patel",
    role: "Product Manager",
    company: "Microsoft",
    location: "Seattle, WA",
    graduationYear: 2016,
    department: "Information Technology",
    skills: ["Product Strategy", "UX/UI", "Agile", "Market Research"],
    connection: "none",
  },
  {
    id: "3",
    name: "Ananya Mishra",
    role: "Data Scientist",
    company: "Amazon",
    location: "Bangalore, India",
    graduationYear: 2019,
    department: "Computer Science",
    skills: ["Python", "Machine Learning", "Data Analysis", "TensorFlow"],
    connection: "pending",
  },
];

// Mock data for upcoming events
const upcomingEvents: EventData[] = [
  {
    id: "1",
    title: "AI in Healthcare: KIIT Alumni Showcase",
    description: "Join us for an exciting showcase of how KIIT alumni are revolutionizing healthcare with artificial intelligence. Learn about cutting-edge projects, career opportunities, and network with professionals in the field.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    startTime: "2:00 PM",
    endTime: "5:00 PM",
    location: "Virtual",
    isOnline: true,
    organizer: "KIIT AI Club",
    attendeeCount: 78,
    maxAttendees: 100,
    rsvp: null,
  },
  {
    id: "2",
    title: "KIIT Annual Alumni Meetup 2023",
    description: "The annual gathering of KIIT graduates across all batches. An opportunity to reconnect with old friends, make new connections, and celebrate the achievements of our alumni community.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    startTime: "6:00 PM",
    endTime: "10:00 PM",
    location: "KIIT Campus, Bhubaneswar",
    isOnline: false,
    organizer: "KIIT Alumni Association",
    attendeeCount: 156,
    rsvp: "going",
  },
];

// Mock data for job listings
const recentJobs: JobData[] = [
  {
    id: "1",
    title: "Front-end Developer",
    company: "TechCorp India",
    companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
    location: "Remote",
    salary: "80K - 120K",
    employmentType: "Full-time",
    experienceLevel: "2-4 years",
    postDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
    description: "We're looking for a talented front-end developer with experience in React and modern JavaScript frameworks to join our growing team.",
    skills: ["React", "JavaScript", "CSS", "UI/UX"],
    postedById: "101",
    postedByName: "Aditya Singh (Class of 2015)",
    applied: false,
    saved: true,
  },
  {
    id: "2",
    title: "Machine Learning Engineer",
    company: "DataViz Solutions",
    location: "Hyderabad, India",
    employmentType: "Full-time",
    experienceLevel: "3+ years",
    postDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    description: "Join our AI team to develop and deploy machine learning models at scale. You'll work on cutting-edge problems in data analysis and predictive modeling.",
    skills: ["Python", "TensorFlow", "PyTorch", "Statistics", "Computer Vision"],
    postedById: "102",
    postedByName: "Meera Kapoor (Class of 2017)",
    applied: false,
    saved: false,
  },
];

// Stats data
const statsData = [
  { label: "Alumni", value: "15,000+" },
  { label: "Companies", value: "1,200+" },
  { label: "Countries", value: "48+" },
  { label: "Connections", value: "32,000+" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<"profiles" | "events" | "jobs">("profiles");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = offset * 0.4;

  return (
    <div className="min-h-screen bg-kiit-black">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-b from-kiit-gold/5 via-kiit-black to-kiit-black z-10"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          />
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-kiit-gold/10 via-transparent to-transparent opacity-70 z-0"
            style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
          />
        </div>

        <div className="container mx-auto px-4 pt-20 pb-24 md:pb-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/80 mb-6 animate-fade-in">
              <span className="text-kiit-gold">KIIT</span> Alumni Connect
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight opacity-0 animate-fade-in" style={{ animationDelay: "150ms", animationFillMode: "forwards" }}>
              Connect with the <span className="text-gold-gradient">KIIT community</span> worldwide
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-3xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
              Build meaningful connections, access exclusive opportunities, and grow professionally with fellow KIIT alumni and students.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: "450ms", animationFillMode: "forwards" }}>
              <AnimatedButton variant="primary" size="lg">
                Join the Network
              </AnimatedButton>
              <AnimatedButton variant="outline" size="lg">
                Learn More
              </AnimatedButton>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-kiit-darkgray/20 via-kiit-darkgray/80 to-kiit-darkgray/20 backdrop-blur-xl rounded-xl border border-white/5 shadow-xl transform translate-y-6 animate-fade-in" style={{ animationDelay: "600ms" }}>
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                {statsData.map((stat, index) => (
                  <div 
                    key={index} 
                    className="p-6 md:p-8 text-center opacity-0 animate-slide-up"
                    style={{ animationDelay: `${600 + index * 100}ms`, animationFillMode: "forwards" }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Connect, collaborate, and grow with powerful tools designed for KIIT's global community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard animation="fade" delay={100} hover={true} className="p-6">
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-kiit-gold" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Connect</h3>
              <p className="text-white/70 mb-4">
                Find and connect with fellow alumni and students based on shared interests, location, or industry.
              </p>
              <Link to="/alumni" className="inline-flex items-center text-kiit-gold hover:text-kiit-lightgold transition-colors">
                Explore network <ChevronRight size={16} className="ml-1" />
              </Link>
            </GlassCard>
            
            <GlassCard animation="fade" delay={200} hover={true} className="p-6">
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4">
                <CalendarDays className="w-6 h-6 text-kiit-gold" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Events</h3>
              <p className="text-white/70 mb-4">
                Discover and join virtual and in-person events, webinars, and meetups organized by the KIIT community.
              </p>
              <Link to="/events" className="inline-flex items-center text-kiit-gold hover:text-kiit-lightgold transition-colors">
                Browse events <ChevronRight size={16} className="ml-1" />
              </Link>
            </GlassCard>
            
            <GlassCard animation="fade" delay={300} hover={true} className="p-6">
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-kiit-gold" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Jobs</h3>
              <p className="text-white/70 mb-4">
                Access exclusive job opportunities and internships shared by fellow alumni and partner companies.
              </p>
              <Link to="/jobs" className="inline-flex items-center text-kiit-gold hover:text-kiit-lightgold transition-colors">
                Find opportunities <ChevronRight size={16} className="ml-1" />
              </Link>
            </GlassCard>
            
            <GlassCard animation="fade" delay={400} hover={true} className="p-6">
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-kiit-gold" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Mentorship</h3>
              <p className="text-white/70 mb-4">
                Give back to the community by mentoring students or finding a mentor to guide your career.
              </p>
              <Link to="/mentorship" className="inline-flex items-center text-kiit-gold hover:text-kiit-lightgold transition-colors">
                Start mentoring <ChevronRight size={16} className="ml-1" />
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>
      
      {/* Featured section */}
      <section className="py-16 bg-kiit-darkgray/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white">
              Discover the community
            </h2>
            
            <div className="flex border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
              <button 
                className={cn(
                  "px-4 py-2 text-sm font-medium",
                  activeTab === "profiles" 
                    ? "bg-kiit-gold text-black" 
                    : "bg-transparent text-white/70 hover:bg-white/5"
                )}
                onClick={() => setActiveTab("profiles")}
              >
                <Users size={16} className="inline-block mr-2" />
                Alumni
              </button>
              <button 
                className={cn(
                  "px-4 py-2 text-sm font-medium",
                  activeTab === "events" 
                    ? "bg-kiit-gold text-black" 
                    : "bg-transparent text-white/70 hover:bg-white/5"
                )}
                onClick={() => setActiveTab("events")}
              >
                <CalendarDays size={16} className="inline-block mr-2" />
                Events
              </button>
              <button 
                className={cn(
                  "px-4 py-2 text-sm font-medium",
                  activeTab === "jobs" 
                    ? "bg-kiit-gold text-black" 
                    : "bg-transparent text-white/70 hover:bg-white/5"
                )}
                onClick={() => setActiveTab("jobs")}
              >
                <Briefcase size={16} className="inline-block mr-2" />
                Jobs
              </button>
            </div>
          </div>
          
          <div>
            {activeTab === "profiles" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProfiles.map((profile, index) => (
                  <ProfileCard 
                    key={profile.id} 
                    profile={profile} 
                    animation="fade"
                    delay={(index + 1) * 100}
                  />
                ))}
              </div>
            )}
            
            {activeTab === "events" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map((event, index) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    animation="fade"
                    delay={(index + 1) * 100}
                  />
                ))}
              </div>
            )}
            
            {activeTab === "jobs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentJobs.map((job, index) => (
                  <JobListing 
                    key={job.id} 
                    job={job} 
                    animation="fade"
                    delay={(index + 1) * 100}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center">
            <Link to={activeTab === "profiles" ? "/alumni" : activeTab === "events" ? "/events" : "/jobs"}>
              <AnimatedButton variant="outline">
                View all {activeTab}
                <ArrowRight size={16} className="ml-2" />
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Success Stories */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-kiit-gold/5 via-transparent to-transparent opacity-70 z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Success stories from our alumni
            </h2>
            <p className="text-white/70">
              Discover how KIIT graduates are making an impact across industries and around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard animation="fade" delay={100} className="p-8">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-kiit-gold/30 to-kiit-gold/60 mr-4 flex items-center justify-center text-white font-medium">
                    VP
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Vikram Patil</h3>
                    <p className="text-white/70 text-sm">Class of 2014, CSE</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Award size={16} className="text-kiit-gold mr-2" />
                  <span className="text-white/90 text-sm">
                    Co-founder of Quantum AI Solutions
                  </span>
                </div>
              </div>
              
              <p className="text-white/70 italic mb-6">
                "The strong technical foundation I built at KIIT gave me the confidence to launch my own AI startup. The alumni network has been instrumental in connecting us with our first clients."
              </p>
              
              <Link to="/success-stories" className="inline-flex items-center text-kiit-gold hover:text-kiit-lightgold transition-colors">
                Read full story <ChevronRight size={16} className="ml-1" />
              </Link>
            </GlassCard>
            
            <GlassCard animation="fade" delay={200} className="p-8">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-kiit-gold/30 to-kiit-gold/60 mr-4 flex items-center justify-center text-white font-medium">
                    SK
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Sarika Kumar</h3>
                    <p className="text-white/70 text-sm">Class of 2016, ECE</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Globe size={16} className="text-kiit-gold mr-2" />
                  <span className="text-white/90 text-sm">
                    Senior Engineer at SpaceX
                  </span>
                </div>
              </div>
              
              <p className="text-white/70 italic mb-6">
                "My journey from Bhubaneswar to working on rocket systems at SpaceX started with the incredible professors at KIIT who encouraged me to think beyond boundaries."
              </p>
              
              <Link to="/success-stories" className="inline-flex items-center text-kiit-gold hover:text-kiit-lightgold transition-colors">
                Read full story <ChevronRight size={16} className="ml-1" />
              </Link>
            </GlassCard>
            
            <GlassCard animation="fade" delay={300} className="p-8">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-kiit-gold/30 to-kiit-gold/60 mr-4 flex items-center justify-center text-white font-medium">
                    AR
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Arjun Reddy</h3>
                    <p className="text-white/70 text-sm">Class of 2018, MBA</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Sparkles size={16} className="text-kiit-gold mr-2" />
                  <span className="text-white/90 text-sm">
                    Product Lead at Spotify
                  </span>
                </div>
              </div>
              
              <p className="text-white/70 italic mb-6">
                "The entrepreneurial mindset fostered at KIIT Business School prepared me for the fast-paced world of product management. I still collaborate with fellow alumni on new ideas."
              </p>
              
              <Link to="/success-stories" className="inline-flex items-center text-kiit-gold hover:text-kiit-lightgold transition-colors">
                Read full story <ChevronRight size={16} className="ml-1" />
              </Link>
            </GlassCard>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/success-stories">
              <AnimatedButton variant="outline">
                View all stories
                <ArrowRight size={16} className="ml-2" />
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-kiit-darkgray/50 via-kiit-darkgray to-kiit-darkgray/50">
        <div className="container mx-auto px-4">
          <div className="bg-kiit-black/30 backdrop-blur-xl rounded-2xl border border-white/5 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Join our global alumni network today
                </h2>
                <p className="text-white/70 mb-6">
                  Connect with thousands of KIIT graduates, access exclusive opportunities, and become part of a community that supports your professional growth.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-4">
                      <Users size={16} className="text-kiit-gold" />
                    </div>
                    <p className="text-white/90">Connect with alumni in your field or location</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-4">
                      <Briefcase size={16} className="text-kiit-gold" />
                    </div>
                    <p className="text-white/90">Access exclusive job opportunities and referrals</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-4">
                      <CalendarDays size={16} className="text-kiit-gold" />
                    </div>
                    <p className="text-white/90">Participate in networking events and webinars</p>
                  </div>
                </div>
                <div className="mt-8">
                  <AnimatedButton variant="primary" size="lg">
                    Create Account
                  </AnimatedButton>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" 
                  alt="KIIT Alumni" 
                  className="rounded-xl object-cover w-full h-full max-h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kiit-black to-transparent opacity-70 rounded-xl" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white font-medium">KIIT University Campus</div>
                  <div className="text-white/70 text-sm">Bhubaneswar, Odisha, India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
