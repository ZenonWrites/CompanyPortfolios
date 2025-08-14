'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar.jsx'
import * as LucideIcons from 'lucide-react'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Navigation items
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
  ]

  // Company stats
  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '200+', label: 'Happy Clients' },
    { number: '50+', label: 'Team Members' },
    { number: '10+', label: 'Years Experience' }
  ]

  // Services data
  const services = [
    {
      icon: '🚀',
      title: 'Strategic Consulting',
      description: 'Expert guidance to transform your business strategy and achieve sustainable growth.',
      features: ['Business Analysis', 'Growth Planning', 'Process Optimization', 'Market Research']
    },
    {
      icon: '💻',
      title: 'Digital Solutions',
      description: 'Cutting-edge technology solutions tailored to your business needs.',
      features: ['Web Development', 'Mobile Apps', 'Cloud Services', 'AI Integration']
    },
    {
      icon: '📊',
      title: 'Data Analytics',
      description: 'Transform your data into actionable insights for informed decision making.',
      features: ['Business Intelligence', 'Data Visualization', 'Predictive Analytics', 'KPI Tracking']
    },
    {
      icon: '🎯',
      title: 'Marketing Excellence',
      description: 'Comprehensive marketing strategies to amplify your brand and reach.',
      features: ['Digital Marketing', 'Brand Strategy', 'Content Creation', 'SEO/SEM']
    }
  ]

  // Team members
  const team = [
    {
      name: 'Sarah Johnson',
      position: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxjb3Jwb3JhdGUlMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3xlbnwwfHx8Ymx1ZXwxNzU1MDkyMDA5fDA&ixlib=rb-4.1.0&q=85',
      bio: 'Visionary leader with 15+ years of experience driving business transformation.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Michael Chen',
      position: 'CTO',
      image: 'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtfGVufDB8fHxibHVlfDE3NTUwOTIwMTV8MA&ixlib=rb-4.1.0&q=85',
      bio: 'Tech innovator passionate about creating scalable solutions for modern businesses.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Emily Rodriguez',
      position: 'Head of Marketing',
      image: 'https://images.unsplash.com/photo-1573497701175-00c200fd57f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxvZmZpY2UlMjB0ZWFtfGVufDB8fHxibHVlfDE3NTUwOTIwMTV8MA&ixlib=rb-4.1.0&q=85',
      bio: 'Creative strategist who helps brands tell their story and connect with audiences.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'David Park',
      position: 'Lead Developer',
      image: 'https://images.pexels.com/photos/8254894/pexels-photo-8254894.jpeg',
      bio: 'Full-stack developer with expertise in modern technologies and user experience.',
      linkedin: '#',
      twitter: '#'
    }
  ]

  // Projects data
  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Development',
      image: 'https://images.unsplash.com/photo-1620519086899-1b941c49f202?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxjb3Jwb3JhdGUlMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3xlbnwwfHx8Ymx1ZXwxNzU1MDkyMDA5fDA&ixlib=rb-4.1.0&q=85',
      description: 'Complete e-commerce solution with advanced analytics and user management.',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Corporate Rebranding',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1620519157189-c06a79a52f99?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxjb3Jwb3JhdGUlMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3xlbnwwfHx8Ymx1ZXwxNzU1MDkyMDA5fDA&ixlib=rb-4.1.0&q=85',
      description: 'Complete brand identity redesign for Fortune 500 company.',
      tags: ['Branding', 'Design', 'Strategy']
    },
    {
      title: 'Data Analytics Dashboard',
      category: 'Analytics',
      image: 'https://images.pexels.com/photos/9221770/pexels-photo-9221770.jpeg',
      description: 'Real-time analytics platform for business intelligence and reporting.',
      tags: ['Analytics', 'Dashboard', 'BI']
    }
  ]

  // Testimonials
  const testimonials = [
    {
      name: 'Alex Thompson',
      company: 'TechCorp Inc.',
      text: 'Working with this team has been transformative for our business. Their expertise and dedication are unmatched.',
      rating: 5
    },
    {
      name: 'Maria González',
      company: 'StartupXYZ',
      text: 'The strategic insights and execution quality exceeded our expectations. Highly recommended!',
      rating: 5
    },
    {
      name: 'James Wilson',
      company: 'Enterprise Solutions',
      text: 'Professional, reliable, and results-driven. They helped us achieve our goals efficiently.',
      rating: 5
    }
  ]

  // Blog posts
  const blogPosts = [
    {
      title: 'The Future of Digital Transformation',
      excerpt: 'Exploring how emerging technologies are reshaping business landscapes.',
      date: '2024-06-15',
      image: 'https://images.unsplash.com/photo-1620519086872-fec32e3bfc69?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3xlbnwwfHx8Ymx1ZXwxNzU1MDkyMDA5fDA&ixlib=rb-4.1.0&q=85',
      category: 'Technology'
    },
    {
      title: 'Building Resilient Teams in Remote Work',
      excerpt: 'Strategies for maintaining team cohesion and productivity in distributed environments.',
      date: '2024-06-10',
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxjb3Jwb3JhdGUlMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3xlbnwwfHx8Ymx1ZXwxNzU1MDkyMDA5fDA&ixlib=rb-4.1.0&q=85',
      category: 'Management'
    },
    {
      title: 'Data-Driven Decision Making',
      excerpt: 'How to leverage analytics for better business outcomes and strategic planning.',
      date: '2024-06-05',
      image: 'https://images.unsplash.com/photo-1620519086899-1b941c49f202?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxjb3Jwb3JhdGUlMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3xlbnwwfHx8Ymx1ZXwxNzU1MDkyMDA5fDA&ixlib=rb-4.1.0&q=85',
      category: 'Analytics'
    }
  ]

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  // Testimonial navigation
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Company
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <Button>Get Started</Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {isMenuOpen ? (
                  <LucideIcons.X className="h-6 w-6" />
                ) : (
                  <LucideIcons.Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Company
              </h1>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                <LucideIcons.X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors py-2 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button className="mt-4 w-full">Get Started</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1620519086872-fec32e3bfc69?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3xlbnwwfHx8Ymx1ZXwxNzU1MDkyMDA5fDA&ixlib=rb-4.1.0&q=85')`
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }}
            >
              Building the
              <span className="text-blue-400 block">Future Together</span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
              }}
            >
              We transform businesses through innovative solutions, strategic thinking, and exceptional execution. Your success is our mission.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.4, ease: "easeOut" }
              }}
            >
              <button 
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-10 rounded-md bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              >
                Start Your Project 
                <LucideIcons.ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm h-10 rounded-md border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About Our Company</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a forward-thinking company dedicated to delivering exceptional results through innovation, expertise, and unwavering commitment to our clients' success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6">Our Story</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Founded with a vision to bridge the gap between traditional business practices and modern digital solutions, we have grown into a trusted partner for companies worldwide.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our journey began with a simple belief: every business deserves access to world-class expertise and innovative solutions that drive real results.
              </p>
              <div className="flex items-center gap-4">
                <LucideIcons.CheckCircle className="text-green-500 h-6 w-6" />
                <span className="text-lg">Certified Excellence in Service Delivery</span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1620519086899-1b941c49f202?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxjb3Jwb3JhdGUlMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3xlbnwwfHx8Ymx1ZXwxNzU1MDkyMDA5fDA&ixlib=rb-4.1.0&q=85"
                alt="About Us"
                className="rounded-lg shadow-lg"
              />
              <motion.div
                className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm">Years of Excellence</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer comprehensive solutions tailored to meet your business needs and drive sustainable growth.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 hover:border-primary/20">
                  <CardHeader className="text-center">
                    <motion.div
                      className="text-6xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {service.icon}
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-center">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <LucideIcons.CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse team of experts brings together decades of experience and a passion for innovation.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Avatar className="w-32 h-32 mx-auto mb-4">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    </motion.div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">{member.position}</p>
                    <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>

                    <div className="flex justify-center space-x-3">
                      <motion.a
                        href={member.linkedin}
                        whileHover={{ scale: 1.2, y: -2 }}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <LucideIcons.Linkedin className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        href={member.twitter}
                        whileHover={{ scale: 1.2, y: -2 }}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <LucideIcons.Twitter className="h-5 w-5" />
                      </motion.a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore some of our most successful projects that showcase our expertise and commitment to excellence.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">{project.category}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="relative"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card className="p-8 text-center">
                <CardContent>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <LucideIcons.Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <motion.p
                    key={currentTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-xl italic mb-6 text-muted-foreground"
                  >
                    "{testimonials[currentTestimonial].text}"
                  </motion.p>

                  <div className="font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-primary">{testimonials[currentTestimonial].company}</div>
                </CardContent>
              </Card>

              {/* Navigation buttons */}
              <div className="flex justify-center mt-6 space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full"
                >
                  <LucideIcons.ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full"
                >
                  <LucideIcons.ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Insights</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with our latest thoughts on industry trends, best practices, and innovative solutions.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {blogPosts.map((post, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge>{post.category}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Button variant="outline" size="lg">
              View All Articles <LucideIcons.ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to start your next project? We'd love to hear from you. Get in touch and let's discuss how we can help.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <LucideIcons.Mail className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">hello@company.com</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <LucideIcons.Phone className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <LucideIcons.MapPin className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-muted-foreground">123 Business St, Suite 100<br />City, State 12345</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="font-bold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: LucideIcons.Linkedin, href: '#', label: 'LinkedIn' },
                    { icon: LucideIcons.Twitter, href: '#', label: 'Twitter' },
                    { icon: LucideIcons.Instagram, href: '#', label: 'Instagram' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -2 }}
                      className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Textarea
                        placeholder="Your Message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Send Message <LucideIcons.ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Company</h3>
              <p className="mb-4 opacity-90">
                Building the future through innovation, expertise, and unwavering commitment to excellence.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: LucideIcons.Linkedin, href: '#' },
                  { icon: LucideIcons.Twitter, href: '#' },
                  { icon: LucideIcons.Instagram, href: '#' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.slice(0, 4).map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href.substring(1))}
                      className="opacity-90 hover:opacity-100 transition-opacity"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 opacity-90">
                <li>Strategic Consulting</li>
                <li>Digital Solutions</li>
                <li>Data Analytics</li>
                <li>Marketing Excellence</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <div className="space-y-2 opacity-90">
                <div>hello@company.com</div>
                <div>+1 (555) 123-4567</div>
                <div>123 Business St<br />City, State 12345</div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-primary-foreground/20 pt-8 text-center">
            <p className="opacity-70">
              © 2024 Company. All rights reserved. Built with ❤️ for businesses that dare to dream big.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}