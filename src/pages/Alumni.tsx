
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import ProfileCard from "@/components/alumni/ProfileCard";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import AnimatedButton from "@/components/ui/AnimatedButton";

const Alumni = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

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
      connection: "connected",
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
      connection: "none",
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
      connection: "pending",
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
      connection: "none",
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
      connection: "connected",
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
      connection: "none",
    },
  ];

  // Departments for the filter
  const departments = [
    "All Departments",
    "Computer Science",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Business Administration",
    "Design",
  ];

  // Graduation years for the filter
  const graduationYears = [
    "All Years",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
  ];

  // Filter alumni based on search query, department, and year
  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (alumni.company && alumni.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDepartment =
      !selectedDepartment ||
      selectedDepartment === "All Departments" ||
      alumni.department === selectedDepartment;

    const matchesYear =
      !selectedYear ||
      selectedYear === "All Years" ||
      alumni.graduationYear.toString() === selectedYear;

    return matchesSearch && matchesDepartment && matchesYear;
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                <Input
                  type="text"
                  placeholder="Search by name, role, or company..."
                  className="pl-10 bg-kiit-darkgray/70 border-white/10 text-white w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <select
                  className="w-full bg-kiit-darkgray/70 border border-white/10 rounded-md px-3 py-2 text-white focus:ring-kiit-gold focus:border-kiit-gold"
                  value={selectedDepartment || "All Departments"}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  className="w-full bg-kiit-darkgray/70 border border-white/10 rounded-md px-3 py-2 text-white focus:ring-kiit-gold focus:border-kiit-gold"
                  value={selectedYear || "All Years"}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {graduationYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <AnimatedButton
                variant="secondary"
                size="sm"
                className="flex items-center"
              >
                <Filter size={16} className="mr-2" />
                Advanced Filters
              </AnimatedButton>
            </div>
          </GlassCard>

          {filteredAlumni.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlumni.map((alumni, index) => (
                <ProfileCard
                  key={alumni.id}
                  profile={alumni}
                  animation="fade"
                  delay={index * 100}
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
