
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
  >
    {children}
  </a>
);

const SocialLink = ({ 
  href, children, label 
}: { 
  href: string; 
  children: React.ReactNode; 
  label: string;
}) => (
  <a 
    href={href} 
    aria-label={label}
    className="text-white/70 hover:text-kiit-gold transition-colors p-2 rounded-full hover:bg-white/5"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-kiit-darkgray pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1">
            <Link to="/" className="inline-block mb-6">
              <h1 className="text-lg font-display font-bold text-white flex items-center">
                <span className="text-gold-gradient">KIIT</span>
                <span className="ml-1">Connect</span>
              </h1>
            </Link>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Connecting KIIT students and alumni to foster collaboration, career growth, and community.
            </p>
            <div className="flex space-x-2">
              <SocialLink href="#" label="Facebook">
                <Facebook size={18} />
              </SocialLink>
              <SocialLink href="#" label="Twitter">
                <Twitter size={18} />
              </SocialLink>
              <SocialLink href="#" label="LinkedIn">
                <Linkedin size={18} />
              </SocialLink>
              <SocialLink href="#" label="Instagram">
                <Instagram size={18} />
              </SocialLink>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-white mb-4">Connect</h3>
            <ul className="space-y-3">
              <li><FooterLink href="/alumni">Alumni Directory</FooterLink></li>
              <li><FooterLink href="/mentorship">Mentorship</FooterLink></li>
              <li><FooterLink href="/communities">Communities</FooterLink></li>
              <li><FooterLink href="/messages">Messages</FooterLink></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><FooterLink href="/events">Events & Meetups</FooterLink></li>
              <li><FooterLink href="/jobs">Job Board</FooterLink></li>
              <li><FooterLink href="/success-stories">Success Stories</FooterLink></li>
              <li><FooterLink href="/faq">FAQ</FooterLink></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-white mb-4">Stay Updated</h3>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-kiit-black border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-kiit-gold"
              />
              <button className="absolute right-0 top-0 h-full px-3 text-kiit-gold hover:text-kiit-lightgold transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-xs mb-4 md:mb-0">
            © {new Date().getFullYear()} KIIT Connect. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs text-white/40">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/70 transition-colors">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
