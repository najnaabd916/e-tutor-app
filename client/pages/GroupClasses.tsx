import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Users,
  Zap,
  Heart,
  Trophy,
  MessageSquare,
  Lightbulb,
  ArrowRight,
  Check,
  Megaphone,
  Network,
} from "lucide-react";

export default function GroupClasses() {
  const classes = [
    {
      name: "Conversation Circle",
      description: "Practice real-world conversations in a supportive group",
      level: "All Levels",
      time: "Mon, Wed, Fri 6:00 PM",
      students: 8,
      price: "$29/month",
    },
    {
      name: "Writing Workshop",
      description: "Develop writing skills through peer feedback and guidance",
      level: "Intermediate+",
      time: "Tue, Thu 7:00 PM",
      students: 6,
      price: "$39/month",
    },
    {
      name: "Literature Club",
      description: "Explore classic and contemporary literature together",
      level: "Advanced",
      time: "Sat 2:00 PM",
      students: 10,
      price: "$25/month",
    },
    {
      name: "Business English",
      description: "Master professional communication and business writing",
      level: "Intermediate+",
      time: "Mon, Wed 8:00 PM",
      students: 7,
      price: "$45/month",
    },
    {
      name: "Math Mastery",
      description: "Work through challenging problems collaboratively",
      level: "Middle School",
      time: "Tue, Thu 4:00 PM",
      students: 8,
      price: "$35/month",
    },
    {
      name: "Science Lab",
      description: "Explore science concepts through group experiments",
      level: "High School",
      time: "Sat 10:00 AM",
      students: 9,
      price: "$40/month",
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Community Connection",
      description: "Build friendships and support networks with peers",
    },
    {
      icon: Zap,
      title: "Peer Learning",
      description: "Learn from and with classmates with diverse perspectives",
    },
    {
      icon: Trophy,
      title: "Healthy Competition",
      description: "Stay motivated through friendly competition and challenges",
    },
    {
      icon: MessageSquare,
      title: "Active Discussion",
      description: "Engage in meaningful conversations and debates",
    },
    {
      icon: Lightbulb,
      title: "Creative Projects",
      description: "Work on collaborative projects that make learning fun",
    },
    {
      icon: Network,
      title: "Networking",
      description: "Connect with students from around the world",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-900 -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                <Users className="w-4 h-4" />
                <span className="text-sm font-semibold">Learning Together</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Learn with a{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                  Community
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join collaborative group classes where you learn together, support each other,
                and make lasting friendships while achieving your educational goals
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-600 transition-colors">
                Browse Classes
              </button>
              <button className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary-50 dark:hover:bg-slate-900 transition-colors">
                Schedule Demo Class
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Popular Group Classes
            </h2>
            <p className="text-lg text-muted-foreground">
              Find the perfect class for your learning goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div
                key={cls.name}
                className="bg-white dark:bg-slate-900 rounded-xl border border-border dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-6 border-b border-border dark:border-slate-800">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {cls.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cls.description}</p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Level</p>
                      <p className="font-semibold text-foreground">{cls.level}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Students</p>
                      <p className="font-semibold text-foreground">{cls.students}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Schedule</p>
                    <p className="text-sm font-semibold text-foreground">
                      {cls.time}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border dark:border-slate-800">
                    <span className="text-lg font-bold text-primary">
                      {cls.price}
                    </span>
                    <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-600 transition-colors">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Join Group Classes?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the power of collaborative learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-border dark:border-slate-800 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">
              What's Included in Every Class
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Live interactive sessions",
                "Expert instruction and guidance",
                "Access to class materials and resources",
                "Recorded sessions for later review",
                "Peer feedback and support",
                "Monthly progress check-ins",
                "Certificate of completion",
                "Community forum access",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Getting Started is Easy
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {[
              { title: "Browse Classes", desc: "Explore our selection of active group classes" },
              { title: "Choose Your Class", desc: "Pick a class that matches your interests and level" },
              { title: "Join the Group", desc: "Complete enrollment and get access to the community" },
              {
                title: "Start Learning",
                desc: "Attend your first class and connect with your peers",
              },
            ].map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex K.",
                role: "Literature Club Member",
                text: "The group has become my favorite part of the week. I've made amazing friends and learned so much!",
              },
              {
                name: "Jordan M.",
                role: "Writing Workshop Participant",
                text: "Peer feedback has been transformative for my writing. The supportive environment makes all the difference.",
              },
              {
                name: "Casey L.",
                role: "Conversation Circle Member",
                text: "I was nervous about speaking, but the group made me feel so comfortable. My confidence has grown tremendously.",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-border dark:border-slate-800"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-amber-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-foreground mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-r from-amber-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Join a Group Class Today
            </h2>
            <p className="text-lg opacity-90">
              Start your journey of learning with supportive peers and expert instructors.
              Classes start every week!
            </p>
          </div>
          <button className="px-8 py-3 rounded-lg bg-white text-amber-600 font-semibold hover:bg-amber-50 transition-colors">
            Explore All Classes
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
