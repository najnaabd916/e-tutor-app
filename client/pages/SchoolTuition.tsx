import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  BookOpen,
  Lightbulb,
  TrendingUp,
  Users,
  Award,
  Clock,
  ArrowRight,
  Check,
  GraduationCap,
  Target,
} from "lucide-react";

export default function SchoolTuition() {
  const subjects = [
    { name: "Mathematics", icon: "🔢", description: "Algebra, Geometry, Calculus" },
    { name: "Science", icon: "🧪", description: "Physics, Chemistry, Biology" },
    {
      name: "English",
      icon: "📖",
      description: "Literature, Grammar, Writing",
    },
    { name: "History", icon: "📜", description: "World History, Civics" },
    { name: "Languages", icon: "🌍", description: "Spanish, French, German" },
    { name: "Test Prep", icon: "📝", description: "SAT, ACT, AP Exams" },
  ];

  const features = [
    {
      icon: Users,
      title: "Expert Tutors",
      description: "Certified teachers with deep subject knowledge and proven results",
    },
    {
      icon: Target,
      title: "Targeted Support",
      description: "Focus on weak areas and accelerate your progress",
    },
    {
      icon: TrendingUp,
      title: "Grade Improvement",
      description: "Average student grade improvement of 2+ points",
    },
    {
      icon: Clock,
      title: "Flexible Sessions",
      description: "Choose lesson times that fit your school schedule",
    },
    {
      icon: GraduationCap,
      title: "Exam Preparation",
      description: "Comprehensive prep for standardized tests",
    },
    {
      icon: Lightbulb,
      title: "Study Strategies",
      description: "Learn proven techniques to improve retention and performance",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      grade: "11th Grade",
      subject: "Mathematics",
      quote:
        "My math tutor helped me go from a C to an A- in just 3 months. I finally understand calculus!",
      improvement: "+25 points",
    },
    {
      name: "Michael Chen",
      grade: "9th Grade",
      subject: "English",
      quote:
        "The writing sessions have been incredibly helpful. My essay scores improved dramatically.",
      improvement: "+30 points",
    },
    {
      name: "Emma Rodriguez",
      grade: "12th Grade",
      subject: "Physics",
      quote:
        "Best decision for my college prep. My SAT physics score jumped from 650 to 780!",
      improvement: "+130 points",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-slate-900 dark:to-slate-900 -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm font-semibold">Academic Excellence</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Excel in Every{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Subject
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get personalized support in any subject from expert educators. Improve grades, master
                concepts, and build confidence
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-600 transition-colors">
                Find Your Tutor
              </button>
              <button className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary-50 dark:hover:bg-slate-900 transition-colors">
                View Success Stories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Subjects We Tutor
            </h2>
            <p className="text-lg text-muted-foreground">
              Get expert help in all major subjects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject.name}
                className="p-8 rounded-xl border border-border dark:border-slate-800 hover:shadow-lg transition-all group cursor-pointer bg-white dark:bg-slate-900/50"
              >
                <div className="text-4xl mb-4">{subject.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {subject.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {subject.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Browse Tutors
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose eTutor for School Subjects?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-border dark:border-slate-800 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground">
              See how eTutor has helped thousands of students achieve their goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-border dark:border-slate-800 space-y-6"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.grade} • {testimonial.subject}
                  </p>
                </div>

                <p className="text-foreground italic">"{testimonial.quote}"</p>

                <div className="pt-4 border-t border-border dark:border-slate-800">
                  <p className="text-sm font-semibold text-primary">
                    Grade improvement: {testimonial.improvement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                step: 1,
                title: "Tell Us Your Needs",
                description:
                  "Share your academic goals, challenges, and preferred learning style",
              },
              {
                step: 2,
                title: "Get Matched with a Tutor",
                description:
                  "We match you with an expert tutor in your subject who fits your needs",
              },
              {
                step: 3,
                title: "Start Learning",
                description:
                  "Have your first session and begin making progress toward your goals",
              },
              {
                step: 4,
                title: "Track Progress",
                description:
                  "Monitor improvements through grades, test scores, and performance metrics",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Improve Your Grades Today
            </h2>
            <p className="text-lg opacity-90">
              Connect with a tutor who understands your learning style and can help you
              achieve academic success
            </p>
          </div>
          <button className="px-8 py-3 rounded-lg bg-white text-purple-600 font-semibold hover:bg-purple-50 transition-colors">
            Get Your First Lesson Free
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
