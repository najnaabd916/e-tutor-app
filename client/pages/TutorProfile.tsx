import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Star,
  MapPin,
  DollarSign,
  Award,
  Clock,
  Calendar,
  Users,
  BookOpen,
  CheckCircle,
  ArrowLeft,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
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
  languages: string[];
  expertise: string[];
  education: string[];
  achievements: string[];
  about: string;
}

// Mock tutor data - in real app, this would come from an API
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
    languages: ["English (Native)", "Spanish (Fluent)", "French (Basic)"],
    expertise: ["Business English", "Conversational English", "IELTS Preparation", "Accent Reduction"],
    education: [
      "TEFL Certification - International TEFL Academy",
      "BA in English Literature - Columbia University",
      "MA in Education - New York University"
    ],
    achievements: [
      "Top-rated tutor on platform for 3 consecutive years",
      "95% student success rate in IELTS exams",
      "Published author of 'English Made Easy' workbook",
      "Featured in Education Weekly magazine"
    ],
    about: "Hello! I'm Sarah, a passionate English teacher with over 8 years of experience helping students achieve their language goals. I believe in creating a fun, interactive learning environment where students feel comfortable making mistakes and learning from them. My teaching approach combines traditional methods with modern technology to ensure engaging and effective lessons. Whether you're preparing for an exam, improving your business communication, or simply want to speak English more confidently, I'm here to help you succeed!"
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
    languages: ["English (Native)", "Mandarin (Native)"],
    expertise: ["Calculus", "Algebra", "SAT Math", "AP Calculus", "Linear Algebra"],
    education: [
      "PhD in Mathematics - Stanford University",
      "MS in Applied Mathematics - MIT",
      "BS in Mathematics - UC Berkeley"
    ],
    achievements: [
      "100% of students improved by at least one grade level",
      "Published 15+ research papers in mathematical journals",
      "Former professor at Stanford University",
      "Mathematics Olympiad coach"
    ],
    about: "I'm Dr. Michael Chen, and I have a deep passion for making mathematics accessible and enjoyable for students of all levels. With a PhD from Stanford and years of teaching experience, I've developed unique methods to simplify complex mathematical concepts. My goal is not just to help you pass exams, but to develop a genuine understanding and appreciation for mathematics that will serve you throughout your life."
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
    languages: ["Spanish (Native)", "English (Fluent)", "Portuguese (Intermediate)"],
    expertise: ["Conversational Spanish", "Spanish Literature", "DELE Preparation", "Latin American Culture"],
    education: [
      "MA in Spanish Literature - Universidad Complutense de Madrid",
      "BA in Hispanic Studies - UCLA",
      "Teaching Spanish as a Foreign Language Certificate"
    ],
    achievements: [
      "90% student pass rate in DELE exams",
      "Cultural exchange program coordinator",
      "Featured speaker at language learning conferences",
      "Author of Spanish learning blog with 50k+ followers"
    ],
    about: "¡Hola! I'm Emily, originally from Madrid, Spain. I bring authentic Spanish language and culture directly to my students. Learning a language is about more than just grammar and vocabulary - it's about understanding the culture, the people, and the way of life. My lessons incorporate music, films, literature, and real-life conversations to make your learning journey exciting and meaningful."
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
    languages: ["English (Native)"],
    expertise: ["English Literature", "Essay Writing", "SAT Prep", "College Application Essays", "Creative Writing"],
    education: [
      "M.Ed in Education - Harvard University",
      "BA in English Literature - Yale University",
      "Certificate in College Counseling"
    ],
    achievements: [
      "98% college acceptance rate for students",
      "Average SAT score improvement of 200+ points",
      "Former admissions officer at Ivy League university",
      "Published poet and author"
    ],
    about: "Welcome! I'm Professor James Wilson, and I've dedicated my career to helping students unlock their potential in English and achieve their academic dreams. With experience as both an educator and former admissions officer, I understand what it takes to stand out. My teaching focuses on critical thinking, effective communication, and developing your unique voice as a writer."
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
    languages: ["Japanese (Native)", "English (Fluent)", "Korean (Intermediate)"],
    expertise: ["Japanese Conversation", "JLPT Preparation", "Business Japanese", "Anime & Manga Japanese", "Japanese Culture"],
    education: [
      "BA in Japanese Language Education - Tokyo University",
      "JLPT N1 Instructor Certification",
      "Teaching Japanese as a Foreign Language Diploma"
    ],
    achievements: [
      "85% of students pass JLPT on first attempt",
      "Creator of popular Japanese learning YouTube channel",
      "Developed innovative manga-based learning method",
      "Cultural ambassador for Japan-America exchange programs"
    ],
    about: "こんにちは! I'm Yuki, and I love helping people discover the beauty of the Japanese language and culture. Whether you're learning for travel, business, anime, or personal interest, I'll tailor lessons to your specific goals. My teaching style is interactive, fun, and practical - you'll be speaking Japanese from day one!"
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
    languages: ["English (Native)", "Hindi (Native)", "French (Intermediate)"],
    expertise: ["Physics", "Chemistry", "AP Science", "IB Science", "Science Olympiad Preparation"],
    education: [
      "PhD in Physics - University of Chicago",
      "MS in Chemistry - Caltech",
      "BS in Applied Physics - MIT"
    ],
    achievements: [
      "Students consistently score in top 10% on AP exams",
      "NASA research fellowship recipient",
      "Science Olympiad national coach",
      "TEDx speaker on making science accessible"
    ],
    about: "Hi! I'm Dr. Alexandra Patel, and I believe science should be exciting, not intimidating. With a PhD in Physics and years of research experience, I know how to break down complex scientific concepts into understandable pieces. My lessons include real-world applications, hands-on experiments, and engaging demonstrations that make science come alive!"
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
    languages: ["Italian (Native)", "English (Fluent)", "Spanish (Fluent)"],
    expertise: ["Italian Conversation", "Italian Grammar", "Italian Culture", "Business Italian", "Travel Italian"],
    education: [
      "BA in Italian Language and Culture - Sapienza University of Rome",
      "DITALS Certification (Teaching Italian as a Foreign Language)",
      "Certificate in Cross-Cultural Communication"
    ],
    achievements: [
      "Developed immersive Italian learning program",
      "Cultural consultant for Italian tourism board",
      "Organized 20+ student study trips to Italy",
      "Winner of 'Best Language Teacher' award 2023"
    ],
    about: "Ciao! I'm Marco from Rome, and I'm here to share my love for the Italian language and la dolce vita! Learning Italian opens doors to incredible culture, cuisine, art, and people. My lessons are relaxed, conversational, and filled with authentic Italian experiences. Let's make learning Italian as enjoyable as a sunny day in Rome!"
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
    languages: ["English (Native)", "German (Intermediate)"],
    expertise: ["Group Dynamics", "Collaborative Learning", "Workshop Facilitation", "Interactive Teaching Methods", "Online Group Classes"],
    education: [
      "MA in Educational Leadership - University of Oregon",
      "BA in Communication Studies - Portland State University",
      "Certified Professional Facilitator (CPF)"
    ],
    achievements: [
      "Successfully facilitated 500+ group sessions",
      "Developed award-winning group learning curriculum",
      "Speaker at international education conferences",
      "95% student satisfaction rating in group classes"
    ],
    about: "Hello! I'm Lisa, and I specialize in creating dynamic group learning experiences. I believe that learning together is powerful - students motivate each other, share perspectives, and build lasting connections. My group classes are interactive, inclusive, and designed to maximize everyone's participation. Whether you're a beginner or advanced learner, you'll find a supportive community in my classes!"
  },
];

