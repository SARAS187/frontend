import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Award,
  BriefcaseBusiness,
  Building2,
  Calendar,
  Check,
  CircleDollarSign,
  Code2,
  Database,
  FileCode2,
  GraduationCap,
  LineChart,
  Shield,
  Sliders,
  Sparkles,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AOS from "aos";
import "aos/dist/aos.css";


export default function Home() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    FullName: "",
    phone: "",
    email: "",
    collegeName: "",
    degree: "",
    customDegree: "",
    yearOfPassing: "",
    course: "AZ-900",
    experience: "",
  });

  const { toast } = useToast();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef(null);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  const [salary, setSalary] = useState(450000);
  const [certificationLevel, setCertificationLevel] = useState("fundamental");
  const [roiResult, setRoiResult] = useState({
    increase: 67500,
    newSalary: 517500,
    roi: 15,
  });

  const handleMouseMove = useCallback((e) => {
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupOpen(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    let increasePercentage = 0;
    switch (certificationLevel) {
      case "fundamental":
        increasePercentage = 0.15;
        break;
      case "associate":
        increasePercentage = 0.25;
        break;
      case "expert":
        increasePercentage = 0.4;
        break;
      default:
        increasePercentage = 0.15;
    }

    const increase = Math.round(salary * increasePercentage);
    const newSalary = salary + increase;
    const roi = Math.round(increasePercentage * 100);

    setRoiResult({ increase, newSalary, roi });
  }, [salary, certificationLevel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (formStep === 1) {
      const { FullName, phone, email } = formData;

      if (!FullName || !phone || !email) {
        console.log("ds");
        toast({ title: "Please fill all required fields", variant: "destructive" });
          //   document.body.style.backgroundColor = "red";
        return;
      }
  
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        toast({ title: "Please enter a valid email address", variant: "destructive" });
        return;
      }

      if (!/^\d{10}$/.test(phone)) {
        toast({ title: "Please enter a valid phone number", variant: "destructive" });
        return;
      }
    }

    if (formStep === 2) {
      const { collegeName, degree, customDegree, yearOfPassing } = formData;

      if (!collegeName || !degree || !yearOfPassing) {
        toast({ title: "Please complete all education details", variant: "destructive" });
        return;
      }

      if (degree === "other" && !customDegree) {
        toast({ title: "Please enter your degree name", variant: "destructive" });
        return;
      }

      if (!/^\d{4}$/.test(yearOfPassing)) {
        toast({ title: "Enter a valid 4-digit passing year", variant: "destructive" });
        return;
      }
    }

    setFormStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        fullname: formData.FullName,
        phonenumber: formData.phone,
        email: formData.email,
        college_name: formData.collegeName,
        degree: formData.degree,
        year_of_passing: formData.yearOfPassing,
        certification: formData.course,
        prior_certification: formData.experience,
        other_degree: formData.customDegree,
      };

      const response = await fetch(`${import.meta.env.VITE_backend_API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed");
      }
  
      const result = await response.json();
      console.log("Success:", result);
  
      toast({
        title: "Registration successful!",
        description: "We'll contact you shortly with more details.",
        // variant: "default",
        variant: "success"
        
        
      });
  
      setPopupOpen(false);
      setFormStep(1);
      setFormData({
        FullName: "",
        phone: "",
        email: "",
        collegeName: "",
        degree: "",
        customDegree: "",
        yearOfPassing: "",
        course: "AZ-900",
        experience: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      {/* Header and rest of JSX here... */}
      {/* Header */}
      <header
        ref={headerRef}
        className="relative text-white py-24 px-6 text-center overflow-hidden cursor-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
      >
        {/* Mouse follower - primary glow */}
        {isHeaderHovered && (
          <>
            <div
              className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 opacity-20 blur-xl pointer-events-none z-10 transition-all duration-300 ease-out"
              style={{
                left: `${mousePosition.x - 72}px`,
                top: `${mousePosition.y - 72}px`,
                transform: 'translate(0, 0)',
                mixBlendMode: 'lighten'
              }}
            />
            {/* Secondary smaller glow */}
            <div
              className="absolute w-20 h-20 rounded-full bg-yellow-200 opacity-30 blur-lg pointer-events-none z-10 transition-all duration-100 ease-out"
              style={{
                left: `${mousePosition.x - 40}px`,
                top: `${mousePosition.y - 40}px`,
                transform: 'translate(0, 0)',
                mixBlendMode: 'lighten'
              }}
            />
            {/* Cursor dot */}
            <div
              className="absolute w-6 h-6 rounded-full bg-white opacity-80 pointer-events-none z-10 transition-all duration-75 ease-out"
              style={{
                left: `${mousePosition.x - 12}px`,
                top: `${mousePosition.y - 12}px`,
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
              }}
            />
          </>
        )}

        {/* Background with advanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A70] via-[#2E5090] to-[#234180] z-0">
          {/* Abstract decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-yellow-300 opacity-15 blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-blue-300 opacity-10 blur-2xl"></div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTYgdi02aDZ2NnptMCAxMmgtNnYtNmg2djZ6bTEyLTEyaC02di02aDZ2NnptMCAxMmgtNnYtNmg2djZ6bTEyLTEyaC02di02aDZ2NnptMCAxMmgtNnYtNmg2djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

          {/* Animated flying particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-3/4 left-1/2 w-3 h-3 bg-yellow-300 rounded-full opacity-60 animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-300 rounded-full opacity-60 animate-pulse" style={{ animationDuration: '2.5s' }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-ping" style={{ animationDuration: '4s' }}></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Logo with glow effect */}
          {/* <div className="flex items-center justify-center mb-5 relative">
            <div className="absolute w-12 h-12 bg-blue-400 rounded-full filter blur-xl opacity-30"></div>
            <Shield className="h-14 w-14 mr-3 drop-shadow-lg text-white" />
            <span className="text-xl font-semibold tracking-wide">SGSN Associates Pvt. Ltd.</span>
          </div> */}

          <div className="flex items-center justify-center mb-5 relative w-full px-4">
  {/* Glow circle, now larger and responsive */}
  <div className="absolute left-1/2 top-1/2 w-16 h-16 sm:w-12 sm:h-12 bg-blue-400 rounded-full filter blur-2xl opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>

  {/* Icon and Text */}
  <Shield className="h-12 w-12 sm:h-14 sm:w-14 mr-2 sm:mr-3 drop-shadow-lg text-white" />
  <span className="text-lg sm:text-xl font-semibold tracking-wide text-center">
    SGSN Associates Pvt. Ltd.
  </span>
</div>


          {/* Headline with enhanced typography */}
          <div className="mb-8 relative">
            <h1 className="text-4xl font-bold mb-2 md:text-7xl max-w-3xl mx-auto leading-tight tracking-tight">
              ProofPoint: Your Skills. <span className="relative">
                <span className="relative z-10 text-yellow-300 font-extrabold">Certified.</span>
                <span className="absolute inset-0 bg-yellow-300 opacity-20 blur-md rounded-lg transform scale-110"></span>
              </span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full mx-auto mt-4"></div>
          </div>

          {/* Subheading with better readability */}
          <p className="text-xl max-w-2xl mx-auto leading-relaxed mb-10 opacity-95 font-light">
            From the fundamentals to final certification, we support your entire journey. Our industry-recognized training prepares you for Microsoft Certification, validating your skills and enhancing your career prospects.
          </p>

          {/* CTA buttons with improved styling */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
            <Button
              className="bg-white text-[#2E5090] hover:bg-gray-100 py-4 px-8 text-lg font-bold shadow-lg rounded-xl transition-transform hover:scale-105"
              size="lg"
              onClick={() => setPopupOpen(true)}
            >
              Register for AZ-900
            </Button>
            <Button
              className="bg-transparent border-2 border-white hover:bg-white/10 py-4 px-8 text-lg font-bold rounded-xl backdrop-blur-sm transition-transform hover:scale-105"
              size="lg"
              asChild
            >
              <a href="#paths">Explore Paths</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Why Get Certified Section */}
      <section className="py-16 px-6 bg-[#F8FAFD]">
        {/* <h5 className="text-left text-[#2E5090] font-semibold mb-2 uppercase tracking-wider">Career Impact</h5> */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 relative">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-12 bg-[#2E5090]/10 rounded-full blur-xl"></div>
            <h5 className=" text-[#2E5090] font-semibold mb-2 uppercase tracking-wider">Career Impact</h5>
            <h2 className="text-4xl font-bold mb-2 relative z-10">Why Get Certified</h2>
            <div className="h-1 w-20 bg-[#2E5090] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">


            <Card className="group border-t-4 border-t-[#2E5090] hover:shadow-lg transition-shadow ">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="bg-[#E8ECF5] p-3 rounded-lg">
                  <BriefcaseBusiness className="h-6 w-6 text-[#2E5090]" />
                </div>
                <div>
                  <CardTitle className="transform transition-transform duration-300 group-hover:scale-[1.01] mb-2">
                    Higher Employability
                  </CardTitle>
                  <CardDescription className="transform transition-transform duration-300 group-hover:scale-[1.05]">
                    90% of hiring managers factor certifications into their hiring decisions, giving certified candidates a competitive edge.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="group border-t-4 border-t-[#2E5090] hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="bg-[#E8ECF5] p-3 rounded-lg">
                  <LineChart className="h-6 w-6 text-[#2E5090]" />
                </div>
                <div>
                  <CardTitle className="transform transition-transform duration-300 group-hover:scale-[1.01] mb-2">
                    Increased Earning Potential
                  </CardTitle>
                  <CardDescription className="transform transition-transform duration-300 group-hover:scale-[1.05]">
                    Certified professionals earn up to 15% more than their non-certified counterparts, reflecting the value of proven expertise.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="group border-t-4 border-t-[#2E5090] hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="bg-[#E8ECF5] p-3 rounded-lg">
                  <Award className="h-6 w-6 text-[#2E5090]" />
                </div>
                <div>
                  <CardTitle className="transform transition-transform duration-300 group-hover:scale-[1.01] mb-2 ">
                    Global Industry Recognition
                  </CardTitle>
                  <CardDescription className="transform transition-transform duration-300 group-hover:scale-[1.05]">
                    Microsoft Certification is a trusted, worldwide credential that validates your skills and strengthens your professional credibility.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="group border-t-4 border-t-[#2E5090] hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="bg-[#E8ECF5] p-3 rounded-lg">
                  <Users className="h-6 w-6 text-[#2E5090]" />
                </div>
                <div>
                  <CardTitle className="transform transition-transform duration-300 group-hover:scale-[1.01] mb-2 ">
                    Expand Your Professional Network
                  </CardTitle>
                  <CardDescription className="transform transition-transform duration-300 group-hover:scale-[1.05]">
                    Join a global community of certified professionals, opening doors to new connections, opportunities, and collaborations.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

          </div>
        </div>
      </section>

      {/* Microsoft Certification Path */}
      <section id="paths" className="py-20 px-6 bg-gradient-to-b from-white to-[#E8ECF5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h5 className="text-[#FF5722] font-semibold mb-2">MICROSOFT CERTIFICATION ROADMAP</h5>
            <h2 className="text-4xl font-bold">Top Certification Paths to Accelerate Your Career</h2>
            <div className="h-1 w-[300px] bg-[#2E5090] mx-auto rounded-full mt-2"></div>

            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              We've curated the most in-demand Microsoft certifications designed to maximize your career growth. These industry-recognized credentials help you stand out in today’s competitive job market and open doors to new opportunities.
            </p>
          </div>

          {/* Career journey illustration - exactly matching the provided image */}



          <div className="mb-16 w-full max-w-screen-xl mx-auto bg-white py-12 px-8 rounded-xl shadow-sm">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block relative">
              <div className="absolute top-6 left-0 right-0 h-1 bg-[#2E5090] z-0"></div>

              <div className="relative z-10 flex justify-between items-start">
                {/* Desktop Steps */}
                <div className="flex flex-col items-center" data-aos="fade-right" data-aos-delay="0">
                  <div className="w-12 h-12 bg-[#2E5090] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="mt-6 text-center">
                    <h4 className="font-bold text-sm">Fundamentals</h4>
                    <p className="text-xs text-gray-600">Start your journey</p>
                  </div>
                </div>

                <div className="flex flex-col items-center" data-aos="fade-right" data-aos-delay="300">
                  <div className="w-12 h-12 bg-[#2E5090] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="mt-6 text-center">
                    <h4 className="font-bold text-sm">Associate</h4>
                    <p className="text-xs text-gray-600">Build your expertise</p>
                  </div>
                </div>

                <div className="flex flex-col items-center" data-aos="fade-right" data-aos-delay="600">
                  <div className="w-12 h-12 bg-[#2E5090] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <div className="mt-6 text-center">
                    <h4 className="font-bold text-sm">Expert</h4>
                    <p className="text-xs text-gray-600">Demonstrate mastery</p>
                  </div>
                </div>

                <div className="flex flex-col items-center" data-aos="fade-right" data-aos-delay="900">
                  <div className="w-12 h-12 bg-[#FF5722] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                    <BriefcaseBusiness className="h-6 w-6" />
                  </div>
                  <div className="mt-6 text-center">
                    <h4 className="font-bold text-sm">Career Growth</h4>
                    <p className="text-xs text-gray-600">Achieve your goals</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile layout (vertical stack) */}
            <div className="flex flex-col gap-10 items-center md:hidden">


              {/* not vertical line for small(mobile) devices */}
              {/* <div className="relative flex flex-col gap-10 items-center md:hidden"> */}
              {/* Vertical Line */}
              {/* <div className="absolute left-1/2 top-6 bottom-6 w-1 bg-[#2E5090] transform -translate-x-1/2 z-0"></div> */}


              {/* Fundamentals */}
              <div data-aos="fade-up" data-aos-delay="0" className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#2E5090] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-bold text-sm">Fundamentals</h4>
                  <p className="text-xs text-gray-600">Start your journey</p>
                </div>
              </div>

              {/* Associate */}
              <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#2E5090] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                  <Award className="h-6 w-6" />
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-bold text-sm">Associate</h4>
                  <p className="text-xs text-gray-600">Build your expertise</p>
                </div>
              </div>

              {/* Expert */}
              <div data-aos="fade-up" data-aos-delay="400" className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#2E5090] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                  <Code2 className="h-6 w-6" />
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-bold text-sm">Expert</h4>
                  <p className="text-xs text-gray-600">Demonstrate mastery</p>
                </div>
              </div>

              {/* Career Growth */}
              <div data-aos="fade-up" data-aos-delay="600" className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#FF5722] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-bold text-sm">Career Growth</h4>
                  <p className="text-xs text-gray-600">Achieve your goals</p>
                </div>
              </div>
            </div>
          </div>



          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">


              {/* Fundamentals Level */}
              <div className="col-span-full mb-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#2E5090] text-white p-3 rounded-lg">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold">Getting Started: Fundamentals Level</h3>
                </div>

                <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#f7f9fc] border border-[#2E5090]/20 p-5 rounded-lg hover:shadow-md transition-shadow flex flex-col h-full group">
                    <div className="bg-[#2E5090]/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <span className="text-[#2E5090] font-bold text-xl">AZ</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1 group-hover:scale-[1.03] transition-transform duration-300">AZ-900</h4>
                    <p className="text-[#2E5090] font-semibold text-sm mb-2 group-hover:scale-[1.05] transition-transform duration-300">Azure Fundamentals</p>
                    <p className="text-gray-600 text-sm mb-4 flex-grow group-hover:scale-[1.05] transition-transform duration-300">The perfect starting point for cloud computing and services</p>
                    <div className="bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold px-3 py-1 rounded-full self-start">
                      MOST POPULAR
                    </div>
                  </div>

                  <div className="bg-[#f7f9fc] border border-gray-200 p-5 rounded-lg hover:shadow-md transition-shadow flex flex-col h-full group">
                    <div className="bg-[#2E5090]/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <span className="text-[#2E5090] font-bold text-xl">MS</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1 group-hover:scale-[1.03] transition-transform duration-300">MS-900</h4>
                    <p className="text-[#2E5090] font-semibold text-sm mb-2 group-hover:scale-[1.05] transition-transform duration-300">Microsoft 365 Fundamentals</p>
                    <p className="text-gray-600 text-sm mb-4 flex-grow group-hover:scale-[1.05] transition-transform duration-300">Learn the essentials of Microsoft 365 productivity tools</p>
                  </div>

                  <div className="bg-[#f7f9fc] border border-gray-200 p-5 rounded-lg hover:shadow-md transition-shadow flex flex-col h-full group">
                    <div className="bg-[#2E5090]/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <span className="text-[#2E5090] font-bold text-xl">AI</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1 group-hover:scale-[1.03] transition-transform duration-300">AI-900</h4>
                    <p className="text-[#2E5090] font-semibold text-sm mb-2 group-hover:scale-[1.05] transition-transform duration-300">Azure AI Fundamentals</p>
                    <p className="text-gray-600 text-sm mb-4 flex-grow group-hover:scale-[1.05] transition-transform duration-300">Introduction to artificial intelligence and machine learning</p>
                  </div>
                </div>
              </div>

              {/* Associate Level */}
              <div className="col-span-full mb-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#203864] text-white p-3 rounded-lg">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold">Next Level: Associate Certifications</h3>
                </div>

                <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#f7f9fc] border border-gray-200 p-5 rounded-lg hover:shadow-md transition-shadow flex flex-col h-full group">
                    <div className="bg-[#203864]/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <span className="text-[#203864] font-bold text-xl">AZ</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1 group-hover:scale-[1.03] transition-transform duration-300">AZ-104</h4>
                    <p className="text-[#203864] font-semibold text-sm mb-2 group-hover:scale-[1.05] transition-transform duration-300">Azure Administrator</p>
                    <p className="text-gray-600 text-sm mb-4 flex-grow group-hover:scale-[1.05] transition-transform duration-300">Implement, monitor, and maintain Microsoft Azure solutions</p>
                  </div>

                  <div className="bg-[#f7f9fc] border border-gray-200 p-5 rounded-lg hover:shadow-md transition-shadow flex flex-col h-full group">
                    <div className="bg-[#203864]/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <span className="text-[#203864] font-bold text-xl">DP</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1 group-hover:scale-[1.03] transition-transform duration-300">DP-900</h4>
                    <p className="text-[#203864] font-semibold text-sm mb-2 group-hover:scale-[1.05] transition-transform duration-300">Azure Data Fundamentals</p>
                    <p className="text-gray-600 text-sm mb-4 flex-grow group-hover:scale-[1.05] transition-transform duration-300">Core data concepts and Microsoft Azure data services</p>
                  </div>

                  <div className="bg-[#f7f9fc] border border-gray-200 p-5 rounded-lg hover:shadow-md transition-shadow flex flex-col h-full group">
                    <div className="bg-[#203864]/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <span className="text-[#203864] font-bold text-xl">SC</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1 group-hover:scale-[1.03] transition-transform duration-300">SC-900</h4>
                    <p className="text-[#203864] font-semibold text-sm mb-2 group-hover:scale-[1.05] transition-transform duration-300">Security Fundamentals</p>
                    <p className="text-gray-600 text-sm mb-4 flex-grow group-hover:scale-[1.05] transition-transform duration-300">Security, compliance, and identity fundamentals</p>
                  </div>
                </div>
              </div>





              {/* Expert Level */}
              <div className="col-span-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#1E3A70] text-white p-3 rounded-lg">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold">Career Advancement: Expert Certifications</h3>
                </div>

             

                <div className="mx-4 sm:ml-12 bg-gradient-to-r from-[#f7f9fc] to-white border border-[#1E3A70]/20 p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
  {/* Icon */}
  <div className="bg-[#1E3A70]/10 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
    <span className="text-[#1E3A70] font-bold text-xl sm:text-2xl">AZ</span>
  </div>

  {/* Text */}
  <div className="space-y-2">
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
      <h4 className="font-bold text-lg sm:text-xl">Azure Expert Certifications</h4>
      <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mt-1 sm:mt-0">
        HIGHEST DEMAND
      </div>
    </div>
    <p className="text-gray-600 text-sm sm:text-base">
      Advanced certifications like AZ-305 (Azure Solutions Architect) and AZ-400 (DevOps Engineer)
      can increase your salary potential by 25–30%.
    </p>
  </div>
</div>


              </div>
            </div>

            <div className="mt-10 text-center">
              <Button
                className="bg-[#2E5090] hover:bg-[#1E3A6D] text-white py-2 px-6"
                size="lg"
                onClick={() => setPopupOpen(true)}
              >
                Begin Your Certification Journey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e6eeff] to-[#f5f7fa] z-0"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h5 className="text-[#FF5722] font-semibold mb-2">Limited Time Offer – Take the Leap!</h5>
            <h2 className="text-4xl font-bold mb-4">Ready to Boost Your Career?</h2>
            <p className="text-lg mb-6 max-w-3xl mx-auto text-gray-600">
              Ready to level up your career? Start your Microsoft certification journey with expert-led training and full support—from beginner to certified. Gain real skills,
              earn a globally recognized credential, and open the door to new career opportunities.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row gap-8 md:items-center">
              <div className="flex-1">
                <div className="bg-[#2E5090] text-white inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3">AZ-900 CERTIFICATION</div>
                <h3 className="text-2xl font-bold mb-2">
                  All-inclusive package for just <span className="text-[#2E5090]">Rs 25,000</span>
                </h3>
                <p className="text-gray-500 mb-4">Complete training + certification exam fee included</p>

                <div className="bg-[#f7f9fc] p-4 rounded-lg mb-4 border-l-4 border-[#2E5090]">
                  <div className="flex items-start">
                    <div className="bg-[#2E5090] text-white p-1 rounded-full mr-2 mt-1">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Next AZ-900 Batch: May 15th, 2025</p>
                      <p className="text-[#FF5722] font-bold">Limited to 15 Students Only!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-bold text-lg">Scholarship Opportunity</h4>
                  </div>
                  <p className="text-sm mb-2 text-gray-600">Take our online assessment test in the 3rd week of May, 2025 and win:
                  </p> 
                  <div className="flex items-center bg-yellow-50 p-2 rounded-md mb-3 border border-yellow-200">
                    <Calendar className="h-4 w-4 text-yellow-600 mr-2" />
                    <p className="text-sm font-medium text-yellow-700">Limited Time: Only 9 days left to register!</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="bg-yellow-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2">1</div>
                      <span><span className="font-semibold">50% off</span> for top performer</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-gray-400 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2">2</div>
                      <span><span className="font-semibold">25% off</span> for 2nd and 3rd rank</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-[#cd7f32] text-white h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2">3</div>
                      <span><span className="font-semibold">10% off</span> for 4th and 5th rank</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button
                className="bg-[#FF5722] hover:bg-[#e64a19] text-white py-3 px-8 text-lg shadow-md"
                size="lg"
                onClick={() => setPopupOpen(true)}
              >
                Register for Next Batch
              </Button>
              <p className="mt-3 text-sm text-gray-500">Email us at Proofpoint@sgsnassociates.com or call us at 9286379157</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        {/* Simple decorative elements */}
        <div className="absolute inset-0 bg-[#F8FAFD]/80"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h5 className="text-[#FF5722] font-semibold mb-2 uppercase tracking-wider">CERTIFICATION VALUE</h5>
            <h2 className="text-4xl font-bold mb-2">Calculate Your Potential ROI</h2>
            <div className="h-1 w-[90px] bg-[#FF5722] mx-auto rounded-full mb-4 mt-2"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover how Microsoft certification can elevate your career.
              Explore the impact on your salary, job opportunities, and long-term growth—and see the true value of getting certified.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto mb-12 overflow-hidden border border-gray-200">
            <div className="flex flex-col md:flex-row">
              {/* Left column - Input */}
              <div className="md:w-1/2 p-8 border-r border-gray-100">
                <h4 className="text-xl font-bold mb-6 flex items-center text-[#2E5090]">
                  <CircleDollarSign className="h-5 w-5 mr-2" />
                  Enter Your Details
                </h4>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="current-salary" className="text-sm font-medium block mb-2">
                      Current Annual Salary (in Rs)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <Input
                        id="current-salary"
                        type="number"
                        className="pl-8 h-11"
                        value={salary}
                        onChange={(e) => setSalary(parseInt(e.target.value) || 0)}
                        min={200000}
                        max={2000000}
                        step={50000}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>₹2 Lakhs</span>
                      <span>₹20 Lakhs+</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="certification-level" className="text-sm font-medium block mb-2">
                      Microsoft Certification Target
                    </Label>
                    <Select
                      value={certificationLevel}
                      onValueChange={(value) => setCertificationLevel(value)}
                    >
                      <SelectTrigger id="certification-level" className="h-11">
                        <SelectValue placeholder="Select certification level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fundamental">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            Fundamental (AZ-900)
                          </div>
                        </SelectItem>
                        <SelectItem value="associate">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                            Associate (AZ-104)
                          </div>
                        </SelectItem>
                        <SelectItem value="expert">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                            Expert (AZ-305)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h5 className="font-medium mb-4">Average Salary Increases</h5>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Fundamentals: </span>
                        <span className="text-green-600">15% increase</span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Associate: </span>
                        <span className="text-green-600">25% increase</span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Expert: </span>
                        <span className="text-green-600">40% increase</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Results */}
              <div className="md:w-1/2 bg-[#F8FAFD] p-8">
                <h4 className="text-xl font-bold mb-6 flex items-center text-[#2E5090]">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Your Results
                </h4>

                <div className="bg-white rounded-lg p-5 mb-6 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Current Salary:</span>
                    <span className="font-bold text-lg">₹{salary.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Estimated Increase:</span>
                    <div className="flex items-center">
                      <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="font-bold text-lg text-green-600">+₹{roiResult.increase.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-gray-100 my-4"></div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">New Potential Salary:</span>
                    <span className="font-bold text-xl text-[#2E5090]">₹{roiResult.newSalary.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#2E5090] to-[#1E3A70] text-white rounded-lg overflow-hidden shadow mb-6">
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm opacity-90">Return on Investment</div>
                        <div className="text-3xl font-bold">
                          {roiResult.roi}%
                        </div>
                      </div>
                      <div className="bg-white/10 p-3 rounded-full">
                        <CircleDollarSign className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-3 bg-[#1E3A70] text-sm">
                    Based on {certificationLevel[0].toUpperCase() + certificationLevel.slice(1)} certification level
                  </div>
                </div>

                <div className="bg-[#FF5722]/10 border border-[#FF5722]/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="bg-[#FF5722] p-2 rounded-full text-white mr-3 mt-1">
                      <Sliders className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-medium text-[#FF5722] mb-1">Cost-Benefit Analysis</h5>
                      <p className="text-sm">Your ₹25,000 investment in certification could yield an additional ₹{roiResult.increase.toLocaleString()} per year in income.</p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-medium shadow-sm"
                  onClick={() => setPopupOpen(true)}
                >
                  Start Your Certification Journey
                </Button>
                <p className="text-xs text-center text-gray-500 mt-2">Includes Microsoft exam fee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-white to-[#E8ECF5]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h5 className="text-[#2E5090] font-semibold mb-2">SUCCESS STORIES</h5>
            <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hundreds of learners have advanced their careers through our Microsoft certification training.
              Discover how real students turned skills into success -- and how you can too.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 */}




            <div className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg relative">
              {/* Top circle with user icon */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#2E5090]/20 h-10 w-10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-[#2E5090]" />
              </div>

              {/* User info section - comes from top */}
              <div className="flex items-center mb-4 mt-6" data-aos="fade-down" data-aos-delay="0">
                <div className="ml-3 text-center w-full">
                  <h4 className="font-semibold">Aditya Sharma</h4>
                  <p className="text-sm text-gray-500">BCA Graduate, Now Azure Developer</p>
                </div>
              </div>

              {/* Testimonial section - comes from bottom */}
              <div className="pt-4 border-t border-gray-100" data-aos="fade-up" data-aos-delay="300">
                <p className="text-gray-700 italic">
                  "The structured approach to learning Azure fundamentals helped me pass my AZ-900 exam on the first attempt. The hands-on labs were particularly useful."
                </p>
              </div>
            </div>


            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#FF5722]/20 h-10 w-10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-[#FF5722]" />
              </div>

              <div className="flex items-center mb-4 mt-6" data-aos="fade-down" data-aos-delay="0">
                <div className="ml-3 text-center w-full">
                  <h4 className="font-semibold">Priya Gupta</h4>
                  <p className="text-sm text-gray-500">B.Tech Student, Part-time Cloud Associate</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100" data-aos="fade-up" data-aos-delay="300">
                <p className="text-gray-700 italic">
                  "I received a 25% scholarship after the assessment test, which made the program affordable for me. Within two months of certification, I landed a job at a tech startup."
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#1E3A70]/20 h-10 w-10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-[#1E3A70]" />
              </div>

              <div className="flex items-center mb-4 mt-6" data-aos="fade-down" data-aos-delay="0">
                <div className="ml-3 text-center w-full">
                  <h4 className="font-semibold">Rohit Mehta</h4>
                  <p className="text-sm text-gray-500">MCA Graduate, Cloud Solutions Architect</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100" data-aos="fade-up" data-aos-delay="300">
                <p className="text-gray-700 italic">
                  "The mock exams and practice questions were nearly identical to what I saw in the actual certification exam. The instructors were always available to clear doubts."
                </p>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Benefits & Pricing Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#E8ECF5] to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Benefits Column */}
            <div className="flex flex-col h-full">
              <div className="text-center mb-8 md:text-left">
                <h5 className="text-[#2E5090] font-semibold mb-2">WHAT YOU GET</h5>
                <h2 className="text-3xl font-bold">Student Benefits</h2>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md flex-grow min-h-[480px]">

                <ul className="space-y-4">
                  <li
                    className="flex items-start bg-[#f7f9fc] p-3 rounded-lg transition-all hover:shadow-md"
                    data-aos="fade-down"
                    data-aos-delay="0"
                  >
                    <div className="bg-[#2E5090] h-8 w-8 rounded-full text-white flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold">All-Inclusive Pricing</h4>
                      <p className="text-gray-600 text-sm">Our Rs 25,000 package includes complete training and your first certification exam attempt</p>
                    </div>
                  </li>

                  <li
                    className="flex items-start bg-[#f7f9fc] p-3 rounded-lg transition-all hover:shadow-md"
                    data-aos="fade-down"
                    data-aos-delay="100"
                  >
                    <div className="bg-[#2E5090] h-8 w-8 rounded-full text-white flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Comprehensive Training</h4>
                      <p className="text-gray-600 text-sm">From introduction to Microsoft certification, we provide complete end-to-end preparation</p>
                    </div>
                  </li>

                  <li
                    className="flex items-start bg-[#f7f9fc] p-3 rounded-lg transition-all hover:shadow-md"
                    data-aos="fade-down"
                    data-aos-delay="200"
                  >
                    <div className="bg-[#2E5090] h-8 w-8 rounded-full text-white flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <FileCode2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Learning Materials</h4>
                      <p className="text-gray-600 text-sm">Access to comprehensive training materials and practice resources</p>
                    </div>
                  </li>

                  <li
                    className="flex items-start bg-[#f7f9fc] p-3 rounded-lg transition-all hover:shadow-md"
                    data-aos="fade-down"
                    data-aos-delay="300"
                  >
                    <div className="bg-[#2E5090] h-8 w-8 rounded-full text-white flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Group Learning</h4>
                      <p className="text-gray-600 text-sm">Benefit from group study sessions and personalized workshops led by experts</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-6 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden flex-grow min-h-[280px]">
                <div className="bg-[#2E5090] p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-[#2E5090]">
                      <FileCode2 className="h-4 w-4" />
                    </div>
                    <h4 className="font-bold text-white text-lg">Key Features</h4>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className="bg-[#f7f9fc] p-3 rounded-lg"
                      data-aos="zoom-in"
                      data-aos-delay="0"
                    >
                      <div className="flex items-center mb-2">
                        <div className="h-6 w-6 rounded-full bg-[#2E5090]/20 text-[#2E5090] flex items-center justify-center text-xs mr-2">
                          <Users className="h-3 w-3" />
                        </div>
                        <span className="font-medium text-sm">Limited Batch</span>
                      </div>
                      <p className="text-xs text-gray-600">Max 15 students per batch</p>
                    </div>

                    <div
                      className="bg-[#f7f9fc] p-3 rounded-lg"
                      data-aos="zoom-in"
                      data-aos-delay="100"
                    >
                      <div className="flex items-center mb-2">
                        <div className="h-6 w-6 rounded-full bg-[#2E5090]/20 text-[#2E5090] flex items-center justify-center text-xs mr-2">
                          <Award className="h-3 w-3" />
                        </div>
                        <span className="font-medium text-sm">Official Exam</span>
                      </div>
                      <p className="text-xs text-gray-600">Exam voucher included</p>
                    </div>

                    <div
                      className="bg-[#f7f9fc] p-3 rounded-lg"
                      data-aos="zoom-in"
                      data-aos-delay="200"
                    >
                      <div className="flex items-center mb-2">
                        <div className="h-6 w-6 rounded-full bg-[#2E5090]/20 text-[#2E5090] flex items-center justify-center text-xs mr-2">
                          <Code2 className="h-3 w-3" />
                        </div>
                        <span className="font-medium text-sm">Practice Labs</span>
                      </div>
                      <p className="text-xs text-gray-600">Hands-on exercises</p>
                    </div>

                    <div
                      className="bg-[#f7f9fc] p-3 rounded-lg"
                      data-aos="zoom-in"
                      data-aos-delay="300"
                    >
                      <div className="flex items-center mb-2">
                        <div className="h-6 w-6 rounded-full bg-[#2E5090]/20 text-[#2E5090] flex items-center justify-center text-xs mr-2">
                          <GraduationCap className="h-3 w-3" />
                        </div>
                        <span className="font-medium text-sm">Mock Tests</span>
                      </div>
                      <p className="text-xs text-gray-600">Practice exams included</p>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            {/* Pricing Column */}
            <div className="flex flex-col h-full">
              <div className="text-center mb-8 md:text-left">
                <h5 className="text-[#FF5722] font-semibold mb-2">PRICING COMPARISON</h5>
                <h2 className="text-3xl font-bold">Save Up To Rs 45,000</h2>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg mb-6 transform hover:scale-[1.02] transition-all flex-grow min-h-[480px] bg-white">
                <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-[#2E5090] to-[#1E3A70]">
                  <h3 className="font-bold text-lg text-white">Training Provider Comparison</h3>
                  <div className="bg-[#FF5722] text-white text-xs font-bold px-3 py-1 rounded-full">SAVE MONEY</div>
                </div>
                <div className="bg-white">
                  <div className="overflow-hidden">
                    {/* Other Options */}
                    <div className="p-5 border-b">
                      <h4 className="font-semibold text-gray-700 mb-3">Other Training Providers</h4>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                            <Code2 className="h-4 w-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">Instructor-Led Online</p>
                            <p className="text-xs text-gray-500">Various Microsoft Partners</p>
                          </div>
                        </div>
                        <div className="bg-gray-100 px-4 py-1 rounded text-gray-700 font-bold">
                          Rs 40,000
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                            <Database className="h-4 w-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">Bootcamps / Bundle Offers</p>
                            <p className="text-xs text-gray-500">Partner + exam + labs</p>
                          </div>
                        </div>
                        <div className="bg-gray-100 px-4 py-1 rounded text-gray-700 font-bold">
                          Rs 65,000
                        </div>
                      </div>
                    </div>

                    {/* ProofPoint */}
                    <div className="p-5 bg-[#f7f9fc] relative">
                      <div className="absolute top-0 right-5 -mt-5">
                        <div className="bg-[#FF5722] text-white px-4 py-1 rounded-full font-bold shadow-lg">
                          BEST VALUE
                        </div>
                      </div>

                      <h4 className="font-bold text-[#2E5090] mb-3 text-xl">ProofPoint Package</h4>

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="bg-[#2E5090] h-10 w-10 rounded-full flex items-center justify-center mr-3 shadow-md">
                            <Award className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">Complete Training Package</p>
                            <p className="text-xs text-gray-500">Full training + exam fee included</p>
                          </div>
                        </div>
                        <div className="bg-[#2E5090]/10 border-2 border-[#2E5090] px-4 py-1 rounded-lg">
                          <p className="text-[#2E5090] font-bold text-xl">Rs 25,000*</p>
                        </div>
                      </div>


                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center animation-pulse-zoom">
                          <div className="bg-green-100 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                            <div className="text-green-600 font-bold">₹</div>
                          </div>
                          <div>
                            <p className="font-medium text-green-600 animate-pulse-zoom">Your Savings</p>
                          </div>
                        </div>
                        <div className="bg-green-100 px-4 py-1 rounded-lg text-green-700 font-bold animate-pulse-zoom">
                          Up to Rs 45,000
                        </div>
                      </div>



                      <p className="text-xs text-right text-gray-500 mt-3 italic">
                        * Price shown for AZ-900 certification. Contact us for other certification prices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>




              <div className="bg-white rounded-lg shadow-md border border-gray-100 flex-grow min-h-[280px]">
                <div className="bg-[#2E5090] p-4 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-[#2E5090]">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <h4 className="font-bold text-white text-lg">Why Choose ProofPoint?</h4>
                  </div>
                </div>
                <div className="p-5">
                  <ul className="space-y-3 text-gray-600">
                    <li
                      className="flex items-center"
                      data-aos="fade-down"
                      data-aos-delay="0"
                    >
                      <div className="h-5 w-5 rounded-full bg-[#2E5090] text-white flex items-center justify-center text-xs mr-3 flex-shrink-0">✓</div>
                      <span>Most affordable Microsoft certification training in India</span>
                    </li>
                    <li
                      className="flex items-center"
                      data-aos="fade-down"
                      data-aos-delay="100"
                    >
                      <div className="h-5 w-5 rounded-full bg-[#2E5090] text-white flex items-center justify-center text-xs mr-3 flex-shrink-0">✓</div>
                      <span>Small batch sizes ensure personalized attention</span>
                    </li>
                    <li
                      className="flex items-center"
                      data-aos="fade-down"
                      data-aos-delay="200"
                    >
                      <div className="h-5 w-5 rounded-full bg-[#2E5090] text-white flex items-center justify-center text-xs mr-3 flex-shrink-0">✓</div>
                      <span>Simplified payment - one price covers everything</span>
                    </li>
                    <li
                      className="flex items-center"
                      data-aos="fade-down"
                      data-aos-delay="300"
                    >
                      <div className="h-5 w-5 rounded-full bg-[#2E5090] text-white flex items-center justify-center text-xs mr-3 flex-shrink-0">✓</div>
                      <span>Experienced trainers with real-world industry expertise</span>
                    </li>
                    <li
                      className="flex items-center"
                      data-aos="fade-down"
                      data-aos-delay="400"
                    >
                      <div className="h-5 w-5 rounded-full bg-[#2E5090] text-white flex items-center justify-center text-xs mr-3 flex-shrink-0">✓</div>
                      <span>Comprehensive course material and hands-on labs for effective learning</span>
                    </li>
                  </ul>
                </div>
              </div>




            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1E3A70] to-[#2E5090] text-white py-10 px-6 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-8 w-8 mr-2" />
              <div>
                <p className="font-bold text-lg">ProofPoint</p>
                <p className="text-xs opacity-80">Your Skills. Certified.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">


              <Button
                className="bg-white/10 hover:bg-white/20 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                variant="ghost"
                size="sm"
                asChild
              >
                <a href="#paths">Certification Paths</a>
              </Button>

              <Button
                className="bg-white/10 hover:bg-white/20 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                variant="ghost"
                size="sm"
                asChild
              >
                <a href="#cta">Pricing</a>
              </Button>

              <Button
                // className="bg-white text-[#2E5090] hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                className="bg-white text-[#2E5090] hover:bg-[#2E5090] hover:text-white transition-colors duration-300"

                size="sm"
                asChild
              >
                <a href="mailto:Proofpoint@sgsnassociates.com">Contact Us</a>
              </Button>




            </div>
          </div>

          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80 mb-4 md:mb-0">© {new Date().getFullYear()} ProofPoint Certification Program by SGSN Associates Pvt. Ltd.</p>
            <p className="text-xs opacity-70">ProofPoint is a trademark of SGSN Associates Pvt. Ltd.</p>
          </div>
        </div>
      </footer>

      {/* Registration Popup */}
      <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
        <DialogContent className="sm:max-w-md h-[630px] overflow-y-auto bg-white">
          <DialogHeader>
            <div className="absolute right-4 top-4">
              {/* <button 
                onClick={() => setPopupOpen(false)}
                className="rounded-full w-8 h-8 inline-flex items-center justify-center border border-neutral-200 hover:bg-neutral-100"
              >
                <X className="h-4 w-4" />
              </button> */}




            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#2E5090] text-white p-2 rounded-full mb-2">
                <GraduationCap className="h-6 w-6" />
              </div>
              <DialogTitle className="text-center text-xl font-bold">
                {formStep === 1 && "Start Your Microsoft Certification Journey"}

                {formStep === 2 && "Education Background"}
                {formStep === 3 && "Choose Your Microsoft Certification"}
                {formStep === 4 && "Almost Done!"}
              </DialogTitle>
              <DialogDescription className="text-center max-w-xs mx-auto">
                {formStep === 1 && "Fill in your details to register for our upcoming AZ-900 batch starting May 15th, 2025."}
                {formStep === 2 && "Help us understand your academic background so we can tailor the training to your needs."}
                {formStep === 3 && "Select which Microsoft certification you want to pursue."}
                {formStep === 4 && "Just one more step to secure your spot in our certification program."}
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="py-4">
            {/* Step indicator */}
            <div className="flex justify-between mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= step ? 'bg-[#2E5090] text-white' : 'bg-gray-100 text-gray-400'
                      } transition-all`}
                  >
                    {formStep > step ? <Check className="h-4 w-4" /> : step}
                  </div>
                  <div className={`text-xs mt-1 ${formStep >= step ? 'text-[#2E5090]' : 'text-gray-400'}`}>
                    Step {step}
                  </div>
                </div>
              ))}
            </div>



            {formStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="FullName">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="FullName"
                    name="FullName"
                    placeholder="Enter your Full Name"
                    value={formData.FullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="num"
                    className="appearance-none focus:outline-none"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}






            {formStep === 2 && (
              <div className="space-y-4">

                <div className="space-y-2">
                  <Label htmlFor="collegeName">College Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="collegeName"
                    name="collegeName"
                    placeholder="Enter your college name"
                    value={formData.collegeName}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="degree">Degree <span className="text-red-500">*</span></Label>
                  <select
                    id="degree"
                    name="degree"
                    className="w-full border rounded px-3 py-2"
                    value={formData.degree}
                    onChange={handleChange}
                  >
                    <option value="">Select Degree</option>
                    <option value="btech">B.Tech</option>
                    <option value="mtech">M.Tech</option>
                    <option value="bca">BCA</option>
                    <option value="mca">MCA</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {formData.degree === "other" && (
                  <div className="space-y-2">
                    <Label htmlFor="customDegree">Enter Your Degree <span className="text-red-500">*</span></Label>
                    <Input
                      id="customDegree"
                      name="customDegree"
                      placeholder="Enter your degree name"
                      value={formData.customDegree}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="yearOfPassing">Year of Passing <span className="text-red-500">*</span></Label>
                  <Input
                    id="yearOfPassing"
                    name="yearOfPassing"
                    type="num"
                    placeholder="Eg. 2023"
                    value={formData.yearOfPassing}
                    onChange={handleChange}
                  />
                </div>



              </div>
            )}

            {/* Step 3: Course Selection */}
            {formStep === 3 && (
              <div className="space-y-4">


                <div className="space-y-2">
                  <Label htmlFor="course">Select Certification <span className="text-red-500">*</span></Label>
                 

                  <Select
  value={formData.course}
  onValueChange={(value) => handleSelectChange("course", value)}
>
  <SelectTrigger className="bg-white text-black border rounded-lg p-2">
    <SelectValue placeholder="Select certification" />
  </SelectTrigger>
  <SelectContent className="bg-white text-black border rounded-lg shadow-lg mt-2 w-full">
    <SelectItem value="AZ-900">AZ-900: Azure Fundamental</SelectItem>
    <SelectItem value="MS-900" disabled>
      MS-900: Microsoft 365 Fundamentals (Coming Soon)
    </SelectItem>
    <SelectItem value="AI-900" disabled>
      AZ-104: Azure Administrator Associate (Coming Soon)
    </SelectItem>
    <SelectItem value="DP-900" disabled>
      DP-900: Azure Data Fundamentals (Coming Soon)
    </SelectItem>
    <SelectItem value="SC-900" disabled>
      AZ-305 Azure Solution Architect Expert (Coming Soon)
    </SelectItem>
  </SelectContent>
</Select>


                </div>



                <div className="bg-[#f7f9fc] p-4 rounded-lg border border-[#2E5090]/20">
                  <h4 className="font-medium text-[#2E5090] mb-2">Note :</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="bg-[#2E5090]/10 text-[#2E5090] h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2">✓</div>
                      <span>Limited Batch Size (Only 15 Students)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-[#2E5090]/10 text-[#2E5090] h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2">✓</div>
                      <span>You can take the test upto two times</span>
                    </li>
                  </ul>
                </div>

              </div>
            )}

            {/* Step 4: Additional Information */}
            {formStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Prior Certificate (Optional)</Label>
                  <Input
                    id="experience"
                    name="experience"
                    placeholder="Any relevant experience or skills"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>
                <div className="bg-[#f7f9fc] p-4 rounded-lg border border-[#2E5090]/20">
                  <h4 className="font-medium text-[#2E5090] mb-2">Exclusive Benefits</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="bg-[#2E5090]/10 text-[#2E5090] h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2">✓</div>
                      <span>Get trained by Microsoft certified trainers</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-[#2E5090]/10 text-[#2E5090] h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2">✓</div>
                      <span>Weekend and Evening batch Option</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-[#2E5090]/10 text-[#2E5090] h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2">✓</div>
                      <span>Scholarship test opportunity on 30th April</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            {formStep > 1 && formStep <= 4 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormStep(prev => prev - 1)}
              >
                Back
              </Button>
            )}

            {formStep < 4 ? (
              <Button
                type="button"
                className="bg-[#2E5090] hover:bg-[#1E3A70] text-white" 

                onClick={handleNext}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                className="bg-[#2E5090] hover:bg-[#1E3A70] text-white"
                onClick={handleSubmit}
              >
                Register Now
              </Button>
            )}
          </DialogFooter>
        </DialogContent>

      </Dialog>

      {/* Register button that also opens the popup */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* <Button
          onClick={() => setPopupOpen(true)}
          className="bg-[#FF5722] hover:bg-[#e64a19] text-white rounded-full py-6 px-6 shadow-lg"
          size="lg"
        >
          <User className="h-5 w-5 mr-2" />
          Register Now
        </Button> */}
        <button
          onClick={() => setPopupOpen(true)}
          className="group bg-[#FF5722] hover:bg-[#e64a19] text-white rounded-full py-3 px-4 shadow-lg flex items-center overflow-hidden transition-all duration-300 ease-in-out"
        >
          <User className="h-5 w-5" />
          <span className="ml-2 max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 overflow-hidden whitespace-nowrap">
            Register Now
          </span>
        </button>

      </div>
    </div>



  );
}









