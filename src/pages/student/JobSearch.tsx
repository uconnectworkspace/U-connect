import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Briefcase, Clock, Building2, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const JobSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);

  const jobs = [
    {
      id: 1,
      company: "Tech Company A",
      logo: "🚀",
      position: "Full-Stack Developer Intern",
      location: "Bangkok",
      type: "Full-time",
      salary: "15,000–20,000 THB",
      tags: ["React", "Node.js", "MongoDB"],
      posted: "2 days ago",
      applicants: 45,
      experience: "0–1 year",
    },
    {
      id: 2,
      company: "AI Startup",
      logo: "🤖",
      position: "Machine Learning Intern",
      location: "Bangkok",
      type: "Part-time",
      salary: "12,000–18,000 THB",
      tags: ["Python", "TensorFlow", "Deep Learning"],
      posted: "3 days ago",
      applicants: 32,
      experience: "1–2 years",
    },
    {
      id: 3,
      company: "E-commerce Company",
      logo: "🛒",
      position: "Frontend Developer Intern",
      location: "Nonthaburi",
      type: "Full-time",
      salary: "14,000–19,000 THB",
      tags: ["React", "TypeScript", "CSS"],
      posted: "5 days ago",
      applicants: 28,
      experience: "0–1 year",
    },
    {
      id: 4,
      company: "Consulting Firm",
      logo: "💼",
      position: "Business Analyst Intern",
      location: "Remote",
      type: "Hybrid",
      salary: "13,000–17,000 THB",
      tags: ["Excel", "SQL", "PowerBI"],
      posted: "1 week ago",
      applicants: 51,
      experience: "No experience required",
    },
    {
      id: 5,
      company: "Finance Company B",
      logo: "💰",
      position: "Data Analyst Intern",
      location: "Pathum Thani",
      type: "Full-time",
      salary: "16,000–22,000 THB",
      tags: ["Python", "SQL", "Tableau"],
      posted: "3 days ago",
      applicants: 38,
      experience: "0–1 year",
    },
    {
      id: 6,
      company: "Marketing Agency C",
      logo: "📱",
      position: "Digital Marketing Intern",
      location: "Chiang Mai",
      type: "Full-time",
      salary: "11,000–15,000 THB",
      tags: ["SEO", "Social Media", "Google Ads"],
      posted: "4 days ago",
      applicants: 42,
      experience: "No experience required",
    },
    {
      id: 7,
      company: "Fintech Company D",
      logo: "💳",
      position: "Backend Developer Intern",
      location: "Samut Prakan",
      type: "Full-time",
      salary: "17,000–23,000 THB",
      tags: ["Node.js", "PostgreSQL", "Docker"],
      posted: "1 day ago",
      applicants: 29,
      experience: "1–2 years",
    },
    {
      id: 8,
      company: "Design Studio",
      logo: "🎨",
      position: "UI/UX Designer Intern",
      location: "Ayutthaya",
      type: "Hybrid",
      salary: "12,000–16,000 THB",
      tags: ["Figma", "Adobe XD", "Prototyping"],
      posted: "6 days ago",
      applicants: 35,
      experience: "No experience required",
    },
  ];

  const jobTypes = ["Full-time", "Part-time"];
  const locations = ["Onsite", "Remote", "Hybrid"];
  const skills = [
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "SQL",
    "MongoDB",
    "PostgreSQL",
    "TensorFlow",
    "Docker",
    "Figma",
    "Excel",
    "PowerBI",
    "Tableau",
    "SEO",
  ];
  const experiences = [
    "No experience required",
    "0–1 year",
    "1–2 years",
    "2+ years",
  ];

  const toggleFilter = (
    value: string,
    selectedArray: string[],
    setSelectedArray: (arr: string[]) => void
  ) => {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter((item) => item !== value));
    } else {
      setSelectedArray([...selectedArray, value]);
    }
  };

  const toggleSaveJob = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
      toast.success("Job removed from saved list");
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast.success("Job saved successfully");
    }
  };

  const handleApply = (position: string) => {
    toast.success(`Successfully applied for ${position}!`);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesType =
      selectedJobTypes.length === 0 ||
      selectedJobTypes.includes(job.type);

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    const matchesSkill =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => job.tags.includes(skill));

    const matchesExperience =
      selectedExperiences.length === 0 ||
      selectedExperiences.includes(job.experience);

    return (
      matchesSearch &&
      matchesType &&
      matchesLocation &&
      matchesSkill &&
      matchesExperience
    );
  });

  const resetFilters = () => {
    setSelectedJobTypes([]);
    setSelectedLocations([]);
    setSelectedSkills([]);
    setSelectedExperiences([]);
    setSearchQuery("");
  };

  const activeFiltersCount =
    selectedJobTypes.length +
    selectedLocations.length +
    selectedSkills.length +
    selectedExperiences.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Internship Job Search</h1>
          <p className="text-muted-foreground">
            Found {filteredJobs.length} matching positions
          </p>
        </div>

        <div className="flex gap-6">
          {/* Filters */}
          <div className="w-[30%]">
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Search</CardTitle>
                  <div className="relative w-full ml-2">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search job title, company, skills..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary">{activeFiltersCount}</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Job Type */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Job Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {jobTypes.map((type) => (
                      <Button
                        key={type}
                        variant={
                          selectedJobTypes.includes(type)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          toggleFilter(
                            type,
                            selectedJobTypes,
                            setSelectedJobTypes
                          )
                        }
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Location
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((location) => (
                      <Button
                        key={location}
                        variant={
                          selectedLocations.includes(location)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          toggleFilter(
                            location,
                            selectedLocations,
                            setSelectedLocations
                          )
                        }
                      >
                        {location}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Skills
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Button
                        key={skill}
                        variant={
                          selectedSkills.includes(skill)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          toggleFilter(
                            skill,
                            selectedSkills,
                            setSelectedSkills
                          )
                        }
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Experience
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {experiences.map((exp) => (
                      <Button
                        key={exp}
                        variant={
                          selectedExperiences.includes(exp)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          toggleFilter(
                            exp,
                            selectedExperiences,
                            setSelectedExperiences
                          )
                        }
                      >
                        {exp}
                      </Button>
                    ))}
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={resetFilters}
                  >
                    Reset Filters ({activeFiltersCount})
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Job List */}
          <div className="flex-1 space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="text-4xl">{job.logo}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">
                            {job.position}
                          </h3>
                          <p className="text-muted-foreground flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {job.company}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleSaveJob(job.id)}
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              savedJobs.includes(job.id)
                                ? "fill-red-500 text-red-500"
                                : ""
                            }`}
                          />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground my-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> {job.posted}
                        </span>
                        <span>💰 {job.salary}</span>
                        <span>📊 {job.experience}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={() => handleApply(job.position)}>
                          Apply Now
                        </Button>
                        <Button variant="outline">View Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredJobs.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-lg text-muted-foreground">
                    No jobs match your search criteria
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your filters or keywords
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
