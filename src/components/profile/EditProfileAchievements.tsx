
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Achievement {
  title: string;
  year: string;
  description?: string;
}

interface EditProfileAchievementsProps {
  achievements: Achievement[];
  onSave: (achievements: Achievement[]) => void;
}

const EditProfileAchievements: React.FC<EditProfileAchievementsProps> = ({
  achievements,
  onSave,
}) => {
  const [achievementsList, setAchievementsList] = useState<Achievement[]>(achievements || []);

  const handleAdd = () => {
    setAchievementsList([
      ...achievementsList,
      { title: "", year: "" },
    ]);
  };

  const handleRemove = (index: number) => {
    setAchievementsList(achievementsList.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Achievement, value: string) => {
    const updatedList = [...achievementsList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setAchievementsList(updatedList);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(achievementsList);
    toast({
      title: "Achievements updated",
      description: "Your achievements information has been saved.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {achievementsList.map((item, index) => (
        <div key={index} className="p-4 bg-kiit-black/60 rounded-lg relative border border-white/10">
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="absolute top-2 right-2 p-1 text-white/60 hover:text-white/90"
          >
            <X size={16} />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-1">
                Achievement Title
              </label>
              <Input
                value={item.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className="bg-kiit-black border-white/10 text-white"
                placeholder="Google Cloud Certified Professional"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Year
              </label>
              <Input
                value={item.year}
                onChange={(e) => handleChange(index, "year", e.target.value)}
                className="bg-kiit-black border-white/10 text-white"
                placeholder="2022"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-1">
                Description
              </label>
              <Textarea
                value={item.description || ""}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                className="bg-kiit-black border-white/10 text-white"
                placeholder="Describe your achievement"
                rows={2}
              />
            </div>
          </div>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={handleAdd}
        className="w-full border-dashed border-white/30 text-white/70 hover:text-white hover:border-white/50"
      >
        <Plus size={16} className="mr-2" />
        Add Achievement
      </Button>
      
      <Button type="submit" className="bg-kiit-gold hover:bg-kiit-gold/90 text-black">
        Save Changes
      </Button>
    </form>
  );
};

export default EditProfileAchievements;
