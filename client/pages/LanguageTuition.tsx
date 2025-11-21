import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Globe,
  Users,
  Clock,
  Award,
  ArrowRight,
  Check,
  BookMarked,
  Zap,
} from "lucide-react";

export default function LanguageTuition() {
  const languages = [
    {
      name: "Spanish",
      speakers: "500M+",
      level: "Beginner to Advanced",
    },
    {
      name: "French",
      speakers: "280M+",
      level: "Beginner to Advanced",
    },
    {
      name: "German",
      speakers: "130M+",
      level: "Beginner to Advanced",
    },
    {
      name: "Mandarin",
      speakers: "1B+",
      level: "Beginner to Advanced",
    },
    {
      name: "Japanese",
      speakers: "125M+",
      level: "Beginner to Advanced",
    },
    {
      name: "Arabic",
      speakers: "310M+",
      level: "Beginner to Advanced",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Native Speaker Instructors",
      description:
        "Learn authentic pronunciation and cultural nuances from native speakers",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Book lessons at times that work for your schedule",
    },
    {
      icon: BookMarked,
      title: "Custom Curriculum",
      description: "Personalized learning paths tailored to your goals",
    },
    {
      icon: Zap,
      title: "Interactive Lessons",
      description: "Engaging conversations and real-world practice scenarios",
    },
    {
      icon: Award,
      title: "Certification Ready",
      description: "Prepare for language proficiency exams (TOEFL, IELTS, DELF)",
    },
    {
      icon: Globe,
      title: "Cultural Immersion",
      description: "Learn language through cultural context and traditions",
    },
  ];

  const pricing = [
    {
      name: "Starter",
      price: "$15",
      period: "per lesson",
      features: [
        "30-minute lessons",
        "Basic curriculum",
        "1 lesson per week",
        "Chat support",
      ],
    },
    {
      name: "Pro",
      price: "$24",
      period: "per lesson",
      featured: true,
      features: [
        "60-minute lessons",
        "Advanced curriculum",
        "Flexible scheduling",
        "Personalized feedback",
        "Priority support",
      ],
    },
    {
      name: "Intensive",
      price: "$30",
      period: "per lesson",
      features: [
        "90-minute lessons",
        "Custom learning plan",
        "Daily lessons available",
        "Exam preparation",
        "24/7 support",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-900 -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-semibold">Master Global Languages</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Learn Any Language with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Native Speakers
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Unlock new opportunities and connect with the world through personalized
                language lessons from expert instructors
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-600 transition-colors">
                Start Your Free Trial
              </button>
              <button className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary-50 dark:hover:bg-slate-900 transition-colors">
                View Tutors
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              50+ Languages Available
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose from a wide selection of languages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="p-6 rounded-xl border border-border dark:border-slate-800 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {lang.name}
                  </h3>
                  <span className="text-sm font-semibold text-primary">
                    {lang.speakers}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">{lang.level}</p>
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Explore
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
              Why Learn With eTutor?
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
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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

      {/* Pricing Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose a plan that fits your learning goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 transition-all ${
                  plan.featured
                    ? "border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-slate-900 dark:to-slate-900 shadow-xl scale-105"
                    : "border border-border dark:border-slate-800 bg-white dark:bg-slate-900/50"
                }`}
              >
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>

                <button
                  className={`w-full py-2 rounded-lg font-semibold mb-6 transition-colors ${
                    plan.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary-600"
                      : "border border-primary text-primary hover:bg-primary-50 dark:hover:bg-slate-800"
                  }`}
                >
                  Get Started
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Ready to Learn a New Language?
            </h2>
            <p className="text-lg opacity-90">
              Get started with your first lesson today and discover how eTutor makes
              language learning easy and fun
            </p>
          </div>
          <button className="px-8 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
            Schedule Your Free Consultation
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
