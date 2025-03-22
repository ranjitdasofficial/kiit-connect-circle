
import React, { useState } from "react";
import { Search, MoreHorizontal, Send, Phone, Video, PaperclipIcon } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    isOnline?: boolean;
  }[];
  lastMessage?: {
    text: string;
    timestamp: Date;
    read: boolean;
  };
  messages: Message[];
}

interface MessageCenterProps {
  conversations: Conversation[];
  currentUserId: string;
  className?: string;
}

const MessageCenter: React.FC<MessageCenterProps> = ({
  conversations,
  currentUserId,
  className,
}) => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(
    conversations.length > 0 ? conversations[0] : null
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = searchQuery 
    ? conversations.filter(conv => 
        conv.participants.some(p => 
          p.id !== currentUserId && p.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : conversations;

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participants.find(p => p.id !== currentUserId);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    if (
      messageDate.getDate() === yesterday.getDate() &&
      messageDate.getMonth() === yesterday.getMonth() &&
      messageDate.getFullYear() === yesterday.getFullYear()
    ) {
      return 'Yesterday';
    }
    
    return messageDate.toLocaleDateString();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;
    
    // Here you would normally call an API to send a message
    console.log("Sending message:", newMessage);
    
    // Clear the input
    setNewMessage("");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-12rem)]", className)}>
      {/* Conversation list */}
      <GlassCard className="col-span-1 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-white/40" />
            </div>
            <input
              type="text"
              placeholder="Search messages"
              className="w-full py-2 pl-10 pr-4 bg-kiit-black text-white rounded-lg border border-white/10 
                         focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredConversations.length === 0 ? (
            <div className="flex items-center justify-center h-full text-white/50">
              No conversations found
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filteredConversations.map((conversation) => {
                const participant = getOtherParticipant(conversation);
                if (!participant) return null;
                
                return (
                  <button
                    key={conversation.id}
                    className={cn(
                      "w-full text-left py-3 px-4 hover:bg-white/5 transition-colors flex items-center",
                      activeConversation?.id === conversation.id && "bg-white/5"
                    )}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="relative mr-3 flex-shrink-0">
                      {participant.avatar ? (
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-kiit-gold/30 to-kiit-gold/60 flex items-center justify-center text-white font-medium">
                          {getInitials(participant.name)}
                        </div>
                      )}
                      {participant.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-kiit-darkgray"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-white font-medium truncate">{participant.name}</h3>
                        {conversation.lastMessage && (
                          <span className="text-xs text-white/50">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      {conversation.lastMessage && (
                        <p className="text-sm text-white/60 truncate">
                          {conversation.lastMessage.text}
                        </p>
                      )}
                    </div>
                    {conversation.lastMessage && !conversation.lastMessage.read && (
                      <span className="ml-2 w-2 h-2 bg-kiit-gold rounded-full flex-shrink-0"></span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </GlassCard>

      {/* Message area */}
      <GlassCard className="col-span-1 lg:col-span-2 overflow-hidden flex flex-col">
        {activeConversation ? (
          <>
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center">
                <div className="relative mr-3">
                  {(() => {
                    const participant = getOtherParticipant(activeConversation);
                    if (!participant) return null;
                    
                    return participant.avatar ? (
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-kiit-gold/30 to-kiit-gold/60 flex items-center justify-center text-white font-medium">
                        {getInitials(participant.name)}
                      </div>
                    );
                  })()}
                  {getOtherParticipant(activeConversation)?.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-kiit-darkgray"></span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-white">
                    {getOtherParticipant(activeConversation)?.name}
                  </h3>
                  <p className="text-xs text-white/50">
                    {getOtherParticipant(activeConversation)?.isOnline 
                      ? "Online" 
                      : "Offline"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                  <Phone size={18} />
                </button>
                <button className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                  <Video size={18} />
                </button>
                <button className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {/* Group messages by date */}
              {(() => {
                const messagesByDate: Record<string, Message[]> = {};
                
                activeConversation.messages.forEach(message => {
                  const dateKey = formatDate(message.timestamp);
                  if (!messagesByDate[dateKey]) {
                    messagesByDate[dateKey] = [];
                  }
                  messagesByDate[dateKey].push(message);
                });
                
                return Object.entries(messagesByDate).map(([date, messages]) => (
                  <div key={date}>
                    <div className="text-center my-4">
                      <span className="inline-block px-3 py-1 text-xs bg-white/10 rounded-full text-white/60">
                        {date}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {messages.map((message) => {
                        const isCurrentUser = message.senderId === currentUserId;
                        
                        return (
                          <div 
                            key={message.id}
                            className={cn(
                              "flex",
                              isCurrentUser ? "justify-end" : "justify-start"
                            )}
                          >
                            <div 
                              className={cn(
                                "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                                isCurrentUser 
                                  ? "bg-kiit-gold/90 text-black rounded-tr-none" 
                                  : "bg-kiit-darkgray/80 text-white rounded-tl-none"
                              )}
                            >
                              <p>{message.text}</p>
                              <div 
                                className={cn(
                                  "text-xs mt-1",
                                  isCurrentUser ? "text-black/70" : "text-white/50",
                                  "text-right"
                                )}
                              >
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ));
              })()}
            </div>
            
            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <button 
                  type="button"
                  className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors mr-2"
                >
                  <PaperclipIcon size={18} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 py-2.5 px-4 bg-kiit-black text-white rounded-lg border border-white/10 
                           focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className={cn(
                    "p-2 rounded-full ml-2 transition-colors",
                    newMessage.trim() 
                      ? "text-kiit-gold hover:text-kiit-lightgold hover:bg-white/5" 
                      : "text-white/30 cursor-not-allowed"
                  )}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-white/50">
            Select a conversation to start messaging
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default MessageCenter;
