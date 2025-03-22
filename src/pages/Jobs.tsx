
import React, { useState } from "react";
import { Search, Filter, Plus, Briefcase, MapPin, Building } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedButton from "@/components/ui/AnimatedButton";
import JobListing, { JobData } from "@/components/alumni/JobListing";
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState<"all" | "saved" | "applied">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock data for jobs
  const jobs: JobData[] = [
    {
      id: "1",
      title: "Front-end Developer",
      company: "TechCorp India",
      companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
      location: "Remote",
      salary: "80K - 120K",
      employmentType: "Full-time",
      experienceLevel: "2-4 years",
      postDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
      description: "We're looking for a talented front-end developer with experience in React and modern JavaScript frameworks to join our growing team.",
      skills: ["React", "JavaScript", "CSS", "UI/UX"],
      postedById: "101",
      postedByName: "Aditya Singh (Class of 2015)",
      applied: false,
      saved: true,
    },
    {
      id: "2",
      title: "Machine Learning Engineer",
      company: "DataViz Solutions",
      location: "Hyderabad, India",
      employmentType: "Full-time",
      experienceLevel: "3+ years",
      postDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      description: "Join our AI team to develop and deploy machine learning models at scale. You'll work on cutting-edge problems in data analysis and predictive modeling.",
      skills: ["Python", "TensorFlow", "PyTorch", "Statistics", "Computer Vision"],
      postedById: "102",
      postedByName: "Meera Kapoor (Class of 2017)",
      applied: false,
      saved: false,
    },
    {
      id: "3",
      title: "Product Manager",
      company: "InnovateX",
      companyLogo: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=200&auto=format&fit=crop",
      location: "Bangalore, India",
      salary: "110K - 150K",
      employmentType: "Full-time",
      experienceLevel: "5+ years",
      postDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      description: "We're seeking an experienced product manager to lead our mobile applications team. You'll be responsible for the product roadmap, user research, and working closely with engineering teams.",
      skills: ["Product Strategy", "User Research", "Agile/Scrum", "Mobile Apps", "Analytics"],
      postedById: "103",
      postedByName: "Vikram Patel (Class of 2012)",
      applied: true,
      saved: true,
    },
    {
      id: "4",
      title: "UX Designer Intern",
      company: "DesignHub",
      location: "Mumbai, India",
      employmentType: "Internship",
      experienceLevel: "0-1 years",
      postDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      description: "Great opportunity for students or recent graduates to gain hands-on experience in UX design. You'll work on real projects under the guidance of senior designers.",
      skills: ["UI/UX", "Figma", "User Research", "Prototyping", "Design Thinking"],
      postedById: "104",
      postedByName: "Priya Sharma (Class of 2018)",
      applied: false,
      saved: false,
    },
    {
      id: "5",
      title: "DevOps Engineer",
      company: "CloudNative Technologies",
      companyLogo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=200&auto=format&fit=crop",
      location: "Pune, India",
      salary: "90K - 130K",
      employmentType: "Full-time",
      experienceLevel: "2-5 years",
      postDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      description: "Join our platform team to build and maintain our cloud infrastructure. You'll work with cutting-edge technologies and help scale our systems to meet growing demand.",
      skills: ["AWS", "Kubernetes", "Docker", "CI/CD", "Infrastructure as Code"],
      postedById: "105",
      postedByName: "Rahul Mehta (Class of 2016)",
      applied: true,
      saved: false,
    },
    {
      id: "6",
      title: "Data Scientist",
      company: "FinTech Innovations",
      location: "Delhi, India",
      employmentType: "Contract",
      experienceLevel: "3-7 years",
      postDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      description: "We're looking for a data scientist to help us analyze financial data and build predictive models. This is a 6-month contract with possibility of extension.",
      skills: ["Python", "R", "SQL", "Machine Learning", "Financial Analysis"],
      postedById: "106",
      postedByName: "Ananya Mishra (Class of 2019)",
      applied: false,
      saved: false,
    },
  ];

  // Filter jobs based on activeTab
  const filteredJobs = jobs.filter(job => {
    if (activeTab === "all") {
      return true;
    } else if (activeTab === "saved" && job.saved) {
      return true;
    } else if (activeTab === "applied" && job.applied) {
      return true;
    }
    
    return false;
  });

  // Search functionality
  const searchedJobs = searchQuery
    ? filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredJobs;

  return (
    <div className="min-h-screen bg-kiit-black">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-3xl font-display font-bold text-white">Job Board</h1>
            
            <AnimatedButton variant="primary">
              <Plus size={16} className="mr-2" />
              Post a Job
            </AnimatedButton>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-1">
              <GlassCard className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-white mb-4">Filters</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                      <button 
                        className={cn(
                          "flex-1 py-2 text-sm font-medium",
                          activeTab === "all" 
                            ? "bg-kiit-gold text-black" 
                            : "bg-transparent text-white/70 hover:bg-white/5"
                        )}
                        onClick={() => setActiveTab("all")}
                      >
                        All Jobs
                      </button>
                      <button 
                        className={cn(
                          "flex-1 py-2 text-sm font-medium",
                          activeTab === "saved" 
                            ? "bg-kiit-gold text-black" 
                            : "bg-transparent text-white/70 hover:bg-white/5"
                        )}
                        onClick={() => setActiveTab("saved")}
                      >
                        Saved
                      </button>
                      <button 
                        className={cn(
                          "flex-1 py-2 text-sm font-medium",
                          activeTab === "applied" 
                            ? "bg-kiit-gold text-black" 
                            : "bg-transparent text-white/70 hover:bg-white/5"
                        )}
                        onClick={() => setActiveTab("applied")}
                      >
                        Applied
                      </button>
                    </div>
                    
                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search size={16} className="text-white/40" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search jobs..."
                          className="w-full py-2 pl-10 pr-4 bg-kiit-darkgray text-white rounded-lg border border-white/10 
                                   focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <button 
                        className="flex items-center justify-between w-full py-2 text-white/80 hover:text-white"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <span className="font-medium">Advanced Filters</span>
                        <Filter size={16} />
                      </button>
                      
                      {showFilters && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-white/80 mb-2">Job Type</h3>
                            <div className="space-y-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                                />
                                <span className="text-sm text-white/70">Full-time</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                                />
                                <span className="text-sm text-white/70">Part-time</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                                />
                                <span className="text-sm text-white/70">Contract</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                                />
                                <span className="text-sm text-white/70">Internship</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                                />
                                <span className="text-sm text-white/70">Freelance</span>
                              </label>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-white/80 mb-2">Experience Level</h3>
                            <div className="space-y-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                                />
                                <span className="text-sm text-white/70">Entry Level</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                                />
                                <span className="text-sm text-white/70">Mid Level</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                                />
                                <span className="text-sm text-white/70">Senior Level</span>
                              </label>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-white/80 mb-2">Location</h3>
                            <select
                              className="w-full py-2 px-3 bg-kiit-darkgray text-white rounded-lg border border-white/10 
                                       focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold text-sm"
                            >
                              <option value="">All Locations</option>
                              <option value="remote">Remote</option>
                              <option value="bangalore">Bangalore</option>
                              <option value="delhi">Delhi</option>
                              <option value="mumbai">Mumbai</option>
                              <option value="hyderabad">Hyderabad</option>
                              <option value="pune">Pune</option>
                            </select>
                          </div>
                          
                          <AnimatedButton variant="outline" size="sm" className="w-full">
                            Apply Filters
                          </AnimatedButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-white mb-4">Popular Companies</h2>
                  
                  <div className="space-y-4">
                    {Array.from(new Set(jobs.map(job => job.company)))
                      .slice(0, 5)
                      .map((company, index) => {
                        const companyJob = jobs.find(job => job.company === company);
                        
                        return (
                          <div key={index} className="flex gap-3">
                            <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-white/5 flex items-center justify-center">
                              {companyJob?.companyLogo ? (
                                <img
                                  src={companyJob.companyLogo}
                                  alt={company}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <Building size={18} className="text-kiit-gold/70" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-white leading-tight">
                                {company}
                              </h3>
                              <div className="flex items-center text-white/50 text-xs mt-1">
                                <Briefcase size={10} className="mr-1" />
                                {jobs.filter(job => job.company === company).length} open positions
                              </div>
                              <div className="flex items-center text-white/50 text-xs mt-0.5">
                                <MapPin size={10} className="mr-1" />
                                {companyJob?.location}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </GlassCard>
            </div>
            
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchedJobs.length > 0 ? (
                  searchedJobs.map(job => (
                    <JobListing key={job.id} job={job} animation="fade" />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-16">
                    <Briefcase size={48} className="text-white/20 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No jobs found</h3>
                    <p className="text-white/60 text-center max-w-md">
                      {searchQuery 
                        ? `No jobs matching "${searchQuery}" were found. Try a different search term.` 
                        : activeTab === "saved" 
                          ? "You haven't saved any jobs yet." 
                          : activeTab === "applied" 
                            ? "You haven't applied to any jobs yet."
                            : "There are no jobs available at the moment."}
                    </p>
                    {activeTab !== "all" && (
                      <AnimatedButton 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setActiveTab("all")}
                      >
                        View All Jobs
                      </AnimatedButton>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Jobs;
