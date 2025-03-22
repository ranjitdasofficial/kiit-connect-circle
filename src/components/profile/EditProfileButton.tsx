
import React from "react";
import { Edit } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription, 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProfileAbout from "./EditProfileAbout";
import EditProfileEducation from "./EditProfileEducation";
import EditProfileExperience from "./EditProfileExperience";
import EditProfileSkills from "./EditProfileSkills";
import EditProfileAchievements from "./EditProfileAchievements";

interface EditProfileButtonProps {
  profile: any;
  onProfileUpdate: (updatedProfile: any) => void;
}

const EditProfileButton: React.FC<EditProfileButtonProps> = ({
  profile,
  onProfileUpdate,
}) => {
  const handleUpdateProfile = (section: string, data: any) => {
    const updatedProfile = { ...profile };
    
    switch (section) {
      case "about":
        updatedProfile.name = data.name;
        updatedProfile.headline = data.headline;
        updatedProfile.location = data.location;
        updatedProfile.bio = data.bio;
        updatedProfile.contact = {
          ...updatedProfile.contact,
          email: data.email,
          phone: data.phone,
          website: data.website,
        };
        break;
      case "education":
        updatedProfile.education = data;
        break;
      case "experience":
        updatedProfile.experience = data;
        break;
      case "skills":
        updatedProfile.skills = data;
        break;
      case "achievements":
        updatedProfile.achievements = data;
        break;
    }
    
    onProfileUpdate(updatedProfile);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button 
          className="absolute top-3 right-3 p-2 bg-black/20 rounded-full text-white/70 hover:text-white hover:bg-black/40 transition-colors"
          aria-label="Edit profile"
        >
          <Edit size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-kiit-darkgray border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Edit Profile</DialogTitle>
          <DialogDescription className="text-white/60">
            Make changes to your profile information here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="about" className="mt-4">
          <TabsList className="grid grid-cols-5 bg-kiit-black">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-4">
            <EditProfileAbout 
              profile={profile}
              onSave={(data) => handleUpdateProfile("about", data)}
            />
          </TabsContent>
          
          <TabsContent value="experience" className="mt-4">
            <EditProfileExperience 
              experiences={profile.experience}
              onSave={(data) => handleUpdateProfile("experience", data)}
            />
          </TabsContent>
          
          <TabsContent value="education" className="mt-4">
            <EditProfileEducation 
              education={profile.education}
              onSave={(data) => handleUpdateProfile("education", data)}
            />
          </TabsContent>
          
          <TabsContent value="skills" className="mt-4">
            <EditProfileSkills 
              skills={profile.skills}
              onSave={(data) => handleUpdateProfile("skills", data)}
            />
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-4">
            <EditProfileAchievements 
              achievements={profile.achievements}
              onSave={(data) => handleUpdateProfile("achievements", data)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileButton;
