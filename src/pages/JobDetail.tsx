
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building, MapPin, Clock, Briefcase, Save, Calendar, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { toast } from "@/components/ui/use-toast";

// Mock job data - in a real app, this would be fetched from an API
const mockJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "Google",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png",
    location: "San Francisco, CA",
    salary: "120-150K",
    employmentType: "Full-time" as const,
    experienceLevel: "5+ years",
    postDate: new Date("2023-08-10"),
    deadline: new Date("2023-09-10"),
    description: "We are looking for a Senior React Developer to join our team. You will be responsible for building and maintaining user interfaces for our products.",
    responsibilities: [
      "Design and implement user interface components using React",
      "Optimize components for maximum performance",
      "Write reusable, testable, and efficient code",
      "Ensure the technical feasibility of UI/UX designs",
      "Collaborate with other team members and stakeholders"
    ],
    requirements: [
      "5+ years of experience with React",
      "Proficiency in JavaScript, HTML, and CSS",
      "Experience with RESTful APIs",
      "Familiarity with modern front-end build pipelines and tools",
      "Experience with common front-end development tools such as Babel, Webpack, NPM, etc."
    ],
    skills: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Node.js", "GraphQL"],
    benefits: [
      "Competitive salary",
      "Health, dental, and vision insurance",
      "401(k) matching",
      "Unlimited PTO",
      "Remote work options"
    ],
    postedById: "1",
    postedByName: "Priya Sharma",
    applied: false,
    saved: false,
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Microsoft",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    location: "Seattle, WA",
    salary: "90-120K",
    employmentType: "Full-time" as const,
    experienceLevel: "3+ years",
    postDate: new Date("2023-08-05"),
    deadline: new Date("2023-09-05"),
    description: "We are seeking a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have a strong portfolio, excellent visual design skills, and ability to translate high-level requirements into interaction flows and wireframes.",
    responsibilities: [
      "Create wireframes, storyboards, user flows, and prototypes",
      "Design UI elements and build design systems",
      "Present and defend designs and key deliverables to peers and executives",
      "Collaborate with product managers and engineers",
      "Conduct user research and evaluate user feedback"
    ],
    requirements: [
      "3+ years of UX/UI design experience",
      "Strong portfolio showing design thinking",
      "Proficiency in design tools (Figma, Sketch, Adobe XD)",
      "Understanding of HTML/CSS/JavaScript capabilities and constraints",
      "Excellent communication and presentation skills"
    ],
    skills: ["UI Design", "UX Design", "Figma", "Prototyping", "User Research", "Interaction Design"],
    benefits: [
      "Competitive salary",
      "Health benefits",
      "401(k) plan",
      "Professional development budget",
      "Fitness stipend"
    ],
    postedById: "2",
    postedByName: "Rahul Verma",
    applied: true,
    saved: false,
  },
  {
    id: "3",
    title: "Product Manager",
    company: "Amazon",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    location: "New York, NY",
    salary: "130-160K",
    employmentType: "Full-time" as const,
    experienceLevel: "4+ years",
    postDate: new Date("2023-08-08"),
    deadline: new Date("2023-09-08"),
    description: "We're looking for a Product Manager to define and launch products at scale. You'll work with engineering, design, analytics, and marketing to create products that users love.",
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Gather and prioritize product requirements",
      "Work closely with engineering teams to deliver features",
      "Analyze market trends and competition",
      "Define metrics and analyze product performance"
    ],
    requirements: [
      "4+ years of product management experience",
      "Experience with agile development methodologies",
      "Strong analytical and problem-solving skills",
      "Excellent written and verbal communication",
      "Technical background or experience working with technical teams"
    ],
    skills: ["Product Strategy", "Agile Methodologies", "Data Analysis", "User Stories", "Market Research"],
    benefits: [
      "Competitive compensation package",
      "Health insurance",
      "Stock options",
      "Flexible work arrangements",
      "Learning and development opportunities"
    ],
    postedById: "3",
    postedByName: "Ananya Patel",
    applied: false,
    saved: true,
  }
];

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const job = mockJobs.find(job => job.id === id);
  
  if (!job) {
    return (
      <div className="min-h-screen bg-kiit-black">
        <Navbar />
        <div className="pt-24 pb-16 container mx-auto px-4">
          <Link to="/jobs" className="text-white/70 hover:text-white flex items-center mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Jobs
          </Link>
          <GlassCard className="p-8">
            <h1 className="text-2xl text-white">Job not found</h1>
            <p className="text-white/70 mt-2">The job you're looking for doesn't exist or has been removed.</p>
          </GlassCard>
        </div>
        <Footer />
      </div>
    );
  }
  
  const {
    title,
    company,
    companyLogo,
    location,
    salary,
    employmentType,
    experienceLevel,
    postDate,
    deadline,
    description,
    responsibilities,
    requirements,
    skills,
    benefits,
    postedByName,
    applied,
    saved,
  } = job;
  
  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  // Get employment type color
  const getEmploymentTypeColor = () => {
    switch (employmentType) {
      case "Full-time":
        return "bg-blue-500/20 text-blue-200";
      case "Part-time":
        return "bg-purple-500/20 text-purple-200";
      case "Contract":
        return "bg-orange-500/20 text-orange-200";
      case "Internship":
        return "bg-green-500/20 text-green-200";
      case "Freelance":
        return "bg-pink-500/20 text-pink-200";
      default:
        return "bg-gray-500/20 text-gray-200";
    }
  };
  
  const handleApply = () => {
    toast({
      title: "Application Submitted",
      description: `You have successfully applied for ${title} at ${company}.`,
    });
  };
  
  const handleSave = () => {
    toast({
      title: saved ? "Job Removed" : "Job Saved",
      description: saved 
        ? `${title} has been removed from your saved jobs.`
        : `${title} has been added to your saved jobs.`,
    });
  };

  return (
    <div className="min-h-screen bg-kiit-black">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/jobs" className="text-white/70 hover:text-white flex items-center mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Jobs
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2">
              <GlassCard className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    {companyLogo ? (
                      <div className="mr-4 w-16 h-16 rounded overflow-hidden bg-white/5 flex items-center justify-center p-1">
                        <img
                          src={companyLogo}
                          alt={company}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="mr-4 w-16 h-16 bg-white/5 rounded flex items-center justify-center">
                        <Building className="w-8 h-8 text-white/40" />
                      </div>
                    )}
                    <div>
                      <h1 className="text-2xl font-bold text-white">{title}</h1>
                      <p className="text-white/70">{company}</p>
                      
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center text-white/70 text-sm">
                          <MapPin size={14} className="mr-1" />
                          <span>{location}</span>
                        </div>
                        
                        <div className="flex items-center text-white/70 text-sm">
                          <Briefcase size={14} className="mr-1" />
                          <span>{experienceLevel}</span>
                        </div>
                        
                        <div className="flex items-center text-white/70 text-sm">
                          <Clock size={14} className="mr-1" />
                          <span>Posted {formatDate(postDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <span 
                    className={`inline-block px-3 py-1 rounded text-sm font-medium ${getEmploymentTypeColor()}`}
                  >
                    {employmentType}
                  </span>
                  
                  {salary && (
                    <span className="ml-3 text-kiit-gold font-medium">
                      ${salary}
                    </span>
                  )}
                </div>
                
                <div className="mt-6">
                  <h2 className="text-lg font-medium text-white mb-3">Job Description</h2>
                  <p className="text-white/70">{description}</p>
                </div>
                
                {responsibilities && (
                  <div className="mt-6">
                    <h2 className="text-lg font-medium text-white mb-3">Responsibilities</h2>
                    <ul className="list-disc list-inside text-white/70 space-y-2">
                      {responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {requirements && (
                  <div className="mt-6">
                    <h2 className="text-lg font-medium text-white mb-3">Requirements</h2>
                    <ul className="list-disc list-inside text-white/70 space-y-2">
                      {requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {benefits && (
                  <div className="mt-6">
                    <h2 className="text-lg font-medium text-white mb-3">Benefits</h2>
                    <ul className="list-disc list-inside text-white/70 space-y-2">
                      {benefits.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mt-6">
                  <h2 className="text-lg font-medium text-white mb-3">Required Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 bg-white/5 rounded-full text-sm text-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <GlassCard className="p-6 sticky top-24">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-white mb-3">Job Details</h2>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/60">Job Type:</span>
                        <span className="text-white">{employmentType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Experience:</span>
                        <span className="text-white">{experienceLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Salary:</span>
                        <span className="text-white">${salary}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Posted:</span>
                        <span className="text-white">{formatDate(postDate)}</span>
                      </div>
                      {deadline && (
                        <div className="flex justify-between">
                          <span className="text-white/60">Deadline:</span>
                          <span className="text-white">{formatDate(deadline)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-white/60">Posted by:</span>
                        <Link to={`/profile/${postedByName}`} className="text-kiit-gold">
                          {postedByName}
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    {!applied ? (
                      <div className="space-y-3">
                        <AnimatedButton 
                          variant="primary" 
                          className="w-full"
                          onClick={handleApply}
                        >
                          Apply Now
                        </AnimatedButton>
                        
                        <AnimatedButton 
                          variant={saved ? "secondary" : "outline"}
                          className="w-full"
                          onClick={handleSave}
                        >
                          <Save size={16} className="mr-2" />
                          {saved ? "Saved" : "Save Job"}
                        </AnimatedButton>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <AnimatedButton 
                          variant="secondary" 
                          className="w-full"
                          disabled
                        >
                          Applied
                        </AnimatedButton>
                        
                        <AnimatedButton 
                          variant={saved ? "secondary" : "outline"}
                          className="w-full"
                          onClick={handleSave}
                        >
                          <Save size={16} className="mr-2" />
                          {saved ? "Saved" : "Save Job"}
                        </AnimatedButton>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-white font-medium mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full py-2 px-3 flex items-center rounded-md bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors">
                        <FileText size={16} className="mr-2" />
                        Download Job Description
                      </button>
                      <button className="w-full py-2 px-3 flex items-center rounded-md bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors">
                        <Calendar size={16} className="mr-2" />
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JobDetail;
