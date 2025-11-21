import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Search,
  Star,
  MapPin,
  DollarSign,
  Award,
  Clock,
  Globe,
  BookOpen,
  Users,
  ChevronDown,
} from "lucide-react";

interface Tutor {
  id: number;
  name: string;
  photo: string;
  services: string[];
  bio: string;
  hourlyRate: number;
  rating: number;
  reviews: number;
  qualification: string;
  availability: string;
  location: string;
  totalStudents: number;
  experience: number;
}

// Mock tutor data
const mockTutors: Tutor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    services: ["language", "group"],
    bio: "Native English speaker with 8+ years of teaching experience. Specializes in conversational skills and business English.",
    hourlyRate: 35,
    rating: 4.9,
    reviews: 156,
    qualification: "TEFL Certified",
    availability: "Full-time",
    location: "New York, USA",
    totalStudents: 320,
    experience: 8,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    services: ["school", "group"],
    bio: "PhD in Mathematics with 12 years of tutoring experience. Expert in calculus, algebra, and test preparation.",
    hourlyRate: 45,
    rating: 4.8,
    reviews: 203,
    qualification: "PhD Mathematics",
    availability: "Part-time",
    location: "San Francisco, USA",
    totalStudents: 450,
    experience: 12,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    services: ["language"],
    bio: "Spanish tutor from Madrid with passion for cultural immersion. Offers conversational and exam preparation courses.",
    hourlyRate: 28,
    rating: 4.7,
    reviews: 98,
    qualification: "MA in Spanish Literature",
    availability: "Full-time",
    location: "Los Angeles, USA",
    totalStudents: 210,
    experience: 6,
  },
  {
    id: 4,
    name: "Prof. James Wilson",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    services: ["school", "language"],
    bio: "Master's degree in Education. Specializes in English literature, writing skills, and standardized test prep.",
    hourlyRate: 42,
    rating: 4.9,
    reviews: 187,
    qualification: "M.Ed in Education",
    availability: "Full-time",
    location: "Boston, USA",
    totalStudents: 380,
    experience: 10,
  },
  {
    id: 5,
    name: "Yuki Tanaka",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    services: ["language", "group"],
    bio: "Japanese language specialist. Native speaker with interactive teaching methods. Great for beginners and advanced learners.",
    hourlyRate: 32,
    rating: 4.8,
    reviews: 142,
    qualification: "JLPT Instructor",
    availability: "Part-time",
    location: "Seattle, USA",
    totalStudents: 280,
    experience: 7,
  },
  {
    id: 6,
    name: "Dr. Alexandra Patel",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    services: ["school"],
    bio: "Science tutor with focus on physics and chemistry. Makes complex concepts easy to understand through practical examples.",
    hourlyRate: 38,
    rating: 4.7,
    reviews: 167,
    qualification: "PhD in Physics",
    availability: "Part-time",
    location: "Chicago, USA",
    totalStudents: 320,
    experience: 9,
  },
  {
    id: 7,
    name: "Marco Rossi",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    services: ["language"],
    bio: "Italian tutor from Rome. Patient and friendly approach. Specializes in grammar, pronunciation, and cultural understanding.",
    hourlyRate: 30,
    rating: 4.6,
    reviews: 89,
    qualification: "Certified Language Coach",
    availability: "Full-time",
    location: "Miami, USA",
    totalStudents: 190,
    experience: 5,
  },
  {
    id: 8,
    name: "Lisa Thompson",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    services: ["group"],
    bio: "Group class facilitator with expertise in collaborative learning. Creates engaging and interactive sessions for all levels.",
    hourlyRate: 25,
    rating: 4.8,
    reviews: 201,
    qualification: "Certified Group Instructor",
    availability: "Full-time",
    location: "Portland, USA",
    totalStudents: 520,
    experience: 8,
  },
];

