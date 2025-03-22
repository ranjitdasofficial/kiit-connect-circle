
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import ProfileCard from "@/components/alumni/ProfileCard";
import SearchFilters from "@/components/alumni/SearchFilters";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Alumni = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();

  // Mock alumni data
  const alumniData = [
    {
      id: "1",
      name: "Priya Sharma",
      avatar: undefined,
      role: "Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      graduationYear: 2018,
      department: "Computer Science",
      skills: ["JavaScript", "React", "Node.js", "Machine Learning"],
      connection: "connected" as "connected",
    },
    {
      id: "2",
      name: "Rahul Verma",
      avatar: undefined,
      role: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      graduationYear: 2015,
      department: "Computer Science",
      skills: ["Product Strategy", "UX Design", "Agile", "Data Analysis"],
      connection: "none" as "none",
    },
    {
      id: "3",
      name: "Ananya Patel",
      avatar: undefined,
      role: "UI/UX Designer",
      company: "Adobe",
      location: "Bangalore, India",
      graduationYear: 2020,
      department: "Design",
      skills: ["UI Design", "Figma", "User Research", "Prototyping"],
      connection: "pending" as "pending",
    },
    {
      id: "4",
      name: "Vikram Singh",
      avatar: undefined,
      role: "Data Scientist",
      company: "Amazon",
      location: "New York, NY",
      graduationYear: 2019,
      department: "Computer Science",
      skills: ["Python", "Machine Learning", "Data Analysis", "AWS"],
      connection: "none" as "none",
    },
    {
      id: "5",
      name: "Neha Gupta",
      avatar: undefined,
      role: "Mechanical Engineer",
      company: "Tesla",
      location: "Austin, TX",
      graduationYear: 2016,
      department: "Mechanical Engineering",
      skills: ["CAD Design", "Thermal Systems", "Project Management"],
      connection: "connected" as "connected",
    },
    {
      id: "6",
      name: "Arjun Malhotra",
      avatar: undefined,
      role: "Investment Banker",
      company: "Goldman Sachs",
      location: "Mumbai, India",
      graduationYear: 2017,
      department: "Business Administration",
      skills: ["Financial Analysis", "Investment Strategy", "Market Research"],
      connection: "none" as "none",
    },
  ];

  // Handle search query change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle filter changes
  const handleFilterChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
    
    // Extract department filter
    if (filters.department && filters.department.length > 0) {
      const deptMap: Record<string, string> = {
        cs: "Computer Science",
        it: "Information Technology",
        ee: "Electrical Engineering",
        me: "Mechanical Engineering",
        civil: "Civil Engineering",
        business: "Business Administration",
        design: "Design"
      };
      setSelectedDepartment(deptMap[filters.department[0]] || null);
    } else {
      setSelectedDepartment(null);
    }
    
    // Extract year filter
    if (filters.graduationYear && filters.graduationYear.length > 0) {
      setSelectedYear(filters.graduationYear[0]);
    } else {
      setSelectedYear(null);
    }
  };

  // Handle connect button click
  const handleConnect = (id: string) => {
    // In a real application, this would make an API call
    toast({
      title: "Connection Request Sent",
      description: `Your connection request to the alumni has been sent.`,
    });
    
    // Update the alumni data to reflect pending status
    const updatedAlumniData = alumniData.map(alumni => 
      alumni.id === id ? { ...alumni, connection: "pending" as "pending" } : alumni
    );
  };

  // Handle message button click
  const handleMessage = (id: string) => {
    // Navigate to messages page with the contact id
    navigate(`/messages?contact=${id}`);
  };

  // Handle profile click
  const handleProfileClick = (id: string) => {
    navigate(`/profile/${id}`);
  };

  // Filter alumni based on search query, department, and year
  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSearch =
      !searchQuery ||
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (alumni.company && alumni.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      alumni.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDepartment =
      !selectedDepartment ||
      selectedDepartment === "All Departments" ||
      alumni.department === selectedDepartment;

    const matchesYear =
      !selectedYear ||
      selectedYear === "All Years" ||
      alumni.graduationYear.toString() === selectedYear;

    // Additional filters from SearchFilters component
    const matchesIndustry = !activeFilters.industry || activeFilters.industry.length === 0 || 
      (alumni.company && activeFilters.industry.includes("tech") && 
        ["Google", "Microsoft", "Adobe", "Amazon"].includes(alumni.company));
    
    const matchesLocation = !activeFilters.location || activeFilters.location.length === 0 || 
      (alumni.location && (
        (activeFilters.location.includes("india") && alumni.location.includes("India")) ||
        (activeFilters.location.includes("us") && 
          ["San Francisco", "Seattle", "New York", "Austin"].some(loc => alumni.location.includes(loc)))
      ));

    return matchesSearch && matchesDepartment && matchesYear && matchesIndustry && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-kiit-black">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gold-gradient">
              KIIT Alumni Network
            </h1>
            <p className="text-white/70 mt-2 max-w-2xl mx-auto">
              Connect with alumni from KIIT University, expand your professional
              network, and discover new opportunities.
            </p>
          </div>

          <GlassCard className="p-6 mb-8" animation="fade">
            <SearchFilters 
              onSearch={handleSearch} 
              onFilterChange={handleFilterChange}
            />
          </GlassCard>

          {filteredAlumni.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlumni.map((alumni, index) => (
                <ProfileCard
                  key={alumni.id}
                  profile={alumni}
                  animation="fade"
                  delay={index * 100}
                  onConnect={() => handleConnect(alumni.id)}
                  onMessage={() => handleMessage(alumni.id)}
                  onProfileClick={() => handleProfileClick(alumni.id)}
                />
              ))}
            </div>
          ) : (
            <GlassCard className="p-8 text-center" animation="fade">
              <h3 className="text-white text-xl font-medium mb-2">No alumni found</h3>
              <p className="text-white/70">
                Try adjusting your search or filter criteria to find alumni.
              </p>
            </GlassCard>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Alumni;
