
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const AnimatedButton = ({
  variant = "primary",
  size = "md",
  children,
  className,
  isLoading = false,
  ...props
}: AnimatedButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-kiit-gold hover:bg-kiit-gold/90 text-black font-medium";
      case "secondary":
        return "bg-kiit-darkgray hover:bg-kiit-darkgray/80 text-white border border-white/10";
      case "outline":
        return "bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/30";
      case "ghost":
        return "bg-transparent hover:bg-white/5 text-white";
      case "link":
        return "bg-transparent text-kiit-gold hover:text-kiit-lightgold underline-offset-4 hover:underline p-0 h-auto";
      default:
        return "bg-kiit-gold hover:bg-kiit-gold/90 text-black font-medium";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs px-3 py-1.5 rounded-md";
      case "md":
        return "text-sm px-4 py-2 rounded-lg";
      case "lg":
        return "text-base px-6 py-3 rounded-xl";
      default:
        return "text-sm px-4 py-2 rounded-lg";
    }
  };

  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300 font-medium",
        "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full",
        "before:bg-white/10 before:opacity-0 before:transition-opacity before:duration-300",
        "hover:before:opacity-100 active:scale-95",
        "disabled:pointer-events-none disabled:opacity-50",
        getVariantClasses(),
        getSizeClasses(),
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

export default AnimatedButton;
