
import React, { useState } from "react";
import { Search, ChevronDown, X, Filter } from "lucide-react";
import AnimatedButton from "../ui/AnimatedButton";
import { cn } from "@/lib/utils";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: Record<string, string[]>) => void;
  className?: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onFilterChange,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [openFilterGroup, setOpenFilterGroup] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Example filter groups
  const filterGroups: FilterGroup[] = [
    {
      id: "department",
      label: "Department",
      options: [
        { id: "cs", label: "Computer Science" },
        { id: "it", label: "Information Technology" },
        { id: "ee", label: "Electrical Engineering" },
        { id: "me", label: "Mechanical Engineering" },
        { id: "civil", label: "Civil Engineering" },
      ],
    },
    {
      id: "graduationYear",
      label: "Graduation Year",
      options: [
        { id: "2023", label: "2023" },
        { id: "2022", label: "2022" },
        { id: "2021", label: "2021" },
        { id: "2020", label: "2020" },
        { id: "2019", label: "2019" },
      ],
    },
    {
      id: "industry",
      label: "Industry",
      options: [
        { id: "tech", label: "Technology" },
        { id: "finance", label: "Finance" },
        { id: "healthcare", label: "Healthcare" },
        { id: "education", label: "Education" },
        { id: "consulting", label: "Consulting" },
      ],
    },
    {
      id: "location",
      label: "Location",
      options: [
        { id: "india", label: "India" },
        { id: "us", label: "United States" },
        { id: "uk", label: "United Kingdom" },
        { id: "canada", label: "Canada" },
        { id: "australia", label: "Australia" },
      ],
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleFilter = (groupId: string, optionId: string) => {
    setActiveFilters((prev) => {
      const groupFilters = prev[groupId] || [];
      const updated = groupFilters.includes(optionId)
        ? groupFilters.filter((id) => id !== optionId)
        : [...groupFilters, optionId];

      const newFilters = {
        ...prev,
        [groupId]: updated,
      };

      // If the group has no filters, remove it
      if (newFilters[groupId].length === 0) {
        delete newFilters[groupId];
      }

      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };

  const totalActiveFilters = Object.values(activeFilters).reduce(
    (sum, filters) => sum + filters.length,
    0
  );

  const getFilterLabel = (groupId: string, optionId: string) => {
    const group = filterGroups.find((g) => g.id === groupId);
    if (!group) return optionId;
    const option = group.options.find((o) => o.id === optionId);
    return option ? option.label : optionId;
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col md:flex-row gap-4">
        <form 
          className="flex-1 relative"
          onSubmit={handleSearchSubmit}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-white/40" />
          </div>
          <input
            type="text"
            placeholder="Search alumni by name, company, skills..."
            className="w-full py-2.5 pl-10 pr-4 bg-kiit-darkgray text-white rounded-lg border border-white/10 
                       focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="md:hidden">
          <AnimatedButton
            variant="outline"
            onClick={() => setShowMobileFilters(true)}
            className="w-full flex items-center justify-center"
          >
            <Filter size={16} className="mr-2" />
            Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}
          </AnimatedButton>
        </div>

        <div className="hidden md:flex space-x-4">
          {filterGroups.map((group) => (
            <div key={group.id} className="relative">
              <button
                className={cn(
                  "px-4 py-2.5 bg-kiit-darkgray text-white rounded-lg border transition-colors flex items-center space-x-2",
                  openFilterGroup === group.id
                    ? "border-kiit-gold"
                    : "border-white/10 hover:border-white/30"
                )}
                onClick={() => setOpenFilterGroup(openFilterGroup === group.id ? null : group.id)}
              >
                <span>{group.label}</span>
                {activeFilters[group.id]?.length > 0 && (
                  <span className="w-5 h-5 bg-kiit-gold rounded-full text-xs flex items-center justify-center text-black font-medium">
                    {activeFilters[group.id].length}
                  </span>
                )}
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform",
                    openFilterGroup === group.id && "transform rotate-180"
                  )}
                />
              </button>

              {openFilterGroup === group.id && (
                <div className="absolute z-10 mt-2 w-64 rounded-lg bg-kiit-darkgray border border-white/10 shadow-lg animate-fade-in">
                  <div className="p-3">
                    <div className="mb-2 text-sm font-medium text-white">
                      {group.label}
                    </div>
                    <div className="space-y-1.5">
                      {group.options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center"
                        >
                          <label className="flex items-center w-full p-2 rounded hover:bg-white/5 cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                              checked={activeFilters[group.id]?.includes(option.id) || false}
                              onChange={() => toggleFilter(group.id, option.id)}
                            />
                            <span className="text-sm text-white/90">{option.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {totalActiveFilters > 0 && (
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-white/60 hover:text-white"
            >
              Clear All
            </AnimatedButton>
          )}
        </div>
      </div>

      {/* Active filters display */}
      {totalActiveFilters > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([groupId, optionIds]) =>
            optionIds.map((optionId) => (
              <div
                key={`${groupId}-${optionId}`}
                className="flex items-center bg-kiit-darkgray/70 px-2 py-1 rounded-md text-sm"
              >
                <span className="text-white/60 mr-1">{filterGroups.find(g => g.id === groupId)?.label}:</span>
                <span className="text-white">{getFilterLabel(groupId, optionId)}</span>
                <button
                  className="ml-2 text-white/60 hover:text-white"
                  onClick={() => toggleFilter(groupId, optionId)}
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
          <button
            className="text-white/60 hover:text-white text-sm underline"
            onClick={clearAllFilters}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Mobile filter modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end md:hidden">
          <div className="w-full max-h-[80vh] bg-kiit-black rounded-t-xl overflow-hidden animate-slide-up">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-white font-medium">Filters</h3>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="p-1 text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(80vh-4rem)] p-4 custom-scrollbar">
              {filterGroups.map((group) => (
                <div key={group.id} className="mb-6">
                  <h4 className="mb-3 text-sm font-medium text-white">
                    {group.label}
                  </h4>
                  <div className="space-y-2">
                    {group.options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center"
                      >
                        <label className="flex items-center w-full p-2 rounded hover:bg-white/5 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                            checked={activeFilters[group.id]?.includes(option.id) || false}
                            onChange={() => toggleFilter(group.id, option.id)}
                          />
                          <span className="text-sm text-white/90">{option.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-white/10 flex gap-4">
              <AnimatedButton
                variant="outline"
                className="flex-1"
                onClick={clearAllFilters}
              >
                Clear All
              </AnimatedButton>
              <AnimatedButton
                variant="primary"
                className="flex-1"
                onClick={() => setShowMobileFilters(false)}
              >
                Apply ({totalActiveFilters})
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
