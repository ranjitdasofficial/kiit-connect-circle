
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MessageCenter from "@/components/alumni/MessageCenter";
import { toast } from "@/components/ui/use-toast";

const Messages = () => {
  const location = useLocation();
  const [contactId, setContactId] = useState<string | null>(null);

  useEffect(() => {
    // Get contact ID from URL query params
    const params = new URLSearchParams(location.search);
    const contact = params.get("contact");
    
    if (contact) {
      setContactId(contact);
      
      // Get contact name based on ID (in a real app, this would be from an API)
      let contactName = "Alumni";
      if (contact === "1") contactName = "Priya Sharma";
      else if (contact === "5") contactName = "Neha Gupta";
      
      // Show toast notification
      toast({
        title: "Conversation opened",
        description: `You are now chatting with ${contactName}`,
      });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-kiit-black">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <MessageCenter initialContactId={contactId} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Messages;