export default function TutorProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<"25" | "50">("50");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const tutor = mockTutors.find(t => t.id === Number(id));

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

  if (!tutor) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Tutor not found</h1>
            <button
              onClick={() => navigate("/find-tutor")}
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-600 transition-colors"
            >
              Back to Find Tutor
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="flex-grow">
        {/* Back Button */}
        <section className="py-4 border-b border-border dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate("/find-tutor")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to tutors</span>
            </button>
          </div>
        </section>

        {/* Profile Header */}
        <section className="py-8 lg:py-10 border-b border-border dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Detailed Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* About */}
                <div className="bg-white dark:bg-slate-900 border border-border dark:border-slate-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">About Me</h2>
                  <p className="text-foreground leading-relaxed">{tutor.about}</p>
                </div>

                {/* Expertise */}
                <div className="bg-white dark:bg-slate-900 border border-border dark:border-slate-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Areas of Expertise</h2>
                  <div className="flex flex-wrap gap-2">
                    {tutor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="bg-white dark:bg-slate-900 border border-border dark:border-slate-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Languages</h2>
                  <div className="space-y-2">
                    {tutor.languages.map((language, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-foreground">{language}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="bg-white dark:bg-slate-900 border border-border dark:border-slate-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Education</h2>
                  <div className="space-y-3">
                    {tutor.education.map((edu, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Award className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-white dark:bg-slate-900 border border-border dark:border-slate-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Achievements & Highlights</h2>
                  <div className="space-y-2">
                    {tutor.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Photo and Basic Info */}
              <div className="lg:col-span-1 lg:order-last">
                <div className="bg-white dark:bg-slate-900 border border-border dark:border-slate-800 rounded-xl p-4 lg:sticky lg:top-20">
                  <img
                    src={tutor.photo}
                    alt={tutor.name}
                    className="w-48 h-48 mx-auto rounded-xl object-cover mb-4"
                  />
                  
                  <h1 className="text-2xl font-bold text-foreground mb-2">{tutor.name}</h1>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="text-lg font-semibold text-foreground">{tutor.rating}</span>
                    <span className="text-sm text-muted-foreground">({tutor.reviews} reviews)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-foreground">{tutor.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-foreground">{tutor.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-foreground">{tutor.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-foreground">{tutor.totalStudents} students</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-foreground">{tutor.experience} years experience</span>
                    </div>
                  </div>

                  <div className="border-t border-border dark:border-slate-800 pt-4 mb-4">
                    <div className="flex items-center gap-2 justify-center mb-3">
                      <DollarSign className="w-6 h-6 text-primary" />
                      <span className="text-3xl font-bold text-primary">{tutor.hourlyRate}</span>
                      <span className="text-muted-foreground">/hour</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button 
                      onClick={() => setIsBookingModalOpen(true)}
                      className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Book trial lesson
                    </button>
                    <button className="w-full px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-border dark:border-slate-800 p-6 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <img
                  src={tutor.photo}
                  alt={tutor.name}
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