export default function FindTutor() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    searchQuery: "",
    priceRange: "",
    availability: "",
    minRating: "",
    qualification: "",
  });
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const services = [
    {
      id: "language",
      name: "Language Tuition",
      icon: Globe,
    },
    {
      id: "school",
      name: "School Tuition",
      icon: BookOpen,
    },
    {
      id: "group",
      name: "Group Classes",
      icon: Users,
    },
  ];

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const priceOptions = [
    { label: "$20-$30", min: 20, max: 30 },
    { label: "$30-$40", min: 30, max: 40 },
    { label: "$40-$50", min: 40, max: 50 },
  ];

  const availabilityOptions = ["Full-time", "Part-time"];

  const ratingOptions = ["4+", "4.5+", "4.7+", "4.9"];

  const qualificationOptions = [
    "TEFL Certified",
    "PhD",
    "MA",
    "M.Ed",
    "Certified Instructor",
  ];

  // Filter tutors based on selected services and filters
  const filteredTutors = useMemo(() => {
    return mockTutors.filter((tutor) => {
      // Filter by service (show all if no service selected, or if tutor has ANY of the selected services)
      if (selectedServices.length > 0) {
        const hasService = tutor.services.some((service) =>
          selectedServices.includes(service)
        );
        if (!hasService) return false;
      }

      // Filter by search query (name, bio, qualification)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          tutor.name.toLowerCase().includes(query) ||
          tutor.bio.toLowerCase().includes(query) ||
          tutor.qualification.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Filter by price range
      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange
          .split("-")
          .map((p) => parseInt(p));
        if (tutor.hourlyRate < minPrice || tutor.hourlyRate > maxPrice) {
          return false;
        }
      }

      // Filter by availability
      if (
        filters.availability &&
        tutor.availability !== filters.availability
      ) {
        return false;
      }

      // Filter by rating
      if (filters.minRating) {
        const minRatingValue = parseFloat(filters.minRating);
        if (tutor.rating < minRatingValue) {
          return false;
        }
      }

      // Filter by qualification
      if (
        filters.qualification &&
        !tutor.qualification.includes(filters.qualification)
      ) {
        return false;
      }

      return true;
    });
  }, [selectedServices, filters]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="flex-grow">
        {/* Service Selection Section */}
        <section className="py-6 lg:py-8 border-b border-border dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Find Your Perfect Tutor
              </h1>
              <p className="text-muted-foreground">
                Select services and use filters to find the ideal tutor for your needs
              </p>
            </div>

            {/* Service Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-0">
              {services.map((service) => {
                const Icon = service.icon;
                const isSelected = selectedServices.includes(service.id);
                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 dark:bg-primary/5"
                        : "border-border dark:border-slate-800 bg-background hover:border-primary/50"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-3 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    <h3 className="font-semibold text-foreground text-left">
                      {service.name}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-4 lg:py-6 border-b border-border dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Full-width Search Box */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tutors, subjects, languages, qualifications..."
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchQuery: e.target.value,
                    }))
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
                />
              </div>
            </div>

            {/* Filter Categories in Single Line */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Price Range Category */}
              <div className="relative">
                <button
                  onClick={() =>
                    setExpandedFilter(
                      expandedFilter === "price" ? null : "price"
                    )
                  }
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                    expandedFilter === "price" || filters.priceRange
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-primary/20"
                  }`}
                >
                  Price Range
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedFilter === "price" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFilter === "price" && (
                  <div className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-900 border border-border dark:border-slate-800 rounded-lg p-3 z-10 whitespace-nowrap shadow-lg">
                    <div className="flex flex-col gap-2">
                      {priceOptions.map((option) => (
                        <button
                          key={option.label}
                          onClick={() => {
                            setFilters((prev) => ({
                              ...prev,
                              priceRange:
                                prev.priceRange === option.label
                                  ? ""
                                  : option.label,
                            }));
                            setExpandedFilter(null);
                          }}
                          className={`px-3 py-1.5 rounded text-xs font-medium transition-all text-left ${
                            filters.priceRange === option.label
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground hover:bg-primary/20"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Availability Category */}
              <div className="relative">
                <button
                  onClick={() =>
                    setExpandedFilter(
                      expandedFilter === "availability" ? null : "availability"
                    )
                  }
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                    expandedFilter === "availability" || filters.availability
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-primary/20"
                  }`}
                >
                  Availability
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedFilter === "availability" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFilter === "availability" && (
                  <div className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-900 border border-border dark:border-slate-800 rounded-lg p-3 z-10 whitespace-nowrap shadow-lg">
                    <div className="flex flex-col gap-2">
                      {availabilityOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setFilters((prev) => ({
                              ...prev,
                              availability:
                                prev.availability === option ? "" : option,
                            }));
                            setExpandedFilter(null);
                          }}
                          className={`px-3 py-1.5 rounded text-xs font-medium transition-all text-left ${
                            filters.availability === option
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground hover:bg-primary/20"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Rating Category */}
              <div className="relative">
                <button
                  onClick={() =>
                    setExpandedFilter(expandedFilter === "rating" ? null : "rating")
                  }
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                    expandedFilter === "rating" || filters.minRating
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-primary/20"
                  }`}
                >
                  Rating
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedFilter === "rating" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFilter === "rating" && (
                  <div className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-900 border border-border dark:border-slate-800 rounded-lg p-3 z-10 whitespace-nowrap shadow-lg">
                    <div className="flex flex-col gap-2">
                      {ratingOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setFilters((prev) => ({
                              ...prev,
                              minRating: prev.minRating === option ? "" : option,
                            }));
                            setExpandedFilter(null);
                          }}
                          className={`px-3 py-1.5 rounded text-xs font-medium transition-all text-left ${
                            filters.minRating === option
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground hover:bg-primary/20"
                          }`}
                        >
                          {option} Stars
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Qualification Category */}
              <div className="relative">
                <button
                  onClick={() =>
                    setExpandedFilter(
                      expandedFilter === "qualification" ? null : "qualification"
                    )
                  }
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                    expandedFilter === "qualification" || filters.qualification
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-primary/20"
                  }`}
                >
                  Qualification
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedFilter === "qualification" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFilter === "qualification" && (
                  <div className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-900 border border-border dark:border-slate-800 rounded-lg p-3 z-10 whitespace-nowrap shadow-lg max-h-48 overflow-y-auto">
                    <div className="flex flex-col gap-2">
                      {qualificationOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setFilters((prev) => ({
                              ...prev,
                              qualification:
                                prev.qualification === option ? "" : option,
                            }));
                            setExpandedFilter(null);
                          }}
                          className={`px-3 py-1.5 rounded text-xs font-medium transition-all text-left ${
                            filters.qualification === option
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground hover:bg-primary/20"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Clear Filters Button */}
            {(filters.searchQuery ||
              filters.priceRange ||
              filters.availability ||
              filters.minRating ||
              filters.qualification ||
              selectedServices.length > 0) && (
              <button
                onClick={() => {
                  setFilters({
                    searchQuery: "",
                    priceRange: "",
                    availability: "",
                    minRating: "",
                    qualification: "",
                  });
                  setSelectedServices([]);
                  setExpandedFilter(null);
                }}
                className="px-4 py-2 rounded-lg border border-border dark:border-slate-800 text-sm font-medium text-foreground hover:bg-muted dark:hover:bg-slate-800 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </section>

        {/* Tutors List Section */}
        <section className="pt-6 pb-8 lg:pt-6 lg:pb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Available Tutors ({filteredTutors.length})
              </h2>
              {selectedServices.length > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Showing tutors for:{" "}
                  {services
                    .filter((s) => selectedServices.includes(s.id))
                    .map((s) => s.name)
                    .join(", ")}
                </p>
              )}
            </div>

            {filteredTutors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No tutors found matching your criteria
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      name: "",
                      priceRange: [20, 50],
                      minRating: 0,
                      qualification: "",
                      location: "",
                    });
                    setSelectedServices([]);
                  }}
                  className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-600 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredTutors.map((tutor) => (
                  <div
                    key={tutor.id}
                    className="bg-white dark:bg-slate-900 border border-border dark:border-slate-800 rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                      {/* Left: Tutor Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-start gap-4">
                          {/* Hidden on mobile, shown on md+ */}
                          <div className="hidden md:block">
                            <img
                              src={tutor.photo}
                              alt={tutor.name}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                          </div>

                          <div className="flex-grow">
                            <h3 className="text-xl font-bold text-foreground mb-2">
                              {tutor.name}
                            </h3>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {tutor.bio}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="text-sm text-foreground">
                                  {tutor.rating} ({tutor.reviews} reviews)
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">
                                  {tutor.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">
                                  {tutor.qualification}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">
                                  {tutor.availability}
                                </span>
                              </div>
                            </div>

                            <button className="px-4 py-2 rounded-lg border-2 border-primary text-primary font-medium text-sm hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors">
                              View Profile
                            </button>
                          </div>
                        </div>

                        {/* Photo on mobile */}
                        <div className="md:hidden mt-4">
                          <img
                            src={tutor.photo}
                            alt={tutor.name}
                            className="w-full h-48 rounded-lg object-cover"
                          />
                        </div>
                      </div>

                      {/* Right: Photo and Price (Desktop) */}
                      <div className="hidden md:flex flex-col items-end gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2 justify-end mb-2">
                            <DollarSign className="w-5 h-5 text-primary" />
                            <span className="text-2xl font-bold text-primary">
                              {tutor.hourlyRate}
                            </span>
                            <span className="text-muted-foreground">/hour</span>
                          </div>

                          <button className="w-full px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-600 transition-colors">
                            Book Now
                          </button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                          <p>{tutor.totalStudents} Students</p>
                          <p>{tutor.experience} Yrs Experience</p>
                        </div>
                      </div>
                    </div>

                    {/* Mobile CTA */}
                    <div className="md:hidden mt-4 flex gap-3">
                      <button className="flex-1 px-4 py-2 rounded-lg border-2 border-primary text-primary font-medium text-sm hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors">
                        View Profile
                      </button>
                      <button className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary-600 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
