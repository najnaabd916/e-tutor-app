import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    role: "" as "student" | "tutor" | "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "Brazil",
    "Mexico",
    "Japan",
    "China",
    "South Korea",
    "Singapore",
    "United Arab Emirates",
    "Saudi Arabia",
    "Pakistan",
    "Bangladesh",
    "Nigeria",
    "South Africa",
    "Other",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.role) {
      newErrors.role = "Please select whether you're signing up as a student or tutor";
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.country) {
      newErrors.country = "Please select your country";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      await signup(fullName, formData.email, formData.password, formData.role as "student" | "tutor");
      // Redirect to select services page
      navigate("/select-services");
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ email: "Failed to create account. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="flex-grow">
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Welcome Section */}
              <div className="hidden lg:flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                    Join eTutor Today
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Start your personalized learning journey and unlock your full potential
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    "Expert tutors ready to help you",
                    "Flexible learning at your own pace",
                    "Personalized curriculum for your goals",
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-border dark:border-slate-800">
                  <p className="text-sm text-muted-foreground mb-3">
                    Already have an account?
                  </p>
                  <Link
                    to="/signin"
                    className="inline-flex text-primary font-semibold hover:underline"
                  >
                    Sign in here
                  </Link>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="w-full max-w-md mx-auto lg:mx-0">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border dark:border-slate-800 p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Create Your Account
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Role Selection */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        I want to sign up as:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, role: "student" }))
                          }
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            formData.role === "student"
                              ? "border-primary bg-primary/10 dark:bg-primary/5"
                              : "border-border dark:border-slate-800 hover:border-primary/50"
                          }`}
                        >
                          <div className="font-semibold text-foreground mb-1">
                            Student
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Find and learn from tutors
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, role: "tutor" }))
                          }
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            formData.role === "tutor"
                              ? "border-primary bg-primary/10 dark:bg-primary/5"
                              : "border-border dark:border-slate-800 hover:border-primary/50"
                          }`}
                        >
                          <div className="font-semibold text-foreground mb-1">
                            Tutor
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Teach and earn money
                          </div>
                        </button>
                      </div>
                      {errors.role && (
                        <p className="text-sm text-destructive mt-2">
                          {errors.role}
                        </p>
                      )}
                    </div>

                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.firstName
                            ? "border-destructive bg-destructive/5"
                            : "border-input bg-background"
                        } text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.lastName
                            ? "border-destructive bg-destructive/5"
                            : "border-input bg-background"
                        } text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.email
                            ? "border-destructive bg-destructive/5"
                            : "border-input bg-background"
                        } text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.password
                            ? "border-destructive bg-destructive/5"
                            : "border-input bg-background"
                        } text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                        placeholder="••••••••"
                      />
                      {errors.password && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Country Selection */}
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            country: e.target.value,
                          }));
                          if (errors.country) {
                            setErrors((prev) => ({
                              ...prev,
                              country: "",
                            }));
                          }
                        }}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.country
                            ? "border-destructive bg-destructive/5"
                            : "border-input bg-background"
                        } text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                      >
                        <option value="">Select your country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.country}
                        </p>
                      )}
                    </div>

                    {/* Sign Up Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? "Creating Account..." : "Sign Up"}
                    </button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border dark:border-slate-800" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-slate-900 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        className="py-2 px-4 rounded-lg border border-border dark:border-slate-800 hover:bg-muted dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                      </button>
                      <button
                        type="button"
                        className="py-2 px-4 rounded-lg border border-border dark:border-slate-800 hover:bg-muted dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </button>
                    </div>

                    {/* Terms */}
                    <p className="text-xs text-center text-muted-foreground">
                      By signing up, you agree to our{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </p>
                  </form>
                </div>

                {/* Mobile Welcome */}
                <div className="lg:hidden mt-8 text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Already have an account?
                  </p>
                  <Link
                    to="/signin"
                    className="inline-flex text-primary font-semibold hover:underline"
                  >
                    Sign in here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
