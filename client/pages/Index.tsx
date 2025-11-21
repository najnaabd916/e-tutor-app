import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Globe,
  BookOpen,
  Users,
  Star,
  Award,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  const services = [
    {
      id: 1,
      title: "Language Tuition",
      description:
        "Master new languages with personalized lessons tailored to your pace and goals.",
      icon: Globe,
      href: "/language-tuition",
      color: "from-blue-500 to-blue-600",
      features: ["Native speakers", "Custom curriculum", "Flexible schedule"],
    },
    {
      id: 2,
      title: "School Tuition",
      description:
        "Excel in academics with comprehensive support across all subjects and levels.",
      icon: BookOpen,
      href: "/school-tuition",
      color: "from-purple-500 to-purple-600",
      features: ["Expert instructors", "Exam preparation", "Homework help"],
    },
    {
      id: 3,
      title: "Group Classes",
      description:
        "Learn together in collaborative group settings with peers and experienced educators.",
      icon: Users,
      href: "/group-classes",
      color: "from-amber-500 to-amber-600",
      features: ["Interactive learning", "Social engagement", "Team projects"],
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: "Qualified Tutors",
      description: "Learn from certified educators with years of experience",
    },
    {
      icon: TrendingUp,
      title: "Measurable Progress",
      description: "Track your improvement with detailed progress reports",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access tutors and courses from around the world",
    },
    {
      icon: Users,
      title: "Community",
      description: "Join a supportive community of learners",
    },
  ];

  const stats = [
    { number: "10k+", label: "Active Learners" },
    { number: "500+", label: "Expert Tutors" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Languages" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Learn from Anywhere,{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Grow Everywhere
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Personalized education tailored to your needs. Language
                  tutoring, school subjects, or group classes—find the perfect
                  learning experience.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:bg-primary-600 transition-colors">
                  Start Learning Today
                </button>
                <button className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold text-base hover:bg-primary-50 dark:hover:bg-slate-900 transition-colors">
                  Explore Services
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-300 to-secondary-300 border-2 border-white dark:border-slate-950 flex items-center justify-center text-white font-semibold text-sm"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Trusted by 10,000+ learners
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 lg:h-full hidden lg:flex items-center justify-center">
              <div className="relative w-full h-full max-w-lg">
                {/* Animated gradient orbs */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl animate-pulse" />
                <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" />

                {/* Content Card */}
                <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-primary">
                      FEATURED
                    </p>
                    <h3 className="text-2xl font-bold text-foreground">
                      Learn at Your Own Pace
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Personalized learning paths",
                      "24/7 tutor availability",
                      "Real-time progress tracking",
                    ].map((feature, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <p className="text-muted-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-2 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the learning experience that fits your goals and lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  to={service.href}
                  className="group relative bg-white dark:bg-slate-900 rounded-2xl p-8 border border-border dark:border-slate-800 hover:shadow-xl dark:hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Background gradient on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}
                  />

                  <div className="relative space-y-6">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-primary font-bold">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Choose eTutor?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience education transformed by technology and personalization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="flex gap-6 p-6 rounded-xl border border-border dark:border-slate-800 hover:shadow-lg dark:hover:shadow-primary/5 transition-all"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-r from-primary via-primary-600 to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Ready to Transform Your Learning Journey?
              </h2>
              <p className="text-lg opacity-90">
                Join thousands of students achieving their educational goals with
                eTutor
              </p>
            </div>
            <button className="px-8 py-3 rounded-lg bg-white text-primary font-semibold text-base hover:bg-primary-50 transition-colors">
              Get Started For Free
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
