import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  CalendarCheck,
  Lightbulb,
} from "lucide-react";
import Button from "../components/Button";
import { ContactForm } from "../types";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "Ac.bryt19@gmail.com",
      href: "mailto:Ac.bryt19@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+233 591 781440",
      href: "tel:+233591781440",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Accra, GH",
      href: "https://www.google.com/maps?q=Accra,+GH",
    },
  ];

  const expectations = [
    {
      icon: Clock,
      title: "Quick Response",
      value: "Within 24 hours",
      description: "I check my inbox daily and prioritise every message.",
    },
    {
      icon: CalendarCheck,
      title: "Availability",
      value: "Open to Work",
      description: "Available for freelance projects, internships & full-time roles.",
    },
    {
      icon: Lightbulb,
      title: "Open To",
      value: "All Conversations",
      description: "Whether it's a big idea, a small question, or just saying hi.",
    },
  ];


  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-4">
            Message Sent!
          </h1>
          <p className="text-dark-600 dark:text-dark-300 mb-8">
            Thank you for reaching out. I'll get back to you as soon as
            possible.
          </p>
          <Button variant="primary" onClick={() => setIsSubmitted(false)}>
            Send Another Message
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      {/* Hero Section */}
      <section className="pt-40 pb-20 border-b border-dark-100 dark:border-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <h1 className="text-7xl md:text-9xl font-black text-dark-900 dark:text-white leading-none tracking-tighter mb-12">
              Let's <br />
              <span className="text-primary-500">Connect.</span>
            </h1>
            <p className="text-xl md:text-3xl text-dark-600 dark:text-dark-400 font-light leading-snug max-w-3xl">
              Have a project in mind or just want to chat? I'm always open to new opportunities and interesting conversations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 md:py-40">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 md:gap-40 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black mb-12 tracking-tighter uppercase">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-dark-400">Your Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b-2 py-4 text-xl md:text-2xl font-bold focus:outline-none transition-colors border-dark-100 dark:border-dark-800 focus:border-primary-500 ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-xs font-bold text-red-500 uppercase tracking-widest">{errors.name}</p>}
                </div>

                <div className="space-y-4">
                  <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-dark-400">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b-2 py-4 text-xl md:text-2xl font-bold focus:outline-none transition-colors border-dark-100 dark:border-dark-800 focus:border-primary-500 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-xs font-bold text-red-500 uppercase tracking-widest">{errors.email}</p>}
                </div>

                <div className="space-y-4">
                  <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-dark-400">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b-2 py-4 text-xl md:text-2xl font-bold focus:outline-none transition-colors border-dark-100 dark:border-dark-800 focus:border-primary-500 resize-none ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-xs font-bold text-red-500 uppercase tracking-widest">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full px-12 py-6 text-xl w-full md:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-20"
            >
              <div>
                <h2 className="text-4xl font-black mb-12 tracking-tighter uppercase">Direct Contact</h2>
                <div className="space-y-12">
                  {contactInfo.map((info, index) => (
                    <a key={index} href={info.href} className="group block">
                      <p className="text-xs font-black uppercase tracking-widest text-primary-500 mb-2">{info.title}</p>
                      <p className="text-3xl md:text-4xl font-bold group-hover:translate-x-4 transition-transform duration-500 tracking-tight">
                        {info.value}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-black mb-12 tracking-tighter uppercase">What to Expect</h2>
                <div className="space-y-10">
                  {expectations.map((item, index) => (
                    <div key={index} className="flex items-start gap-6 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center transition-colors group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40">
                        <item.icon className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-primary-500 mb-1">{item.title}</p>
                        <p className="text-2xl font-black tracking-tight mb-1">{item.value}</p>
                        <p className="text-dark-500 dark:text-dark-400 font-light leading-snug">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
