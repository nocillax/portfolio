"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useCallback, useRef } from "react";

// --- 1. Define Project Data Structure and Data ---
// You can easily add, remove, or edit projects here.

const tagColorMap = {
  blue: "bg-blue-500/10 text-blue-400",
  purple: "bg-purple-500/10 text-purple-400",
  teal: "bg-teal-500/10 text-teal-400",
  red: "bg-red-500/10 text-red-400",
  yellow: "bg-yellow-500/10 text-yellow-400",
  green: "bg-green-500/10 text-green-400",
  orange: "bg-orange-500/10 text-orange-400",
};

// Add this new type definition
type Project = {
  title: string;
  description: string;
  frontend: {
    title: string;
    features: string[];
  };
  backend: {
    title: string;
    features: string[];
  };
  achievements: {
    title: string;
    points: string[];
  };
  tags: {
    name: string;
    color: keyof typeof tagColorMap;
  }[];
  images: string[];
  githubUrl: string;
};

const projectsData: Project[] = [
  {
    title: "E-commerce Website",
    description:
      "A full-featured e-commerce platform built with NestJS (backend) and Next.js + Tailwind (frontend), designed for Admin, Customer, and Guest roles.",
    frontend: {
      title: "Frontend Architecture",
      features: [
        "Next.js with Tailwind CSS",
        "Dynamic Cart with Zustand",
        "Stripe Payment Integration",
        "Modal-based forms and UI feedback (Toastr)",
      ],
    },
    backend: {
      title: "Backend Systems",
      features: [
        "NestJS + PostgreSQL",
        "Authentication with JWT stored in cookies",
        "Multer for image uploads",
        "Nodemailer for order status emails",
      ],
    },
    achievements: {
      title: "Key Flow & Features",
      points: [
        "Admin dashboard for product/category/discount management",
        "Support for product variants (e.g., colors)",
        "Tags like 'Best Sellers' auto-placed in homepage sections",
        "Cart displays total price and discount savings in real-time",
        "Stock updates after payment confirmation via Stripe",
      ],
    },
    tags: [
      { name: "Next.js", color: "blue" },
      { name: "NestJS", color: "purple" },
      { name: "PostgreSQL", color: "teal" },
      { name: "TailwindCSS", color: "green" },
      { name: "Zustand", color: "red" },
    ],
    images: [
      "ecom/ecom-homepage.png",
      "ecom/ecom-product-details.png",
      "ecom/ecom-cart.png",
      "ecom/ecom-admin-product.png",
      "ecom/ecom-admin-product-edit.png",
    ],
    githubUrl: "https://github.com/nocillax/ATP3-Ecommerce-Site",
  },
  {
    title: "Inventory & Sales Management System",
    description:
      "A dashboard-based system for managing inventory, sales, stock levels, and business analytics, built using ASP.NET MVC with SQL Server.",
    frontend: {
      title: "Frontend Interface",
      features: [
        "Razor Views with Bootstrap (customized SB Admin 2)",
        "Dynamic dropdowns using Select2",
        "AJAX-powered product/category search",
        "Toastr for interactive feedback",
      ],
    },
    backend: {
      title: "Backend Logic",
      features: [
        "ASP.NET MVC with Code First",
        "MSSQL via SQL Server Management Studio",
        "JWT Authentication",
        "PDF Report Generation using Rotativa",
      ],
    },
    achievements: {
      title: "Key Flow & Features",
      points: [
        "Separate dashboards for Manager and Salesperson roles",
        "Sales form with buyer details, product selection, and invoice generation",
        "KPI cards and visual analytics for both user roles",
        "Advanced reports (Sales, Profit, Stock, Product) with filters and charts",
        "Real-time stock updates and downloadable reports",
      ],
    },
    tags: [
      { name: "ASP.NET", color: "blue" },
      { name: "MSSQL", color: "teal" },
      { name: "Razor", color: "purple" },
      { name: "Bootstrap", color: "red" },
      { name: "JWT", color: "yellow" },
    ],
    images: [
      "isms/isms-homepage.png",
      "isms/isms-admin-products.png",
      "isms/isms-create-sale.png",
      "isms/isms-admin-sale-history.png",
      "isms/isms-profit-summary.png",
      "isms/isms-sale-summary.png",
    ],
    githubUrl:
      "https://github.com/nocillax/Inventory---Sales-Management-System",
  },
];

// --- 2. Reusable ProjectCard Component ---
// This component is self-contained and gets its data via props.

function ProjectCard({ project }: { project: Project }) {
  const [currentImage, setCurrentImage] = useState(0);

  // --- New Slideshow Logic ---
  // Use a ref to hold the interval ID. This doesn't trigger re-renders.
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const SLIDESHOW_INTERVAL = 5000; // 5 seconds

  const handleNext = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  }, [project.images.length]);

  const handlePrev = () => {
    setCurrentImage(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  // Function to start the slideshow on hover
  const handleMouseEnter = () => {
    // Clear any existing interval before starting a new one
    if (intervalRef.current) clearInterval(intervalRef.current);
    // Start a new interval
    intervalRef.current = setInterval(() => {
      handleNext();
    }, SLIDESHOW_INTERVAL);
  };

  // Function to stop the slideshow when the mouse leaves
  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  // --- End of New Logic ---

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* --- Column 1: Text Content --- */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-blue-400 mb-3">
                    {project.frontend.title}
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {project.frontend.features.map((feature, i) => (
                      <li key={i}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-purple-400 mb-3">
                    {project.backend.title}
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {project.backend.features.map((feature, i) => (
                      <li key={i}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-teal-400 mb-3">
                  {project.achievements.title}
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {project.achievements.points.map((point, i) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm ${
                    tagColorMap[tag.color] || tagColorMap.blue
                  }`}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <div className="!mt-auto pt-4">
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-300"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span className="text-gray-300">GitHub</span>
              </Link>
            </div>
          </div>

          {/* --- Column 2: Image Carousel --- */}
          <div className="relative w-full aspect-video lg:aspect-[4/3.5] bg-black/30 rounded-xl overflow-hidden self-center">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              {project.images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-full flex-shrink-0 object-cover"
                />
              ))}
            </div>

            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- 3. Main Section Component ---
// This component now just maps the data to the card component.

export default function ProjectsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-16 text-center"
        >
          Full Stack Projects
        </motion.h2>

        <div className="space-y-16">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
