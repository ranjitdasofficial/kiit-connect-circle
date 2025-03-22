
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import AnimatedButton from "../ui/AnimatedButton";
import { cn } from "@/lib/utils";

export interface EventData {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  isOnline: boolean;
  organizer: string;
  attendeeCount: number;
  maxAttendees?: number;
  rsvp?: "going" | "interested" | "not-going" | null;
}

interface EventCardProps {
  event: EventData;
  className?: string;
  animation?: "fade" | "scale" | "slide" | "none";
  delay?: number;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  className,
  animation = "none",
  delay = 0,
}) => {
  const {
    id,
    title,
    description,
    image,
    date,
    startTime,
    endTime,
    location,
    isOnline,
    organizer,
    attendeeCount,
    maxAttendees,
    rsvp,
  } = event;

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate if event is upcoming, happening now, or past
  const getEventStatus = () => {
    const eventDate = new Date(date);
    const today = new Date();
    
    if (
      eventDate.getDate() === today.getDate() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }
    
    if (eventDate < today) {
      return "Past";
    }
    
    return "Upcoming";
  };

  const eventStatus = getEventStatus();
  const isFull = maxAttendees ? attendeeCount >= maxAttendees : false;

  return (
    <GlassCard 
      className={cn("h-full", className)}
      hover={true}
      animation={animation}
      delay={delay}
    >
      <div className="flex flex-col h-full">
        {image && (
          <div className="relative">
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-3 right-3">
              <span 
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  eventStatus === "Today" 
                    ? "bg-kiit-gold text-black" 
                    : eventStatus === "Upcoming" 
                      ? "bg-green-600/90 text-white" 
                      : "bg-white/20 text-white"
                )}
              >
                {eventStatus}
              </span>
            </div>
          </div>
        )}
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-medium text-white text-lg mb-2">{title}</h3>
          
          <div className="mb-4 space-y-2 text-sm">
            <div className="flex items-center text-white/70">
              <Calendar size={14} className="mr-2 flex-shrink-0" />
              <span>{formatDate(date)}</span>
            </div>
            
            <div className="flex items-center text-white/70">
              <Clock size={14} className="mr-2 flex-shrink-0" />
              <span>{startTime} - {endTime}</span>
            </div>
            
            <div className="flex items-center text-white/70">
              <MapPin size={14} className="mr-2 flex-shrink-0" />
              <span>{isOnline ? "Online Event" : location}</span>
              {isOnline && (
                <ExternalLink size={12} className="ml-1 text-kiit-gold/70" />
              )}
            </div>
            
            <div className="flex items-center text-white/70">
              <Users size={14} className="mr-2 flex-shrink-0" />
              <span>
                {attendeeCount} {attendeeCount === 1 ? "attendee" : "attendees"}
                {maxAttendees && ` (${maxAttendees} max)`}
              </span>
            </div>
          </div>
          
          <p className="text-white/70 text-sm mb-5 line-clamp-3">{description}</p>
          
          <div className="mt-auto space-y-3">
            {eventStatus !== "Past" && (
              <div className="flex gap-3">
                {rsvp === "going" ? (
                  <AnimatedButton 
                    variant="primary" 
                    size="sm" 
                    className="flex-1"
                    disabled={true}
                  >
                    Going
                  </AnimatedButton>
                ) : rsvp === "interested" ? (
                  <AnimatedButton 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    disabled={true}
                  >
                    Interested
                  </AnimatedButton>
                ) : (
                  <>
                    <AnimatedButton 
                      variant="primary" 
                      size="sm" 
                      className="flex-1"
                      disabled={isFull}
                    >
                      {isFull ? "Full" : "RSVP"}
                    </AnimatedButton>
                    <AnimatedButton 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                    >
                      Interested
                    </AnimatedButton>
                  </>
                )}
              </div>
            )}
            
            <Link to={`/events/${id}`}>
              <AnimatedButton 
                variant="secondary" 
                size="sm" 
                className="w-full"
              >
                View Details
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default EventCard;
