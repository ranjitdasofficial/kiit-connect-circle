
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Education {
  degree: string;
  institution: string;
  department: string;
  year: string;
  description?: string;
}

interface EditProfileEducationProps {
  education: Education[];
  onSave: (education: Education[]) => void;
}

const EditProfileEducation: React.FC<EditProfileEducationProps> = ({
  education,
  onSave,
}) => {
  const [educationList, setEducationList] = useState<Education[]>(education || []);

  const handleAdd = () => {
    setEducationList([
      ...educationList,
      { degree: "", institution: "", department: "", year: "" },
    ]);
  };

  const handleRemove = (index: number) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Education, value: string) => {
    const updatedList = [...educationList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setEducationList(updatedList);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(educationList);
    toast({
      title: "Education updated",
      description: "Your education information has been saved.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {educationList.map((item, index) => (
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
                Degree
              </label>
              <Input
                value={item.degree}
                onChange={(e) => handleChange(index, "degree", e.target.value)}
                className="bg-kiit-black border-white/10 text-white"
                placeholder="B.Tech"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Department
              </label>
              <Input
                value={item.department}
                onChange={(e) => handleChange(index, "department", e.target.value)}
                className="bg-kiit-black border-white/10 text-white"
                placeholder="Computer Science"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Institution
              </label>
              <Input
                value={item.institution}
                onChange={(e) => handleChange(index, "institution", e.target.value)}
                className="bg-kiit-black border-white/10 text-white"
                placeholder="KIIT University"
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
                placeholder="2018-2022"
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
                placeholder="Description of your education"
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
        Add Education
      </Button>
      
      <Button type="submit" className="bg-kiit-gold hover:bg-kiit-gold/90 text-black">
        Save Changes
      </Button>
    </form>
  );
};

export default EditProfileEducation;
