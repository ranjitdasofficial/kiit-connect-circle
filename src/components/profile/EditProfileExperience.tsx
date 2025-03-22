
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Experience {
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

interface EditProfileExperienceProps {
  experiences: Experience[];
  onSave: (experiences: Experience[]) => void;
}

const EditProfileExperience: React.FC<EditProfileExperienceProps> = ({
  experiences,
  onSave,
}) => {
  const [experienceList, setExperienceList] = useState<Experience[]>(experiences || []);

  const handleAdd = () => {
    setExperienceList([
      ...experienceList,
      { role: "", company: "", startDate: "", current: false },
    ]);
  };

  const handleRemove = (index: number) => {
    setExperienceList(experienceList.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Experience, value: any) => {
    const updatedList = [...experienceList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    
    // If current is checked, clear the end date
    if (field === "current" && value === true) {
      updatedList[index].endDate = undefined;
    }
    
    setExperienceList(updatedList);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(experienceList);
    toast({
      title: "Experience updated",
      description: "Your experience information has been saved.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {experienceList.map((item, index) => (
        <div key={index} className="p-4 bg-kiit-black/60 rounded-lg relative border border-white/10">
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="absolute top-2 right-2 p-1 text-white/60 hover:text-white/90"
          >
            <X size={16} />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Role
              </label>
              <Input
                value={item.role}
                onChange={(e) => handleChange(index, "role", e.target.value)}
                className="bg-kiit-black border-white/10 text-white"
                placeholder="Software Engineer"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Company
              </label>
              <Input
                value={item.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
                className="bg-kiit-black border-white/10 text-white"
                placeholder="Google"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Location
              </label>
              <Input
                value={item.location || ""}
                onChange={(e) => handleChange(index, "location", e.target.value)}
                className="bg-kiit-black border-white/10 text-white"
                placeholder="San Francisco, CA"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Start Date
              </label>
              <Input
                value={item.startDate}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                className="bg-kiit-black border-white/10 text-white"
                placeholder="Jan 2020"
                required
              />
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox 
                  id={`current-${index}`} 
                  checked={item.current}
                  onCheckedChange={(checked) => 
                    handleChange(index, "current", checked === true)
                  }
                />
                <label
                  htmlFor={`current-${index}`}
                  className="text-sm font-medium text-white/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I currently work here
                </label>
              </div>
              
              {!item.current && (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    End Date
                  </label>
                  <Input
                    value={item.endDate || ""}
                    onChange={(e) => handleChange(index, "endDate", e.target.value)}
                    className="bg-kiit-black border-white/10 text-white"
                    placeholder="Dec 2022"
                  />
                </div>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-1">
                Description
              </label>
              <Textarea
                value={item.description || ""}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                className="bg-kiit-black border-white/10 text-white"
                placeholder="Describe your responsibilities and achievements"
                rows={3}
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
        Add Experience
      </Button>
      
      <Button type="submit" className="bg-kiit-gold hover:bg-kiit-gold/90 text-black">
        Save Changes
      </Button>
    </form>
  );
};

export default EditProfileExperience;
