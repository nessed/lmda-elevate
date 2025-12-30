// Centralized Site Configuration
// Change values here to update across the entire site

export const siteConfig = {
  // Contact Information
  whatsapp: {
    number: "923103336485", // Without + prefix for wa.me links
    displayNumber: "+92 310 3336485",
  },
  
  phone: {
    mobile: "+92 310 3336485",
    landline: "042 35111184",
  },
  
  email: "info@lmda.pk",
  
  address: "327, Block No. 02, Sector C1, Township, Lahore",
  
  // Branding & Partnerships
  partnership: {
    pec: "Official Training Partner of Pakistan Engineering Council",
    pecShort: "PEC Training Partner",
  },
  
  company: {
    name: "LMDA",
    fullName: "Leadership and Management Development Associates",
    tagline: "Pakistan's Premier Sales & Leadership Training Ecosystem",
    copyright: "© 2026 Leadership and Management Development Associates (LMDA)",
  },
  
  // Social Links
  socials: {
    youtube: "https://www.youtube.com/channel/UCL2--Q8WKieUyBDdp4C_w-Q",
    instagram: "https://www.instagram.com/lmda.pk/",
    facebook: "https://www.facebook.com/lmdapk/",
    linkedin: "",
  },
  
  // Auth & Security
  auth: {
    // Hardcoded super admins - these emails ALWAYS have super_admin access
    // even if the database is unavailable or user_roles table is missing
    superAdminEmails: [
      "ali.abid44444@gmail.com",
    ],
    // Fallback name if profile fetch fails
    fallbackAdminName: "LMDA Administrator",
  },
  
  // Default Workshop Pricing
  pricing: {
    certificationSeries: 12800,
    standardWorkshop: 5000,
    freeWorkshop: 0,
  },
} as const;

// Helper function to generate WhatsApp link
export const getWhatsAppLink = (message?: string) => {
  const encodedMessage = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${siteConfig.whatsapp.number}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
};

// Helper for workshop registration message
export const getWorkshopRegistrationLink = (title: string, date: string) => {
  return getWhatsAppLink(`Hi, I want to register for ${title} on ${date}.`);
};

export default siteConfig;
