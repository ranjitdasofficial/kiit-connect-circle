
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface AboutFormData {
  name: string;
  headline: string;
  location: string;
  bio: string;
  email: string;
  phone: string;
  website: string;
}

interface EditProfileAboutProps {
  profile: any;
  onSave: (data: AboutFormData) => void;
}

const EditProfileAbout: React.FC<EditProfileAboutProps> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState<AboutFormData>({
    name: profile.name || "",
    headline: profile.headline || "",
    location: profile.location || "",
    bio: profile.bio || "",
    email: profile.contact?.email || "",
    phone: profile.contact?.phone || "",
    website: profile.contact?.website || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
          Full Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          className="bg-kiit-black border-white/10 text-white"
          required
        />
      </div>
      
      <div>
        <label htmlFor="headline" className="block text-sm font-medium text-white/80 mb-1">
          Professional Headline
        </label>
        <Input
          id="headline"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          placeholder="Software Engineer at Google"
          className="bg-kiit-black border-white/10 text-white"
        />
      </div>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-white/80 mb-1">
          Location
        </label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="San Francisco, CA"
          className="bg-kiit-black border-white/10 text-white"
        />
      </div>
      
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-white/80 mb-1">
          Bio
        </label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          className="bg-kiit-black border-white/10 text-white min-h-[100px]"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="bg-kiit-black border-white/10 text-white"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1">
          Phone
        </label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          className="bg-kiit-black border-white/10 text-white"
        />
      </div>
      
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-white/80 mb-1">
          Website
        </label>
        <Input
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://yourwebsite.com"
          className="bg-kiit-black border-white/10 text-white"
        />
      </div>
      
      <Button type="submit" className="bg-kiit-gold hover:bg-kiit-gold/90 text-black">
        Save Changes
      </Button>
    </form>
  );
};

export default EditProfileAbout;
