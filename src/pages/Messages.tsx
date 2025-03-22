
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MessageCenter, { Conversation } from "@/components/alumni/MessageCenter";

const Messages = () => {
  // Example conversation data
  const conversations: Conversation[] = [
    {
      id: "1",
      participants: [
        { id: "current-user", name: "Current User" },
        { id: "2", name: "Raj Patel", isOnline: true }
      ],
      lastMessage: {
        text: "Hey, I wanted to discuss the upcoming alumni meetup. Are you planning to attend?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        read: false
      },
      messages: [
        {
          id: "m1",
          senderId: "2",
          text: "Hi there! I saw that you're also a KIIT alumnus from the Computer Science department.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          read: true
        },
        {
          id: "m2",
          senderId: "current-user",
          text: "Yes, I graduated in 2018. How about you?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
          read: true
        },
        {
          id: "m3",
          senderId: "2",
          text: "I was in the 2016 batch. It's great to connect with a fellow alumnus! What are you working on these days?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
          read: true
        },
        {
          id: "m4",
          senderId: "current-user",
          text: "I'm currently working at Microsoft as a software engineer. How about you?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20), // 20 hours ago
          read: true
        },
        {
          id: "m5",
          senderId: "2",
          text: "That's impressive! I'm at Google, working on cloud infrastructure. Would love to catch up sometime and exchange experiences.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
          read: true
        },
        {
          id: "m6",
          senderId: "current-user",
          text: "Absolutely! I'd be interested in hearing more about your work at Google.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
          read: true
        },
        {
          id: "m7",
          senderId: "2",
          text: "Hey, I wanted to discuss the upcoming alumni meetup. Are you planning to attend?",
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          read: false
        }
      ]
    },
    {
      id: "2",
      participants: [
        { id: "current-user", name: "Current User" },
        { id: "3", name: "Ananya Mishra", isOnline: false }
      ],
      lastMessage: {
        text: "Thanks for your help with the referral!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: true
      },
      messages: [
        {
          id: "m1",
          senderId: "3",
          text: "Hello! I saw that you work at Microsoft. I'm currently looking for opportunities in software development.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
          read: true
        },
        {
          id: "m2",
          senderId: "current-user",
          text: "Hi Ananya! Nice to hear from you. Yes, I'd be happy to help. Do you have a specific role in mind?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 47), // 47 hours ago
          read: true
        },
        {
          id: "m3",
          senderId: "3",
          text: "I'm interested in frontend development positions. I have experience with React and Angular.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 46), // 46 hours ago
          read: true
        },
        {
          id: "m4",
          senderId: "current-user",
          text: "Great! We have some openings in that area. Send me your resume, and I'll see if I can refer you internally.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 45), // 45 hours ago
          read: true
        },
        {
          id: "m5",
          senderId: "3",
          text: "That would be amazing! I'll send it right away. Thank you so much for your help.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 44), // 44 hours ago
          read: true
        },
        {
          id: "m6",
          senderId: "3",
          text: "I just sent you my resume via email. Looking forward to your feedback!",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
          read: true
        },
        {
          id: "m7",
          senderId: "current-user",
          text: "Got it. I'll review it and submit a referral by tomorrow.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          read: true
        },
        {
          id: "m8",
          senderId: "3",
          text: "Thanks for your help with the referral!",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: true
        }
      ]
    },
    {
      id: "3",
      participants: [
        { id: "current-user", name: "Current User" },
        { id: "4", name: "Vikram Patil", isOnline: true }
      ],
      lastMessage: {
        text: "Would love to connect and discuss potential partnerships for our startup.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: true
      },
      messages: [
        {
          id: "m1",
          senderId: "4",
          text: "Hello! I'm Vikram, a KIIT alumnus from the 2014 batch. I recently started a tech startup focused on AI solutions.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
          read: true
        },
        {
          id: "m2",
          senderId: "4",
          text: "Would love to connect and discuss potential partnerships for our startup.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
          read: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-kiit-black">
      <Navbar />
      
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold text-white mb-8">Messages</h1>
          <MessageCenter 
            conversations={conversations} 
            currentUserId="current-user"
          />
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Messages;
