import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
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
  languages?: string[]; // Languages they teach (for language tutors)
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
    languages: ["English", "Spanish"],
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
    languages: ["Spanish", "English"],
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
    languages: ["English"],
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
    languages: ["Japanese", "English"],
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
    languages: ["Italian", "English"],
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
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    searchQuery: "",
    priceRange: "",
    availability: "",
    minRating: "",
    qualification: "",
    language: "",
  });
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<"25" | "50">("50");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate dates for the next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();
  const [currentWeekStart, setCurrentWeekStart] = useState(0);

  // Available time slots
  const timeSlots = ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

  const formatDate = (date: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
    };
  };

  const formatDateRange = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[startDate.getMonth()]} ${startDate.getDate()} – ${months[endDate.getMonth()]} ${endDate.getDate()}, ${startDate.getFullYear()}`;
  };

  const handleBookLesson = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setIsBookingModalOpen(true);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedDuration("50");
  };

  // Load saved selections from localStorage on mount
  useEffect(() => {
    const savedServices = localStorage.getItem("selectedServices");
    const savedLanguage = localStorage.getItem("selectedLanguage");
    const savedGrade = localStorage.getItem("selectedGrade");

    if (savedServices) {
      try {
        const services = JSON.parse(savedServices);
        setSelectedServices(services);
      } catch (e) {
        console.error("Failed to parse saved services:", e);
      }
    }

    if (savedLanguage) {
      setFilters((prev) => ({
        ...prev,
        language: savedLanguage,
      }));
    }

    // Clear the stored values after loading them
    localStorage.removeItem("selectedServices");
    localStorage.removeItem("selectedLanguage");
    localStorage.removeItem("selectedGrade");
  }, []);

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

  const availableLanguages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese",
    "Japanese",
    "Korean",
    "Arabic",
    "Russian",
    "Hindi",
  ];

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const priceOptions = [
    { label: "$20-$30/hr", min: 20, max: 30 },
    { label: "$30-$40/hr", min: 30, max: 40 },
    { label: "$40-$50/hr", min: 40, max: 50 },
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

      // Filter by language (only for language tutors)
      if (filters.language && tutor.languages) {
        if (!tutor.languages.includes(filters.language)) {
          return false;
        }
      }

      return true;
    });
  }, [selectedServices, filters]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="flex-grow">
        {/* Service Selection Section */}
        <section className="pt-6 pb-2 lg:pt-8 lg:pb-2 border-b border-border dark:border-slate-800">
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
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 dark:bg-primary/5"
                        : "border-border dark:border-slate-800 bg-background hover:border-primary/50"
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
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
        <section className="pt-4 pb-2 lg:pt-4 lg:pb-2 border-b border-border dark:border-slate-800">
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

              {/* Availability Category */}
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

              {/* Rating Category */}
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

              {/* Qualification Category */}
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

              {/* Language Category - Only show when Language Tuition is selected */}
              {selectedServices.includes("language") && (
                <button
                  onClick={() =>
                    setExpandedFilter(
                      expandedFilter === "language" ? null : "language"
                    )
                  }
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                    expandedFilter === "language" || filters.language
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-primary/20"
                  }`}
                >
                  Language
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedFilter === "language" ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Expanded Options - Display in next line */}
            {expandedFilter === "price" && (
              <div className="flex flex-wrap gap-2 mb-4 ml-2">
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filters.priceRange === option.label
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-primary/20"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {expandedFilter === "availability" && (
              <div className="flex flex-wrap gap-2 mb-4 ml-2">
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filters.availability === option
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-primary/20"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {expandedFilter === "rating" && (
              <div className="flex flex-wrap gap-2 mb-4 ml-2">
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filters.minRating === option
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-primary/20"
                    }`}
                  >
                    {option} Stars
                  </button>
                ))}
              </div>
            )}

            {expandedFilter === "qualification" && (
              <div className="flex flex-wrap gap-2 mb-4 ml-2">
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filters.qualification === option
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-primary/20"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {expandedFilter === "language" && selectedServices.includes("language") && (
              <div className="flex flex-wrap gap-2 mb-4 ml-2">
                {availableLanguages.map((language) => (
                  <button
                    key={language}
                    onClick={() => {
                      setFilters((prev) => ({
                        ...prev,
                        language: prev.language === language ? "" : language,
                      }));
                      setExpandedFilter(null);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filters.language === language
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-primary/20"
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            )}

            {/* Clear Filters Button */}
            {(filters.searchQuery ||
              filters.priceRange ||
              filters.availability ||
              filters.minRating ||
              filters.qualification ||
              filters.language ||
              selectedServices.length > 0) && (
              <button
                onClick={() => {
                  setFilters({
                    searchQuery: "",
                    priceRange: "",
                    availability: "",
                    minRating: "",
                    qualification: "",
                    language: "",
                  });
                  setSelectedServices([]);
                  setExpandedFilter(null);
                }}
                className="mt-4 px-4 py-2 rounded-lg border border-border dark:border-slate-800 text-sm font-medium text-foreground hover:bg-muted dark:hover:bg-slate-800 transition-colors"
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
                      searchQuery: "",
                      priceRange: "",
                      availability: "",
                      minRating: "",
                      qualification: "",
                      language: "",
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

                            <button 
                              onClick={() => navigate(`/tutor/${tutor.id}`)}
                              className="px-4 py-2 rounded-lg border-2 border-primary text-primary font-medium text-sm hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors"
                            >
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

                          <button 
                            onClick={() => handleBookLesson(tutor)}
                            className="w-full px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-600 transition-colors"
                          >
                            Book trial lesson
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
                      <button 
                        onClick={() => navigate(`/tutor/${tutor.id}`)}
                        className="flex-1 px-4 py-2 rounded-lg border-2 border-primary text-primary font-medium text-sm hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        View Profile
                      </button>
                      <button 
                        onClick={() => handleBookLesson(tutor)}
                        className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary-600 transition-colors"
                      >
                        Book trial lesson
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedTutor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-border dark:border-slate-800 p-6 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <img
                  src={selectedTutor.photo}
                  alt={selectedTutor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold text-foreground">Book a trial lesson</h2>
                  <p className="text-sm text-muted-foreground">to discuss your level and learning plan</p>
                </div>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Duration Selection */}
              <div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedDuration("25")}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                      selectedDuration === "25"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border dark:border-slate-700 text-foreground hover:border-primary/50"
                    }`}
                  >
                    25 mins
                  </button>
                  <button
                    onClick={() => setSelectedDuration("50")}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                      selectedDuration === "50"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border dark:border-slate-700 text-foreground hover:border-primary/50"
                    }`}
                  >
                    50 mins
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentWeekStart(Math.max(0, currentWeekStart - 7))}
                    disabled={currentWeekStart === 0}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-medium text-foreground">
                    {formatDateRange(dates[currentWeekStart])}
                  </span>
                  <button
                    onClick={() => setCurrentWeekStart(currentWeekStart + 7)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-4">
                  {dates.slice(currentWeekStart, currentWeekStart + 7).map((date, index) => {
                    const formatted = formatDate(date);
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    const isToday = date.toDateString() === new Date().toDateString();
                    
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        className={`flex flex-col items-center py-3 px-2 rounded-lg border-2 transition-colors ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : isToday
                            ? "border-primary/50 bg-primary/5 text-primary"
                            : "border-border dark:border-slate-700 text-foreground hover:border-primary/50"
                        }`}
                      >
                        <span className="text-xs font-medium mb-1">{formatted.day}</span>
                        <span className="text-lg font-bold">{formatted.date}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Zone Info */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 inline mr-1" />
                  In your time zone, Asia/Kolkata (GMT +5:30)
                </p>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Evening
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          selectedTime === time
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border dark:border-slate-700 text-foreground hover:border-primary/50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <button
                disabled={!selectedDate || !selectedTime}
                className="w-full py-3 px-6 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
