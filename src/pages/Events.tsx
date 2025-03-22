
import React, { useState } from "react";
import { Search, Filter, CalendarDays, MapPin, Plus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedButton from "@/components/ui/AnimatedButton";
import EventCard, { EventData } from "@/components/alumni/EventCard";
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "my-events">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock data for events
  const events: EventData[] = [
    {
      id: "1",
      title: "AI in Healthcare: KIIT Alumni Showcase",
      description: "Join us for an exciting showcase of how KIIT alumni are revolutionizing healthcare with artificial intelligence. Learn about cutting-edge projects, career opportunities, and network with professionals in the field.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      startTime: "6:00 PM",
      endTime: "10:00 PM",
      location: "KIIT Campus, Bhubaneswar",
      isOnline: false,
      organizer: "KIIT Alumni Association",
      attendeeCount: 156,
      rsvp: "going",
    },
    {
      id: "3",
      title: "Tech Career Panel: From KIIT to Silicon Valley",
      description: "A panel discussion featuring KIIT alumni who have built successful careers in top tech companies in Silicon Valley. Learn about their journey, challenges, and tips for aspiring technologists.",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=800&auto=format&fit=crop",
      date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      startTime: "9:00 AM",
      endTime: "11:00 AM",
      location: "Virtual",
      isOnline: true,
      organizer: "KIIT Career Services",
      attendeeCount: 210,
      rsvp: "interested",
    },
    {
      id: "4",
      title: "Entrepreneurship Workshop for KIIT Students",
      description: "A hands-on workshop led by successful KIIT alumni entrepreneurs. Learn about startup fundamentals, fundraising, and how to turn your idea into a viable business.",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=800&auto=format&fit=crop",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      location: "KIIT Business School, Bhubaneswar",
      isOnline: false,
      organizer: "KIIT E-Cell",
      attendeeCount: 45,
      maxAttendees: 50,
      rsvp: null,
    },
    {
      id: "5",
      title: "Machine Learning Masterclass by Google Engineers",
      description: "An intensive workshop on advanced machine learning techniques taught by KIIT alumni working at Google. Bring your laptop for hands-on exercises.",
      image: "https://images.unsplash.com/photo-1544654817-3f64314dcef7?q=80&w=800&auto=format&fit=crop",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      startTime: "9:00 AM",
      endTime: "5:00 PM",
      location: "Virtual",
      isOnline: true,
      organizer: "KIIT Tech Society",
      attendeeCount: 120,
      maxAttendees: 150,
      rsvp: "going",
    },
    {
      id: "6",
      title: "KIIT Alumni Networking Night: San Francisco",
      description: "Join fellow KIIT alumni in the Bay Area for an evening of networking, food, and drinks. Great opportunity to strengthen your professional network.",
      image: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=800&auto=format&fit=crop",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      startTime: "7:00 PM",
      endTime: "10:00 PM",
      location: "San Francisco, CA",
      isOnline: false,
      organizer: "KIIT Alumni Association - US Chapter",
      attendeeCount: 35,
      rsvp: "going",
    },
  ];

  // Filter events based on activeTab
  const filteredEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.date);
    
    if (activeTab === "upcoming" && eventDate >= today) {
      return true;
    } else if (activeTab === "past" && eventDate < today) {
      return true;
    } else if (activeTab === "my-events" && event.rsvp) {
      return true;
    }
    
    return false;
  });

  // Search functionality
  const searchedEvents = searchQuery
    ? filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredEvents;

  return (
    <div className="min-h-screen bg-kiit-black">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-3xl font-display font-bold text-white">Events & Meetups</h1>
            
            <AnimatedButton variant="primary">
              <Plus size={16} className="mr-2" />
              Create Event
            </AnimatedButton>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-1">
              <GlassCard className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-white mb-4">Filters</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                      <button 
                        className={cn(
                          "flex-1 py-2 text-sm font-medium",
                          activeTab === "upcoming" 
                            ? "bg-kiit-gold text-black" 
                            : "bg-transparent text-white/70 hover:bg-white/5"
                        )}
                        onClick={() => setActiveTab("upcoming")}
                      >
                        Upcoming
                      </button>
                      <button 
                        className={cn(
                          "flex-1 py-2 text-sm font-medium",
                          activeTab === "past" 
                            ? "bg-kiit-gold text-black" 
                            : "bg-transparent text-white/70 hover:bg-white/5"
                        )}
                        onClick={() => setActiveTab("past")}
                      >
                        Past
                      </button>
                      <button 
                        className={cn(
                          "flex-1 py-2 text-sm font-medium",
                          activeTab === "my-events" 
                            ? "bg-kiit-gold text-black" 
                            : "bg-transparent text-white/70 hover:bg-white/5"
                        )}
                        onClick={() => setActiveTab("my-events")}
                      >
                        My Events
                      </button>
                    </div>
                    
                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search size={16} className="text-white/40" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search events..."
                          className="w-full py-2 pl-10 pr-4 bg-kiit-darkgray text-white rounded-lg border border-white/10 
                                   focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <button 
                        className="flex items-center justify-between w-full py-2 text-white/80 hover:text-white"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <span className="font-medium">Advanced Filters</span>
                        <Filter size={16} />
                      </button>
                      
                      {showFilters && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-white/80 mb-2">Event Type</h3>
                            <div className="space-y-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                                />
                                <span className="text-sm text-white/70">In-person</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                                />
                                <span className="text-sm text-white/70">Virtual</span>
                              </label>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-white/80 mb-2">Date Range</h3>
                            <div className="space-y-2">
                              <div>
                                <label className="text-sm text-white/70 block mb-1">From</label>
                                <input
                                  type="date"
                                  className="w-full py-1.5 px-3 bg-kiit-darkgray text-white rounded border border-white/10 
                                           focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold text-sm"
                                />
                              </div>
                              <div>
                                <label className="text-sm text-white/70 block mb-1">To</label>
                                <input
                                  type="date"
                                  className="w-full py-1.5 px-3 bg-kiit-darkgray text-white rounded border border-white/10 
                                           focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold text-sm"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-white/80 mb-2">Category</h3>
                            <select
                              className="w-full py-2 px-3 bg-kiit-darkgray text-white rounded-lg border border-white/10 
                                       focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold text-sm"
                            >
                              <option value="">All Categories</option>
                              <option value="networking">Networking</option>
                              <option value="workshop">Workshop</option>
                              <option value="seminar">Seminar</option>
                              <option value="social">Social</option>
                              <option value="career">Career</option>
                            </select>
                          </div>
                          
                          <AnimatedButton variant="outline" size="sm" className="w-full">
                            Apply Filters
                          </AnimatedButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-white mb-4">Popular Events</h2>
                  
                  <div className="space-y-4">
                    {events
                      .filter(event => new Date(event.date) >= new Date())
                      .sort((a, b) => b.attendeeCount - a.attendeeCount)
                      .slice(0, 3)
                      .map(event => (
                        <div key={event.id} className="flex gap-3">
                          <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                            {event.image ? (
                              <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                <CalendarDays size={20} className="text-kiit-gold/70" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-white leading-tight">
                              {event.title}
                            </h3>
                            <div className="flex items-center text-white/50 text-xs mt-1">
                              <CalendarDays size={10} className="mr-1" />
                              {new Date(event.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="flex items-center text-white/50 text-xs mt-0.5">
                              <MapPin size={10} className="mr-1" />
                              {event.isOnline ? "Virtual" : event.location}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </GlassCard>
            </div>
            
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchedEvents.length > 0 ? (
                  searchedEvents.map(event => (
                    <EventCard key={event.id} event={event} animation="fade" />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-16">
                    <CalendarDays size={48} className="text-white/20 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No events found</h3>
                    <p className="text-white/60 text-center max-w-md">
                      {searchQuery 
                        ? `No events matching "${searchQuery}" were found. Try a different search term.` 
                        : "There are no events in this category yet."}
                    </p>
                    {activeTab !== "upcoming" && (
                      <AnimatedButton 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setActiveTab("upcoming")}
                      >
                        View Upcoming Events
                      </AnimatedButton>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Events;
