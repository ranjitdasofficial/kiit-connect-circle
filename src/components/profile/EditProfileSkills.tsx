
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Skill {
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

interface EditProfileSkillsProps {
  skills: Skill[];
  onSave: (skills: Skill[]) => void;
}

const EditProfileSkills: React.FC<EditProfileSkillsProps> = ({
  skills,
  onSave,
}) => {
  const [skillsList, setSkillsList] = useState<Skill[]>(skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState<"Beginner" | "Intermediate" | "Advanced" | "Expert">("Intermediate");

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    setSkillsList([
      ...skillsList,
      { name: newSkill, level: newSkillLevel },
    ]);
    setNewSkill("");
  };

  const handleRemoveSkill = (index: number) => {
    setSkillsList(skillsList.filter((_, i) => i !== index));
  };

  const handleChangeLevel = (index: number, level: "Beginner" | "Intermediate" | "Advanced" | "Expert") => {
    const updatedList = [...skillsList];
    updatedList[index] = { ...updatedList[index], level };
    setSkillsList(updatedList);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(skillsList);
    toast({
      title: "Skills updated",
      description: "Your skills information has been saved.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-kiit-black/60 rounded-lg border border-white/10">
        <h3 className="text-white font-medium mb-3">Add New Skill</h3>
        <div className="flex gap-3">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="bg-kiit-black border-white/10 text-white flex-grow"
            placeholder="Enter skill name"
          />
          
          <Select 
            value={newSkillLevel} 
            onValueChange={(value: "Beginner" | "Intermediate" | "Advanced" | "Expert") => setNewSkillLevel(value)}
          >
            <SelectTrigger className="w-[140px] bg-kiit-black border-white/10 text-white">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent className="bg-kiit-darkgray border-white/10">
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleAddSkill}
            className="border-white/30 text-white/70 hover:text-white hover:border-white/50"
          >
            <Plus size={16} className="mr-2" />
            Add
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-white font-medium">Your Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { level: "Expert", color: "bg-green-500" },
            { level: "Advanced", color: "bg-blue-500" },
            { level: "Intermediate", color: "bg-yellow-500" },
            { level: "Beginner", color: "bg-orange-500" },
          ].map((category) => (
            <div key={category.level} className="space-y-3">
              <h4 className="flex items-center text-sm font-medium text-white/80">
                <span className={`inline-block w-2 h-2 ${category.color} rounded-full mr-2`}></span>
                {category.level}
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {skillsList
                  .filter((skill) => skill.level === category.level)
                  .map((skill, index) => {
                    const skillIndex = skillsList.findIndex(s => s.name === skill.name);
                    return (
                      <div
                        key={index}
                        className="px-3 py-1.5 rounded-full text-sm bg-white/5 text-white/80 flex items-center group"
                      >
                        {skill.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skillIndex)}
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} className="text-white/60 hover:text-white/90" />
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Button type="submit" className="bg-kiit-gold hover:bg-kiit-gold/90 text-black">
        Save Changes
      </Button>
    </form>
  );
};

export default EditProfileSkills;
