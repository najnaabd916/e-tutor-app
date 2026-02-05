import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  BookOpen,
  Globe,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "language",
    name: "Language Tuition",
    description: "Learn new languages with expert tutors",
    icon: Globe,
  },
  {
    id: "school",
    name: "School Subjects",
    description: "Get help with homework and exam prep",
    icon: BookOpen,
  },
  {
    id: "group",
    name: "Group Classes",
    description: "Join collaborative learning sessions",
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
  "Chinese (Mandarin)",
  "Japanese",
  "Korean",
  "Arabic",
  "Russian",
  "Hindi",
];

const grades = [
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

export default function SelectServices() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [error, setError] = useState("");

  // Redirect if not logged in
  if (!user) {
    navigate("/signup");
    return null;
  }

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        // Remove service
        if (serviceId === "language") {
          setSelectedLanguages([]);
        }
        if (serviceId === "school") {
          setSelectedGrade("");
        }
        return prev.filter((id) => id !== serviceId);
      }
      // Add service
      return [...prev, serviceId];
    });
    setError("");
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(language)) {
        return prev.filter((lang) => lang !== language);
      }
      return [...prev, language];
    });
    setError("");
  };

  const handleContinue = () => {
    // Validation
    if (selectedServices.length === 0) {
      setError("Please select at least one service");
      return;
    }

    if (
      selectedServices.includes("language") &&
      selectedLanguages.length === 0
    ) {
      setError(
        user.role === "student"
          ? "Please select at least one language you want to learn"
          : "Please select at least one language you can teach"
      );
      return;
    }

    if (selectedServices.includes("school") && !selectedGrade) {
      setError(
        user.role === "student"
          ? "Please select your grade level"
          : "Please select the grade level you teach"
      );
      return;
    }

    // In a real app, you would save this to the backend
    console.log("Selected services:", selectedServices);
    console.log("Selected languages:", selectedLanguages);
    console.log("Selected grade:", selectedGrade);

    // Store selections in localStorage to auto-select on Find Tutor page
    localStorage.setItem("selectedServices", JSON.stringify(selectedServices));
    if (selectedLanguages.length > 0) {
      localStorage.setItem("selectedLanguage", selectedLanguages[0]); // Store first selected language
    }
    if (selectedGrade) {
      localStorage.setItem("selectedGrade", selectedGrade);
    }

    // Navigate to find tutor page
    navigate("/find-tutor");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-border dark:border-slate-800 p-8">
            {/* Header */}
            <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {user.role === "student"
                ? "What would you like to learn?"
                : "What services do you offer?"}
            </h1>
            <p className="text-muted-foreground">
              {user.role === "student"
                ? "Select the services you're interested in to get personalized tutor recommendations"
                : "Select the services you want to teach"}
            </p>
          </div>

          {/* Services Grid */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Select Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map((service) => {
                const Icon = service.icon;
                const isSelected = selectedServices.includes(service.id);
                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left relative ${
                      isSelected
                        ? "border-primary bg-primary/5 dark:bg-primary/10"
                        : "border-border dark:border-slate-800 hover:border-primary/50"
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-primary" />
                    )}
                    <Icon
                      className={`w-6 h-6 mb-2 ${
                        isSelected ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <h3 className="font-semibold text-foreground mb-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Selection - Only show if Language Tuition is selected */}
          {selectedServices.includes("language") && (
            <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                {user.role === "student"
                  ? "Select Languages You Want to Learn"
                  : "Select Languages You Can Teach"}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Choose all languages that apply
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableLanguages.map((language) => {
                  const isSelected = selectedLanguages.includes(language);
                  return (
                    <button
                      key={language}
                      onClick={() => handleLanguageToggle(language)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border dark:border-slate-700 text-foreground hover:border-primary/50"
                      }`}
                    >
                      {language}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Grade Selection - Only show if School Subjects is selected */}
          {selectedServices.includes("school") && (
            <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                {user.role === "student"
                  ? "Select Your Grade Level"
                  : "Select Grade Level You Teach"}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Choose the grade that applies to you
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {grades.map((grade) => {
                  const isSelected = selectedGrade === grade;
                  return (
                    <button
                      key={grade}
                      onClick={() => {
                        setSelectedGrade(grade);
                        setError("");
                      }}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border dark:border-slate-700 text-foreground hover:border-primary/50"
                      }`}
                    >
                      {grade}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleContinue}
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );
}
