import type {
  Industry,
  Layout,
  Template,
  Demo,
  Section,
  SectionItem,
  PublicDemo,
  AdminDemo,
} from "./types";

export const OFFICIAL = "https://thekittycorp.com";
// Curated flagship designs count: length === 54

export const industries: Industry[] = [
  {
    id: "medico",
    name: "Medical & wellness",
    eyebrow: "Care, made accessible",
    description: "Welcoming digital experiences for every kind of care.",
    image: "medical",
    color: "#17665b",
    specialties: [
      "Multi-Speciality Hospital",
      "Dental & Aesthetic Clinic",
      "Diagnostic & Wellness Centre",
    ],
    sections: [
      ["services", "Care & specialities"],
      ["team", "Meet your care team"],
      ["hours", "Clinic hours"],
      ["faq", "Before your visit"],
    ],
    cta: "Request an appointment",
  },
  {
    id: "institute",
    name: "Education & coaching",
    eyebrow: "A place to grow",
    description: "Give the next generation a clear path forward.",
    image: "education",
    color: "#3f4c9b",
    specialties: [
      "Competitive Exam Academy",
      "International Day School",
      "Tech & Coding Institute",
    ],
    sections: [
      ["catalogue", "Explore our courses"],
      ["team", "Faculty"],
      ["services", "Learning approach"],
      ["faq", "Admissions & batches"],
    ],
    cta: "Enquire about admissions",
  },
  {
    id: "real-estate",
    name: "Real estate",
    eyebrow: "Find your place",
    description: "Thoughtful spaces deserve an exceptional first impression.",
    image: "property",
    color: "#6a614b",
    specialties: [
      "Luxury Residential Estates",
      "Commercial Towers & Workspaces",
      "Boutique Architectural Realty",
    ],
    sections: [
      ["catalogue", "Explore properties"],
      ["gallery", "A closer look"],
      ["team", "Your property team"],
      ["faq", "Buying & renting"],
    ],
    cta: "Request a site visit",
  },
  {
    id: "restaurant",
    name: "Restaurants & cafés",
    eyebrow: "Made to be savoured",
    description: "From the first impression to the first reservation enquiry.",
    image: "restaurant",
    color: "#86442e",
    specialties: [
      "Contemporary Fine Dining",
      "Artisan Roastery & Café",
      "Gourmet Cloud Kitchen",
    ],
    sections: [
      ["catalogue", "At the table"],
      ["gallery", "A taste of the space"],
      ["hours", "Come on over"],
      ["faq", "Good to know"],
    ],
    cta: "Enquire about a table",
  },
  {
    id: "local-business",
    name: "Retail & local shops",
    eyebrow: "Something worth discovering",
    description: "Help neighbourhood favourites find new customers.",
    image: "retail",
    color: "#64503c",
    specialties: [
      "Fine Jewellery & Couture",
      "Smart Electronics & Appliances",
      "Handcrafted Furniture & Living",
    ],
    sections: [
      ["catalogue", "Explore the collection"],
      ["services", "Made for your everyday"],
      ["gallery", "In store"],
      ["hours", "Visit us"],
    ],
    cta: "Enquire about a product",
  },
  {
    id: "salon",
    name: "Salon & beauty",
    eyebrow: "A little time for you",
    description: "A refined home for salons, spas, and personal care.",
    image: "salon",
    color: "#805e65",
    specialties: [
      "Haute Hair Studio",
      "Aesthetic Skin & Nail Salon",
      "Luxury Ayurvedic Day Spa",
    ],
    sections: [
      ["pricing", "The treatment menu"],
      ["team", "Meet the stylists"],
      ["gallery", "Our space"],
      ["hours", "Opening hours"],
    ],
    cta: "Request an appointment",
  },
  {
    id: "gym",
    name: "Fitness & yoga",
    eyebrow: "Find your next level",
    description: "Build a community around movement and wellbeing.",
    image: "fitness",
    color: "#b5e144",
    specialties: [
      "Athletic Performance Club",
      "Mindful Yoga & Reformer Pilates",
      "Elite Personal Training Lab",
    ],
    sections: [
      ["pricing", "Membership options"],
      ["services", "Classes & facilities"],
      ["team", "Your trainers"],
      ["hours", "Class schedule"],
    ],
    cta: "Enquire about a trial",
  },
  {
    id: "hotel",
    name: "Hotels & hospitality",
    eyebrow: "Stay a little longer",
    description: "Turn a destination into an invitation.",
    image: "hotel",
    color: "#476b63",
    specialties: [
      "Heritage Boutique Hotel",
      "Luxury Eco-Resort & Villas",
      "Executive Serviced Suites",
    ],
    sections: [
      ["catalogue", "Rooms & suites"],
      ["services", "During your stay"],
      ["gallery", "Discover the property"],
      ["faq", "Plan your arrival"],
    ],
    cta: "Enquire about a stay",
  },
  {
    id: "automobile",
    name: "Automobile",
    eyebrow: "The road ahead",
    description: "A confident digital showroom for vehicles and services.",
    image: "auto",
    color: "#a73e32",
    specialties: [
      "Certified Luxury Dealership",
      "Precision Tuning & Detailing",
      "EV & Superbike Showroom",
    ],
    sections: [
      ["catalogue", "Vehicles & services"],
      ["services", "Care beyond the road"],
      ["gallery", "Inside the workshop"],
      ["hours", "Visit our team"],
    ],
    cta: "Send an enquiry",
  },
  {
    id: "professional",
    name: "Professional services",
    eyebrow: "Clarity for what comes next",
    description: "Considered websites for expertise-led businesses.",
    image: "office",
    color: "#283f60",
    specialties: [
      "Corporate & Financial Advisory",
      "Commercial Legal Practice",
      "Architectural & Interior Design",
    ],
    sections: [
      ["services", "Areas of expertise"],
      ["team", "People & perspectives"],
      ["gallery", "Selected work"],
      ["faq", "Working together"],
    ],
    cta: "Request a consultation",
  },
  {
    id: "home-services",
    name: "Home services",
    eyebrow: "A home, well cared for",
    description: "Make it easier for customers to find reliable help.",
    image: "interior",
    color: "#42705c",
    specialties: [
      "Residential Maintenance & Care",
      "Eco Deep Cleaning & Sanitization",
      "Smart Home Automation & Repairs",
    ],
    sections: [
      ["services", "How we can help"],
      ["pricing", "Service options"],
      ["gallery", "Our work"],
      ["faq", "Before you book"],
    ],
    cta: "Request a quote",
  },
  {
    id: "travel",
    name: "Travel & tourism",
    eyebrow: "Go a little further",
    description: "Bring itineraries, experiences, and destinations to life.",
    image: "travel",
    color: "#246a7d",
    specialties: [
      "Bespoke Luxury Travel Agency",
      "High-Altitude & Wild Expeditions",
      "Curated Heritage & Cultural Escapes",
    ],
    sections: [
      ["catalogue", "Find your next journey"],
      ["gallery", "Places to remember"],
      ["services", "Travel, thoughtfully planned"],
      ["faq", "Planning your trip"],
    ],
    cta: "Plan a trip",
  },
  {
    id: "event",
    name: "Events & celebrations",
    eyebrow: "For the moments that matter",
    description: "An expressive canvas for unforgettable occasions.",
    image: "event",
    color: "#885a70",
    specialties: [
      "Destination Royal Weddings",
      "Corporate Summits & Keynotes",
      "Exclusive Milestone Celebrations",
    ],
    sections: [
      ["services", "Your occasion, considered"],
      ["gallery", "Moments & details"],
      ["team", "The people behind it"],
      ["faq", "Let’s make plans"],
    ],
    cta: "Tell us about your event",
  },
  {
    id: "portfolio",
    name: "Creative portfolios",
    eyebrow: "A different perspective",
    description: "Let creative work speak with a distinctive visual voice.",
    image: "interior",
    color: "#4b5244",
    specialties: [
      "Editorial & Fashion Photography",
      "Brand Identity & Spatial Studio",
      "Creative Direction & Interaction",
    ],
    sections: [
      ["gallery", "Selected work"],
      ["services", "What I do"],
      ["about", "The person behind the work"],
      ["faq", "Collaborations"],
    ],
    cta: "Start a conversation",
  },
  {
    id: "ecommerce",
    name: "Online stores",
    eyebrow: "Objects for everyday living",
    description: "A beautiful enquiry-led catalogue for emerging brands.",
    image: "retail",
    color: "#776249",
    specialties: [
      "Curated Home Living & Artifacts",
      "Sustainable Organic Apparel",
      "Artisan Gourmet & Craft Provisions",
    ],
    sections: [
      ["catalogue", "The collection"],
      ["gallery", "In everyday life"],
      ["services", "Thoughtful details"],
      ["faq", "Product enquiries"],
    ],
    cta: "Explore the collection",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    eyebrow: "Built with purpose",
    description: "Present products, processes, and capabilities with clarity.",
    image: "industry",
    color: "#425670",
    specialties: [
      "Heavy Machinery & Precision Tools",
      "Custom Metal Fabrication & CNC",
      "Sustainable Industrial Packaging",
    ],
    sections: [
      ["catalogue", "Products & capabilities"],
      ["services", "Our process"],
      ["gallery", "Inside the facility"],
      ["faq", "Working with us"],
    ],
    cta: "Request product information",
  },
  {
    id: "ngo",
    name: "NGOs & foundations",
    eyebrow: "A shared possibility",
    description: "Tell a purpose-led story and invite meaningful involvement.",
    image: "education",
    color: "#637e43",
    specialties: [
      "Community Empowerment Trust",
      "Rural Education & Digital Literacy",
      "Reforestation & Renewable Action",
    ],
    sections: [
      ["services", "Our areas of focus"],
      ["team", "Our people"],
      ["gallery", "In the community"],
      ["faq", "Get involved"],
    ],
    cta: "Connect with the team",
  },
  {
    id: "logistics",
    name: "Logistics & transport",
    eyebrow: "Moving business forward",
    description: "Clear service information for a connected world.",
    image: "logistics",
    color: "#305e79",
    specialties: [
      "Multimodal Interstate Freight",
      "Cold Chain & Smart Warehousing",
      "Global Express Cargo & Customs",
    ],
    sections: [
      ["services", "Logistics solutions"],
      ["catalogue", "Service coverage"],
      ["gallery", "Operations"],
      ["faq", "Shipment enquiries"],
    ],
    cta: "Request a quote",
  },
];

const flagshipStyles: {
  layout: Layout;
  font: "serif" | "sans";
  styleName: string;
  descPrefix: string;
}[] = [
  {
    layout: "editorial",
    font: "serif",
    styleName: "Editorial",
    descPrefix:
      "An editorial, magazine-style layout featuring asymmetric storytelling and refined typography",
  },
  {
    layout: "split",
    font: "sans",
    styleName: "Split",
    descPrefix:
      "A modern split-screen layout engineered for high conversion and structured modular presentation",
  },
  {
    layout: "immersive",
    font: "sans",
    styleName: "Immersive",
    descPrefix:
      "A full-width, media-immersive visual layout showcasing bold hero imagery and atmospheric design",
  },
];

export const templates: Template[] = industries.flatMap((industry) =>
  industry.specialties.map((specialty, j) => {
    const style = flagshipStyles[j % 3];
    return {
      id: `${industry.id}-${j + 1}`,
      industry: industry.id,
      name: `${specialty} / ${style.styleName}`,
      specialty,
      layout: style.layout,
      color: industry.color,
      font: style.font,
      image: `/images/${industry.image}.jpg`,
      description: `${style.descPrefix} for ${specialty.toLowerCase()}.`,
    };
  }),
);

export function getIndustry(id: string) {
  return industries.find((i) => i.id === id);
}

export function getTemplate(id: string) {
  return templates.find((t) => t.id === id);
}

export function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 70) || "business-demo"
  );
}

export const industryHeadings: Record<string, string> = {
  medico: "Care that starts with you.",
  institute: "Your next chapter starts here.",
  "real-estate": "A place to call your own.",
  restaurant: "Good food. Better company.",
  "local-business": "A little discovery. Every day.",
  salon: "Make time for yourself.",
  gym: "Show up. Find your strength.",
  hotel: "Somewhere you’ll want to stay.",
  automobile: "Ready for the road ahead.",
  professional: "Thoughtful expertise. Clear direction.",
  "home-services": "A little help. A better home.",
  travel: "There is more to discover.",
  event: "Make the moment yours.",
  portfolio: "A considered point of view.",
  ecommerce: "Considered things. Everyday joy.",
  manufacturing: "Made for what comes next.",
  ngo: "Together, we can do more.",
  logistics: "Your next move, made simple.",
};

export const templateHeadlines: Record<string, string> = {
  "medico-1": "World-class clinical care & surgical excellence.",
  "medico-2": "Precision aesthetic & family dentistry.",
  "medico-3": "Comprehensive diagnostics & preventive care.",
  "institute-1": "Premier competitive exam preparation & mentorship.",
  "institute-2": "Holistic K-12 academic excellence & sports.",
  "institute-3": "Next-gen tech skills & software engineering.",
  "real-estate-1": "Curated luxury residences & penthouses.",
  "real-estate-2": "Grade-A commercial workspaces & retail towers.",
  "real-estate-3": "Boutique architectural realty & advisory.",
  "restaurant-1": "Exquisite seasonal culinary degustation.",
  "restaurant-2": "Artisan coffee, sourdough bakes & brunch.",
  "restaurant-3": "Gourmet cloud kitchen & event catering.",
  "local-business-1": "Bespoke fine jewellery & bridal couture.",
  "local-business-2": "Smart electronics & audio technology.",
  "local-business-3": "Handcrafted furniture & bespoke interiors.",
  "salon-1": "Haute hair design, balayage & styling.",
  "salon-2": "Clinical skin rejuvenation & aesthetic nail bar.",
  "salon-3": "Holistic day spa & ancient wellness rituals.",
  "gym-1": "High-intensity athletic training & conditioning.",
  "gym-2": "Mindful movement, yoga & reformer pilates.",
  "gym-3": "Elite 1-on-1 body transformation coaching.",
  "hotel-1": "Intimate luxury boutique heritage stay.",
  "hotel-2": "Oceanfront private pool villas & spa.",
  "hotel-3": "Modern serviced executive suites.",
  "automobile-1": "Certified pre-owned German luxury sedans.",
  "automobile-2": "Performance tuning, diagnostics & ceramic detailing.",
  "automobile-3": "Premium superbike & electric mobility showroom.",
  "professional-1": "Strategic financial, tax & corporate advisory.",
  "professional-2": "Commercial legal practice & regulatory compliance.",
  "professional-3": "Award-winning architectural & interior studio.",
  "home-services-1": "Complete residential upkeep & annual maintenance.",
  "home-services-2": "Hospital-grade deep sanitization & cleaning.",
  "home-services-3": "Smart home automation, HVAC & electrical repairs.",
  "travel-1": "Bespoke global luxury & private jet expeditions.",
  "travel-2": "Guided wilderness & high-altitude mountain treks.",
  "travel-3": "Curated cultural tours & heritage palace circuits.",
  "event-1": "Unforgettable royal destination weddings.",
  "event-2": "Seamless corporate summits, AV & keynotes.",
  "event-3": "Private milestone galas & curated soirees.",
  "portfolio-1": "Visual storytelling & editorial fashion photography.",
  "portfolio-2": "Digital product design, UX & brand identity.",
  "portfolio-3": "Creative direction & 3D motion aesthetics.",
  "ecommerce-1": "Slow living essentials & handmade stoneware.",
  "ecommerce-2": "Organic ethical apparel & sustainable fashion.",
  "ecommerce-3": "Artisan gourmet provisions & single-origin pantry.",
  "manufacturing-1": "Industrial CNC machining & aerospace precision.",
  "manufacturing-2": "Custom sheet metal & rapid robotic fabrication.",
  "manufacturing-3": "Scalable sustainable packaging solutions.",
  "ngo-1": "Grassroots community empowerment initiatives.",
  "ngo-2": "Equal access to rural education & digital tablets.",
  "ngo-3": "Wildlife conservation & clean energy action.",
  "logistics-1": "Nationwide multimodal freight & supply chain.",
  "logistics-2": "Temperature-controlled smart warehouse fulfillment.",
  "logistics-3": "Cross-border global air & ocean freight forwarding.",
};

export const industryOfferings: Record<string, [string, string, string, string][]> = {
  medico: [
    [
      "Executive Health Screening",
      "Comprehensive metabolic profiling, 3D cardiac echocardiogram, pulmonary function testing, and senior consultant review.",
      "Preventive Care",
      "₹4,500",
    ],
    [
      "Advanced Intraoral Dentistry",
      "Digital smile design, painless laser root canal therapy, and biocompatible zirconium crowns.",
      "Dentistry",
      "From ₹3,500",
    ],
    [
      "Specialist Outpatient Consultation",
      "In-depth clinical evaluation with board-certified chiefs of cardiology, neurology, orthopaedics, or dermatology.",
      "Consultation",
      "₹1,200",
    ],
  ],
  institute: [
    [
      "JEE & NEET Advanced Classroom Program",
      "Comprehensive 2-year curriculum with daily test series, AI weakness analytics, and 1-on-1 faculty doubt clearing.",
      "Competitive Exams",
      "₹1,25,000 / yr",
    ],
    [
      "Foundation STEM & Olympiad Academy",
      "Conceptual mastery in mathematics and science for classes 8–10, cultivating logical reasoning and Olympiad readiness.",
      "Foundation",
      "₹65,000 / yr",
    ],
    [
      "Full-Stack Web Development Bootcamp",
      "24-week immersive live project training in TypeScript, React, Next.js, databases, and production cloud architectures.",
      "Tech Skills",
      "₹45,000",
    ],
  ],
  "real-estate": [
    [
      "The Reserve Sky Penthouses",
      "Ultra-luxury 4 & 5 BHK residences with double-height living rooms, private lap pools, and panoramic skyline vistas.",
      "Residential",
      "From ₹4.2 Cr",
    ],
    [
      "Signature Commercial Central",
      "LEED Platinum Grade-A office suites and premium retail frontage in the prime commercial district.",
      "Commercial",
      "From ₹1.8 Cr",
    ],
    [
      "The Meadows Plotted Sanctuary",
      "Gated plotted community with subterranean power lines, private clubhouse, and 40% dedicated green parks.",
      "Plotted Land",
      "From ₹95 Lac",
    ],
  ],
  restaurant: [
    [
      "Seasonal 7-Course Degustation",
      "Curated culinary narrative celebrating locally sourced organic produce, artisanal breads, and house botanicals.",
      "Tasting Menu",
      "₹3,200 / person",
    ],
    [
      "Wood-Fired Sourdough Pizzas",
      "Naturally fermented 48-hour slow-rise dough baked in our volcanic stone oven with imported San Marzano tomatoes.",
      "Kitchen",
      "From ₹680",
    ],
    [
      "Artisan Single-Origin Cold Brews & Pastries",
      "Cold extracted micro-lot coffees paired with flaky butter croissants and Valrhona dark chocolate entremets.",
      "Café & Bakery",
      "From ₹280",
    ],
  ],
  "local-business": [
    [
      "Handcrafted 18K Diamond Solitaire",
      "BIS-hallmarked natural conflict-free diamonds set in bespoke handcrafted rose gold and platinum bands.",
      "Fine Jewellery",
      "₹48,000",
    ],
    [
      "Pure Kanjeevaram Silk Couture",
      "Master-artisan handwoven pure mulberry silks with certified gold and silver zari border craftsmanship.",
      "Bridal Couture",
      "₹24,500",
    ],
    [
      "Solid Burma Teak Credenza",
      "Reclaimed solid teakwood mid-century credenza featuring soft-close German brass hardware and hand-rubbed oil.",
      "Furniture",
      "₹36,000",
    ],
  ],
  salon: [
    [
      "Couture Balayage & Bond Therapy",
      "Personalised hand-painted colour contouring, Olaplex restructuring treatment, and signature styling blowout.",
      "Hair Design",
      "₹6,500",
    ],
    [
      "Hydra-Dermal Oxygen Facial",
      "Deep ultrasonic pore extraction, botanical peptide infusion, and therapeutic LED light regeneration.",
      "Clinical Skin",
      "₹3,800",
    ],
    [
      "Organic Ayurvedic Body Ritual",
      "90-minute therapeutic massage using cold-pressed dosha-specific herbal oils followed by a restorative herbal steam.",
      "Spa Therapy",
      "₹3,200",
    ],
  ],
  gym: [
    [
      "All-Access Performance Membership",
      "Unlimited training floor access, biometric functional movement screen, and unlimited group studio sessions.",
      "Memberships",
      "₹3,500 / mo",
    ],
    [
      "1-on-1 Biomechanical Personal Training",
      "Custom periodised strength development, posture correction, and metabolic nutrition tracking with senior coaches.",
      "Personal Coaching",
      "₹18,000 / 12 sessions",
    ],
    [
      "Reformer Pilates & Sound Bath Pass",
      "Small-group reformer pilates classes focusing on core alignment, accompanied by weekly restorative sound baths.",
      "Studio Classes",
      "₹4,800 / mo",
    ],
  ],
  hotel: [
    [
      "Colonial Royal Suite",
      "Spacious 900 sq ft heritage suite featuring antique four-poster bedding, marble soak bath, and personal butler service.",
      "Suites",
      "₹16,500 / night",
    ],
    [
      "Secluded Garden Pool Villa",
      "Private detached villa surrounded by lush landscaped foliage with temperature-controlled outdoor plunge pool.",
      "Villas",
      "₹28,000 / night",
    ],
    [
      "Executive Skyline Deluxe",
      "High-floor modern king room equipped with ergonomic Herman Miller workstation, high-speed fiber, and lounge privileges.",
      "Rooms",
      "₹8,500 / night",
    ],
  ],
  automobile: [
    [
      "Certified Pre-Owned Luxury Sedans",
      "150-point certified executive sedans with documented maintenance records, fresh service, and 24-month warranty.",
      "Showroom",
      "From ₹28.5 Lac",
    ],
    [
      "Master Diagnostic & Performance Tune",
      "Comprehensive OEM-level computer diagnosis, full synthetic fluid flush, and performance suspension calibration.",
      "Workshop",
      "From ₹12,500",
    ],
    [
      "9H Ceramic Coating & Paint Shield",
      "Multi-stage machine paint correction followed by 9H permanent nano-ceramic coating and hydrophobic glass shield.",
      "Detailing",
      "From ₹35,000",
    ],
  ],
  professional: [
    [
      "Virtual CFO & Growth Strategy",
      "Institutional financial modelling, cash-flow forecasting, cap-table advisory, and monthly board reporting packs.",
      "Financial Advisory",
      "₹45,000 / mo",
    ],
    [
      "Commercial Corporate Legal Counsel",
      "Founders agreements, contract vetting, trademark/patent protection, and regulatory compliance advisory.",
      "Legal Advisory",
      "From ₹25,000",
    ],
    [
      "Comprehensive Architectural Masterplan",
      "Turnkey architectural design, 3D photorealistic BIM modelling, sustainable MEP integration, and contractor supervision.",
      "Architecture",
      "Custom proposal",
    ],
  ],
  "home-services": [
    [
      "Annual Total Home Maintenance Plan",
      "Quarterly preventive inspections for electrical, plumbing, water purification, and HVAC systems with 2-hour emergency response.",
      "Annual Contract",
      "₹12,000 / yr",
    ],
    [
      "Hospital-Grade Full Home Sanitization",
      "Industrial HEPA filtration, high-pressure steam sanitization of kitchen and bathrooms, and anti-allergen mattress extraction.",
      "Deep Cleaning",
      "₹4,500",
    ],
    [
      "Smart Climate & Automated Lighting Setup",
      "Installation of smart IoT thermostats, motion-triggered ambient lighting, and electrical surge suppression units.",
      "Smart Installation",
      "From ₹6,500",
    ],
  ],
  travel: [
    [
      "Himalayan High Passes Expedition",
      "12-day guided small-group trek exploring ancient monasteries and alpine ridges with private logistical support.",
      "Expeditions",
      "₹54,000 / person",
    ],
    [
      "Private Solar Houseboat Voyage",
      "3-night tranquil cruise through the serene backwaters of Vembanad with private chef and artisanal Kerala cuisine.",
      "Bespoke Journeys",
      "₹42,000",
    ],
    [
      "Royal Forts & Palaces of Rajasthan",
      "8-day curated luxury circuit residing in authentic royal palaces with private chauffeured transport and palace historians.",
      "Heritage Circuits",
      "₹88,000",
    ],
  ],
  event: [
    [
      "Bespoke Royal Destination Wedding",
      "Complete multi-day celebration management: venue curation, stage architecture, floral installations, and guest concierge.",
      "Weddings",
      "Custom proposal",
    ],
    [
      "Global Leadership Summit & Conference",
      "Turnkey corporate symposium production, state-of-the-art audiovisual broadcasting, and executive catering.",
      "Corporate",
      "From ₹2,80,000",
    ],
    [
      "Private Milestone Gala & Soirée",
      "Thematic venue transformation, bespoke mixology bars, and private musical performances for intimate milestones.",
      "Private Celebrations",
      "From ₹95,000",
    ],
  ],
  portfolio: [
    [
      "Commercial Campaign & Lookbook Shoot",
      "Art direction, high-fashion location lighting, commercial styling, and high-end editorial retouching.",
      "Photography",
      "From ₹40,000 / day",
    ],
    [
      "Design System & Digital Product UX",
      "End-to-end Figma design systems, accessible UI components, interactive prototypes, and developer handoff documentation.",
      "Digital Design",
      "From ₹65,000",
    ],
    [
      "Brand Identity & Visual Narrative",
      "Strategic visual positioning, bespoke wordmark typography, colour architecture, and physical packaging design.",
      "Branding",
      "From ₹50,000",
    ],
  ],
  ecommerce: [
    [
      "Artisan Stoneware 16-Piece Dining Set",
      "Hand-thrown matte basalt ceramic dinnerware, microwave and dishwasher safe, crafted by local heritage potters.",
      "Home Living",
      "₹8,500",
    ],
    [
      "GOTS Certified Organic Heavyweight Shirt",
      "100% long-staple organic cotton relaxed overshirt with natural horn buttons and reinforced French seams.",
      "Sustainable Apparel",
      "₹4,200",
    ],
    [
      "Wild Himalayan Forest Honey & Saffron",
      "Raw unpasteurised multi-flora forest honey infused with certified Grade-1 Kashmiri saffron strands.",
      "Gourmet Pantry",
      "₹1,950",
    ],
  ],
  manufacturing: [
    [
      "5-Axis CNC Precision Machined Components",
      "Sub-micron tolerance engineering components in aerospace-grade aluminum, titanium, and medical stainless steel.",
      "Precision Machining",
      "Engineered to spec",
    ],
    [
      "Automated Fiber Laser Sheet Fabrication",
      "Rapid prototyping and volume production of industrial metal enclosures, brackets, and structural frames.",
      "Fabrication",
      "Volume quotes",
    ],
    [
      "Heavy-Duty Biodegradable Industrial Packaging",
      "Custom engineered 5-ply corrugated shipping cartons, moulded pulp protective inserts, and moisture-barrier liners.",
      "Packaging",
      "Direct contract",
    ],
  ],
  ngo: [
    [
      "Rural STEM Scholars Initiative",
      "Underwriting full annual tuition, digital learning tablets, and science laboratory kits for 100 rural girl scholars.",
      "Education",
      "₹15,000 / scholar",
    ],
    [
      "Solar Clean Water Community Kiosks",
      "Deploying solar-powered multi-stage filtration water plants delivering safe drinking water to remote villages.",
      "Clean Water",
      "₹85,000 / kiosk",
    ],
    [
      "Indigenous Biodiversity Afforestation",
      "Planting, fencing, and maintaining native saplings to restore degraded water tables and local forest ecosystems.",
      "Ecology",
      "₹1,000 / 5 trees",
    ],
  ],
  logistics: [
    [
      "Interstate Full Truckload (FTL) Express",
      "GPS-monitored fleet delivery across all major national economic corridors with guaranteed on-time transit windows.",
      "Surface Transport",
      "From ₹18,000 / trip",
    ],
    [
      "Smart Temperature-Controlled Storage",
      "Automated multi-temperature zones (-20°C to +15°C) with real-time IoT humidity tracking and barcode API dispatch.",
      "Cold Chain",
      "From ₹28 / sq ft",
    ],
    [
      "Global Air & Ocean Freight Forwarding",
      "End-to-end international customs clearance, bonded port warehousing, and multimodal air/ocean freight coordination.",
      "International Freight",
      "Custom tariff",
    ],
  ],
};

export const industryTeams: Record<string, [string, string, string][]> = {
  medico: [
    [
      "Dr. Rajesh Sharma, MD (AIIMS)",
      "Chief Medical Officer & Senior Cardiologist with over 18 years of interventional cardiology experience.",
      "Cardiology",
    ],
    [
      "Dr. Ananya Iyer, MDS",
      "Director of Aesthetic Dentistry, specialising in digital smile design and restorative dental aesthetics.",
      "Aesthetic Dentistry",
    ],
    [
      "Dr. Kabir Mehta, MS (Ortho)",
      "Senior Consultant Orthopaedic Surgeon focused on joint replacement and sports rehabilitation.",
      "Orthopaedics",
    ],
  ],
  institute: [
    [
      "Prof. Arvind Raman, Ph.D. (IIT Delhi)",
      "Academic Director and Lead Physics Faculty, mentor to over 250 top-100 JEE Advanced rankers.",
      "Physics Faculty",
    ],
    [
      "Dr. Sunita Deshmukh, Ph.D.",
      "Head of Chemistry & Olympiad Training with 15+ years of pedagogical leadership.",
      "Chemistry Faculty",
    ],
    [
      "Vikramaditya Sen, M.Tech (IIT Bombay)",
      "Head of Engineering Foundations and Lead Coding Curriculum Architect.",
      "Computer Science",
    ],
  ],
  "real-estate": [
    [
      "Vikramaditya Singhania",
      "Managing Director with two decades of luxury real estate advisory across metropolitan micro-markets.",
      "Leadership",
    ],
    [
      "Meera Merchant",
      "Principal Architect & Urban Planner, overseeing luxury residential design and green building compliance.",
      "Architecture & Design",
    ],
    [
      "Rohan Chawla",
      "Vice President of Commercial Leasing, specialising in institutional Grade-A transactions.",
      "Commercial Leasing",
    ],
  ],
  salon: [
    [
      "Laurent Dubois",
      "Creative Director & Master Stylist, trained in Paris with 14 years of editorial runway experience.",
      "Creative Hair Director",
    ],
    [
      "Ritu Bhasin",
      "Senior Aesthetic Dermatologist & Skin Consultant, expert in non-invasive clinical facial rejuvenation.",
      "Aesthetics",
    ],
    [
      "Maya Thapa",
      "Lead Ayurvedic Therapist with master certification in holistic marma therapy and reflexology.",
      "Spa & Wellness",
    ],
  ],
  gym: [
    [
      "Marcus Vance, CSCS",
      "Head of Athletic Performance and Strength Conditioning, former national decathlon trainer.",
      "Head Strength Coach",
    ],
    [
      "Priya Nair, E-RYT 500",
      "Lead Yoga Acharya & Reformer Pilates Master Instructor with international certification.",
      "Yoga & Pilates",
    ],
    [
      "Devraj Roy",
      "Sports Nutritionist & Functional Movement Specialist, focused on body composition transformation.",
      "Sports Nutrition",
    ],
  ],
  professional: [
    [
      "Naveen K. Kapoor, FCA",
      "Senior Managing Partner with 22 years of corporate tax, M&A restructuring, and audit leadership.",
      "Financial Practice",
    ],
    [
      "Adv. Sanjana Rao, LL.M. (Columbia)",
      "Head of Commercial Litigation & Corporate Governance, trusted advisor to leading Indian startups.",
      "Legal Practice",
    ],
    [
      "Sameer Merchant, AIA",
      "Principal Architect and Design Lead, recipient of national awards for sustainable commercial architecture.",
      "Architectural Practice",
    ],
  ],
  event: [
    [
      "Natasha Godrej",
      "Founder & Executive Creative Director, architect of landmark royal weddings across Udaipur and Jaipur.",
      "Wedding Design",
    ],
    [
      "Karan Oberoi",
      "Head of Technical Production, managing arena-scale audiovisuals, lighting, and global telecasts.",
      "Technical Direction",
    ],
    [
      "Zoya Merchant",
      "Director of Guest Hospitality & Concierge, ensuring seamless five-star experiences for 1,000+ attendees.",
      "Guest Concierge",
    ],
  ],
  ngo: [
    [
      "Dr. Aruna Swaminathan",
      "Executive Trustee & Social Scientist, championing educational equity and grassroots governance.",
      "Trustee & Director",
    ],
    [
      "Manoj Prabhakar",
      "Director of Field Programs, managing rural water initiatives and community infrastructure across 4 states.",
      "Field Operations",
    ],
    [
      "Sneha Murthy",
      "Head of Environmental Research, leading reforestation projects and biodiversity assessment.",
      "Conservation Science",
    ],
  ],
};

export const industryFaqs: Record<string, [string, string][]> = {
  medico: [
    [
      "Do you support cashless health insurance claims?",
      "Yes. Our hospital desk has direct empannelment with major insurance providers and TPAs for seamless cashless hospitalisation and reimbursement documentation.",
    ],
    [
      "How can I book a priority specialist consultation?",
      "You can submit an enquiry online or call our priority concierge desk. Confirmed slots are notified via WhatsApp and SMS within 30 minutes.",
    ],
    [
      "What should I bring for my diagnostic health checkup?",
      "Please arrive after 10–12 hours of overnight fasting. Carry past medical summaries and current prescription medications.",
    ],
  ],
  institute: [
    [
      "What is the admission and batch selection criteria?",
      "Admission to our flagship programs involves a scholarship screening assessment to gauge foundational conceptual clarity, followed by a faculty interaction.",
    ],
    [
      "Are recorded classes and study materials included?",
      "Yes. Every enrolled student receives access to our student portal with recorded HD lectures, curated printed revision modules, and daily practice papers.",
    ],
    [
      "What is the student-to-faculty ratio in classrooms?",
      "We cap batches at 35 students to guarantee individual attention, rigorous weekly doubt sessions, and periodic mentor evaluations.",
    ],
  ],
  "real-estate": [
    [
      "Can I schedule a private on-site inspection?",
      "Yes. Our advisory team coordinates chauffeured site visits and walkthroughs of model residences 7 days a week.",
    ],
    [
      "Are all residential and commercial properties RERA registered?",
      "Every single property in our portfolio is 100% RERA compliant with clear legal titles and approved architectural sanctions.",
    ],
    [
      "Do you provide home loan and financial advisory support?",
      "We partner with leading financial institutions to facilitate preferential interest rates and fast-track loan processing.",
    ],
  ],
  restaurant: [
    [
      "How far in advance should I reserve a table?",
      "We recommend booking 2 to 3 days in advance for weekend dinners and tasting menus. Walk-in guests are welcomed based on dining room availability.",
    ],
    [
      "Do you cater to specific dietary requirements or allergies?",
      "Yes. Our chefs take pride in tailoring both vegetarian and gluten-sensitive menus. Please mention dietary preferences during your reservation.",
    ],
    [
      "Do you host private celebrations and corporate dinners?",
      "Our mezzanine dining room is available for private gatherings of up to 40 guests with personalised bespoke menus.",
    ],
  ],
  "local-business": [
    [
      "Are precious metals and gemstones hallmarked?",
      "Every piece of gold and silver jewellery is 100% BIS hallmarked, accompanied by independent gemological laboratory certificates for natural diamonds.",
    ],
    [
      "Do you offer pan-India insured shipping?",
      "Yes. All online orders are dispatched in tamper-evident security packaging with 100% transit insurance.",
    ],
    [
      "Can I request customised sizing or bespoke finishes?",
      "Our artisans work directly with patrons for custom jewellery sizing, fabric selections, and furniture timber finishes.",
    ],
  ],
  salon: [
    [
      "Is an initial consultation required before hair colouring?",
      "We offer a complimentary 15-minute consultation to examine hair texture, recommend complementary palettes, and conduct skin patch tests.",
    ],
    [
      "What hygiene and sanitation protocols do you maintain?",
      "All metallic tools undergo hospital-grade autoclave sterilization between clients, and single-use disposable capes and linens are standard.",
    ],
    [
      "Can I reschedule or cancel my booking?",
      "Appointments can be rescheduled without penalty up to 4 hours prior to the scheduled service time.",
    ],
  ],
  gym: [
    [
      "Can I book a complimentary trial workout session?",
      "Yes. Prospective members are invited to book a complimentary 1-day pass including a body composition analysis with a senior trainer.",
    ],
    [
      "Are lockers, steam rooms, and shower facilities provided?",
      "Our facilities feature executive locker rooms, hot water rain showers, steam chambers, and fresh towel service.",
    ],
    [
      "Do memberships include nutrition consultation?",
      "All annual memberships include a monthly consultation with our in-house certified sports nutritionist.",
    ],
  ],
  hotel: [
    [
      "What are the standard check-in and check-out timings?",
      "Standard check-in begins at 2:00 PM and check-out is at 11:00 AM. Early check-in and late departures are accommodated upon request.",
    ],
    [
      "Do you arrange airport transfers and local sightseeing?",
      "Our concierge operates private executive chauffeurs for airport pickups, heritage city tours, and safari excursions.",
    ],
    [
      "Is breakfast included in the room tariffs?",
      "All suites and villas include a gourmet artisanal breakfast served at our garden restaurant or in-villa.",
    ],
  ],
  automobile: [
    [
      "What inspection standards do certified pre-owned vehicles meet?",
      "Every vehicle undergoes a rigorous 150-point diagnostic inspection covering chassis integrity, engine compression, and electronic modules.",
    ],
    [
      "Do you accept vehicle trade-ins and exchanges?",
      "Yes. We offer transparent on-the-spot vehicle evaluations and instant trade-in value adjustments against showroom purchases.",
    ],
    [
      "How long does ceramic coating application take?",
      "Full paint correction and multi-layer nano-ceramic application requires 48 to 72 hours for proper curing.",
    ],
  ],
  professional: [
    [
      "How do we begin a professional advisory engagement?",
      "We begin with a confidential discovery meeting to assess operational requirements, followed by a formal scope proposal within 48 hours.",
    ],
    [
      "Do you offer fixed retainer packages or hourly billing?",
      "We offer predictable monthly retainer models as well as milestone-based project fees with transparent deliverables.",
    ],
    [
      "How is client data confidentiality protected?",
      "All engagements are backed by rigorous bilateral non-disclosure agreements (NDAs) and enterprise encrypted document vaults.",
    ],
  ],
  "home-services": [
    [
      "Are all service technicians background-verified?",
      "Yes. Every technician is police verified, full-time employed, and trained to rigorous quality and safety standards.",
    ],
    [
      "What happens if an issue re-occurs after repair?",
      "We offer a 30-day no-questions-asked warranty on all repair workmanship and replacement parts.",
    ],
    [
      "What payment methods do you accept for home services?",
      "You can pay conveniently via UPI, credit/debit cards, or net banking after the service is completed to your satisfaction.",
    ],
  ],
  travel: [
    [
      "Are your international and domestic itineraries customizable?",
      "Every itinerary is 100% tailor-made to your pacing, preferred luxury accommodation level, and culinary interests.",
    ],
    [
      "What emergency support is available during travels?",
      "Our dedicated 24/7 concierge desk remains in real-time communication with you and local ground coordinators throughout your trip.",
    ],
    [
      "Do you assist with travel visas and mandatory insurance?",
      "Our documentation specialists manage end-to-end visa paperwork, biometric scheduling, and comprehensive global travel insurance.",
    ],
  ],
  event: [
    [
      "How early should we initiate event planning?",
      "For destination weddings, 6 to 9 months is ideal. For corporate conferences and summits, we recommend 8 to 12 weeks of lead time.",
    ],
    [
      "Do you manage venue contracting and government permissions?",
      "We handle all venue negotiations, acoustic sound permits, safety compliance, and municipal liaison on your behalf.",
    ],
    [
      "Will we have a dedicated on-site event coordinator?",
      "A senior event director and logistical team remain on-ground throughout setup, event execution, and post-event packdown.",
    ],
  ],
  portfolio: [
    [
      "What is your standard turnaround for project deliverables?",
      "Brand identity systems typically require 4 to 6 weeks. Photography lookbooks are delivered within 10 business days of the shoot.",
    ],
    [
      "Do you deliver raw source files and commercial usage rights?",
      "Yes. Final handover includes full production assets, vector sources, high-resolution masters, and perpetual commercial usage licenses.",
    ],
    [
      "Can we commission projects on a milestone basis?",
      "Yes. Projects are structured across staged milestones with clear client sign-offs at each discovery and design phase.",
    ],
  ],
  ecommerce: [
    [
      "What is your return and exchange policy?",
      "We offer a seamless 7-day return window for unused items in original packaging, with doorstep reverse pickup.",
    ],
    [
      "Are your products ethically sourced and eco-packaged?",
      "Every product is sourced directly from ethical cooperatives and packaged in 100% plastic-free compostable materials.",
    ],
    [
      "How can I track the transit status of my order?",
      "As soon as your package is dispatched, an automated tracking link is shared via WhatsApp and email for real-time tracking.",
    ],
  ],
  manufacturing: [
    [
      "What material certifications and test reports do you supply?",
      "Every production run is accompanied by raw material mill test reports (MTR), CMM dimensional inspection logs, and certificate of conformance (CoC).",
    ],
    [
      "What are your typical minimum order quantities (MOQ)?",
      "We support pilot rapid-prototyping runs of 10–50 units as well as mass-production runs exceeding 50,000 units.",
    ],
    [
      "Can you manufacture directly from our CAD models?",
      "Our engineering team imports all standard 3D formats (STEP, IGES, SolidWorks) and provides design-for-manufacturing (DFM) feedback.",
    ],
  ],
  ngo: [
    [
      "Are donations eligible for tax exemption certificates?",
      "Yes. All monetary contributions are eligible for 50% tax exemption under Section 80G, with instant digital receipts generated.",
    ],
    [
      "How do you ensure transparency in fund utilisation?",
      "We publish audited financial balance sheets annually and issue project milestone impact reports directly to donor patrons.",
    ],
    [
      "Can our corporate organisation partner for CSR projects?",
      "We structure measurable, audit-compliant CSR initiatives aligned with Schedule VII of the Companies Act.",
    ],
  ],
  logistics: [
    [
      "How do you provide real-time shipment visibility?",
      "Our GPS-tracked fleet and smart warehouses integrate via REST APIs to provide continuous location updates and delivery ETA alerts.",
    ],
    [
      "What temperature ranges are supported in cold-chain logistics?",
      "We maintain multi-temperature zones ranging from deep freeze (-25°C) to chilled (+2°C to +8°C) and controlled ambient (+15°C to +25°C).",
    ],
    [
      "Do you provide comprehensive transit insurance coverage?",
      "All consignments can be insured through our cargo underwriting partners against loss, theft, or accidental transit damage.",
    ],
  ],
};

export const industryHours: Record<string, [string, string][]> = {
  medico: [
    ["Outpatient Consultations", "Monday – Saturday: 08:30 AM – 08:00 PM"],
    ["Emergency & Trauma", "Open 24 Hours / 7 Days a Week"],
  ],
  institute: [
    ["Academic Sessions", "Monday – Friday: 08:00 AM – 07:30 PM"],
    [
      "Weekend Doubt Clearing & Mock Tests",
      "Saturday – Sunday: 09:00 AM – 05:00 PM",
    ],
  ],
  "real-estate": [
    ["Site Walkthroughs & Gallery", "Monday – Saturday: 09:30 AM – 06:30 PM"],
    [
      "Weekend Consultations",
      "Sunday: 10:00 AM – 05:00 PM (Prior Appointment)",
    ],
  ],
  restaurant: [
    ["Lunch & Afternoon Service", "Tuesday – Sunday: 12:00 PM – 03:30 PM"],
    [
      "Dinner & Tasting Room",
      "Tuesday – Sunday: 07:00 PM – 11:30 PM (Mondays Closed)",
    ],
  ],
  "local-business": [
    ["Retail Showroom", "Monday – Saturday: 10:30 AM – 08:30 PM"],
    ["Sunday Curated Shopping", "Sunday: 11:00 AM – 06:00 PM"],
  ],
  salon: [
    ["Hair & Aesthetics Studio", "Tuesday – Sunday: 10:00 AM – 08:30 PM"],
    ["Spa Therapies", "Tuesday – Sunday: 10:30 AM – 08:00 PM (Mondays Closed)"],
  ],
  gym: [
    ["Gym Floor & Cardio Deck", "Monday – Saturday: 05:30 AM – 10:30 PM"],
    ["Sunday Recovery & Open Floor", "Sunday: 07:00 AM – 02:00 PM"],
  ],
  hotel: [
    ["Front Desk & Concierge", "Open 24 Hours / 7 Days a Week"],
    ["Dining & Room Service", "Daily: 06:30 AM – 11:00 PM"],
  ],
  automobile: [
    ["Showroom Enquiries", "Monday – Saturday: 09:30 AM – 07:30 PM"],
    [
      "Master Workshop & Service Bay",
      "Monday – Saturday: 08:30 AM – 06:30 PM (Sundays Closed)",
    ],
  ],
  professional: [
    ["Corporate Advisory Offices", "Monday – Friday: 09:00 AM – 06:30 PM"],
    [
      "Client Strategy Consultations",
      "Saturday: 10:00 AM – 02:00 PM (By Appointment)",
    ],
  ],
  "home-services": [
    ["Customer Care & Booking", "Monday – Saturday: 08:00 AM – 08:00 PM"],
    ["Emergency Repair Dispatch", "24/7 Priority Emergency Support"],
  ],
  travel: [
    ["Bespoke Travel Planning", "Monday – Friday: 09:30 AM – 06:30 PM"],
    ["24/7 Traveller Ground Concierge", "Active 24/7 for On-Tour Patrons"],
  ],
  event: [
    ["Design Studio & Client Consults", "Monday – Friday: 10:00 AM – 06:30 PM"],
    [
      "Production & Weekend Execution",
      "Active On-Site 24/7 During Event Dates",
    ],
  ],
  portfolio: [
    ["Studio Hours & Production", "Monday – Friday: 09:30 AM – 06:30 PM"],
    ["Shoots & Design Sprints", "Weekends by Project Commission"],
  ],
  ecommerce: [
    ["Online Store Order Processing", "Monday – Saturday: 09:00 AM – 06:00 PM"],
    ["Customer Support Desk", "Monday – Saturday: 09:30 AM – 07:00 PM"],
  ],
  manufacturing: [
    [
      "Industrial Plant Operations",
      "Monday – Saturday: 08:00 AM – 08:00 PM (Two Shifts)",
    ],
    ["Sales & Technical Logistics", "Monday – Friday: 09:00 AM – 06:00 PM"],
  ],
  ngo: [
    ["Foundation Community Centre", "Monday – Friday: 09:00 AM – 05:30 PM"],
    ["Field Volunteer Programs", "Saturday – Sunday: 08:30 AM – 02:30 PM"],
  ],
  logistics: [
    ["Fleet Operations & Dispatch", "Open 24 Hours / 7 Days a Week"],
    ["Customer Support & Booking", "Monday – Saturday: 08:00 AM – 08:00 PM"],
  ],
};

export const industryAboutText: Record<string, string> = {
  medico:
    "Committed to clinical excellence and patient-first care, integrating advanced diagnostic technologies, multidisciplinary specialists, and compassionate treatment standards.",
  institute:
    "Empowering the next generation of leaders and scholars through rigorous conceptual pedagogy, personalized faculty mentorship, and state-of-the-art academic frameworks.",
  "real-estate":
    "Curating ultra-prime residential and commercial real estate assets, connecting discerning patrons with exceptional architectural spaces and transparent transactional advisory.",
  restaurant:
    "Celebrating the craft of authentic hospitality, bringing people together over honest seasonal produce, masterfully wood-fired delicacies, and unforgettable dining memories.",
  "local-business":
    "Honouring traditional Indian craftsmanship and quality retail, delivering hallmarked fine jewellery, artisanal couture, and curated home objects designed to endure.",
  salon:
    "A refined destination for high-fashion hair styling, advanced non-invasive skin aesthetics, and therapeutic wellness rituals crafted to rejuvenate mind and body.",
  gym:
    "Inspiring athletic performance and holistic strength through evidence-based biomechanical coaching, state-of-the-art facilities, and an empowering fitness community.",
  hotel:
    "Offering thoughtful luxury and timeless hospitality, turning world-class destinations into warm, memorable sanctuaries for discerning travellers.",
  automobile:
    "Delivering precision automotive excellence, certified pre-owned luxury mobility, and master-level diagnostic workshop services backed by transparent integrity.",
  professional:
    "Providing strategic clarity and corporate advisory for forward-thinking enterprises, spanning comprehensive financial modelling, commercial legal counsel, and sustainable architecture.",
  "home-services":
    "Ensuring complete peace of mind for modern homeowners through vetted, hospital-grade cleaning, electrical maintenance, and preventative property upkeep.",
  travel:
    "Crafting deeply immersive, bespoke travel itineraries that explore remote cultures, untouched wilderness, and unforgettable heritage landscapes with seamless concierge support.",
  event:
    "Transforming milestone celebrations and corporate summits into awe-inspiring occasions through innovative production architecture, emotive design, and flawless execution.",
  portfolio:
    "Pursuing visual distinction and digital innovation, crafting commercial photographic narratives, accessible user experiences, and enduring brand identities.",
  ecommerce:
    "Curating considered everyday goods crafted with integrity, sustainable materials, and timeless aesthetic beauty for mindful modern living.",
  manufacturing:
    "Pioneering high-precision manufacturing, 5-axis CNC machining, and automated sheet metal fabrication built for critical industrial and aerospace applications.",
  ngo:
    "Mobilising compassionate community action, clean water access, and educational scholarships to foster sustainable grassroots development and environmental harmony.",
  logistics:
    "Connecting global supply chains with speed, safety, and precision through nationwide multimodal transport, smart cold storage, and express freight forwarding.",
};

const blankItem = (title: string, text: string, image = ""): SectionItem => ({
  id: crypto.randomUUID(),
  title,
  text,
  price: "",
  category: "",
  image,
  link: "",
});

export function makeSection(
  kind: Section["kind"],
  heading: string,
  image = "",
): Section {
  return {
    id: crypto.randomUUID(),
    kind,
    heading,
    description:
      "Detailed offerings and information tailored for this business.",
    visible: true,
    ctaLabel: "",
    ctaLink: "",
    items:
      kind === "faq"
        ? [
            blankItem(
              "How can I make an enquiry?",
              "Use the enquiry form below or click the WhatsApp button to connect directly with our team.",
            ),
            blankItem(
              "What is your standard project turnaround?",
              "Standard deliverables are completed within 5 to 14 business days depending on chosen scope.",
            ),
          ]
        : kind === "hours"
          ? [
              blankItem("Monday – Friday", "09:00 AM – 06:30 PM"),
              blankItem("Saturday – Sunday", "By Appointment"),
            ]
          : kind === "gallery"
            ? [
                blankItem(
                  "A closer look",
                  "Architectural and ambient photography",
                  image,
                ),
              ]
            : kind === "team" || kind === "testimonials"
              ? []
              : kind === "about" || kind === "contact"
                ? []
                : [
                    blankItem(
                      "Executive Offering",
                      "Bespoke consultation and strategic implementation for discerning clients.",
                      image,
                    ),
                    blankItem(
                      "Core Service Package",
                      "Full-service delivery with end-to-end quality assurance and support.",
                      image,
                    ),
                    blankItem(
                      "Priority Support",
                      "Dedicated SLA monitoring and post-delivery maintenance coverage.",
                      image,
                    ),
                  ],
  };
}

export function createDemo(templateId: string, businessName: string): Demo {
  const t = getTemplate(templateId);
  if (!t) throw new Error("Template not found");
  const industry = getIndustry(t.industry)!;
  const now = new Date().toISOString();
  const headline =
    templateHeadlines[t.id] ||
    industryHeadings[industry.id] ||
    "Thoughtfully made. For you.";
  const aboutText = industryAboutText[industry.id] || industry.description;

  const d: Demo = {
    id: crypto.randomUUID(),
    businessName,
    slug: slugify(businessName),
    industry: industry.id,
    templateId,
    status: "draft",
    createdAt: now,
    updatedAt: now,
    revision: 1,
    notes: "",
    business: {
      tagline: industry.eyebrow,
      description: aboutText,
      category: t.specialty,
      logo: "",
      favicon: "",
    },
    contact: {
      phone: "+91 9241619573",
      whatsapp: "+91 9241619573",
      whatsappMessage: `Hello, I would like to enquire about ${t.specialty} services.`,
      email: "contact@thekittycorp.com",
      address:
        "Suite 402, Signature Commercial Hub, Central Business District",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      maps: "https://maps.google.com",
      instagram: "https://instagram.com/kittycorp",
      facebook: "https://facebook.com/kittycorp",
      linkedin: "https://linkedin.com/company/thekittycorp",
    },
    hero: {
      heading: headline,
      description: industry.description,
      image: t.image,
      ctaLabel: industry.cta,
      ctaLink: "#enquire",
    },
    design: {
      primary: t.color,
      secondary: "#f3efe7",
      accent: "#d4c3a5",
      font: t.font,
      theme: industry.id === "gym" ? "dark" : "light",
      buttonStyle: "soft",
      layout: t.layout,
    },
    seo: {
      title: `${businessName} — ${t.specialty}`,
      description: `Explore this ${t.specialty.toLowerCase()} digital showcase curated by KITTY CORP.`,
      ogImage: t.image,
      canonical: "",
      noindex: true,
    },
    settings: { expiresAt: "", passwordHash: "", showDemoLabel: true },
    sections: [
      makeSection("about", "A little about us", t.image),
      ...industry.sections.map(([kind, h]) => makeSection(kind, h, t.image)),
      makeSection("contact", "Let’s start a conversation"),
    ],
    footer: `© ${new Date().getFullYear()} ${businessName} · Designed & Developed by KITTY CORP Digital Solutions.`,
  };

  for (const s of d.sections) {
    if (["services", "catalogue", "pricing"].includes(s.kind)) {
      s.description = `${t.specialty} curated offerings, transparent pricing and service packages.`;
      const offeringsList = industryOfferings[industry.id] || [];
      s.items = offeringsList.map(([title, text, category, price]) => ({
        id: crypto.randomUUID(),
        title,
        text,
        price,
        category,
        image: t.image,
        link: "#enquire",
      }));
    } else if (s.kind === "team") {
      s.description =
        "Our dedicated team of industry specialists and professionals.";
      const teamList = industryTeams[industry.id] || [];
      s.items = teamList.map(([title, text, category]) => ({
        id: crypto.randomUUID(),
        title,
        text,
        price: "",
        category,
        image: t.image,
        link: "#enquire",
      }));
    } else if (s.kind === "faq") {
      s.description =
        "Frequently asked questions regarding appointments, processes and bookings.";
      const faqsList = industryFaqs[industry.id] || [];
      s.items = faqsList.map(([title, text]) => ({
        id: crypto.randomUUID(),
        title,
        text,
        price: "",
        category: "FAQ",
        image: "",
        link: "",
      }));
    } else if (s.kind === "hours") {
      s.description =
        "Operational schedules and client consultation availability.";
      const hoursList = industryHours[industry.id] || [];
      s.items = hoursList.map(([title, text]) => ({
        id: crypto.randomUUID(),
        title,
        text,
        price: "",
        category: "Schedule",
        image: "",
        link: "",
      }));
    } else if (s.kind === "gallery") {
      s.description =
        "Visual portfolio and ambient photography of our space and work.";
      s.items = [
        {
          id: crypto.randomUUID(),
          title: "Atmosphere & Space",
          text: "Curated architectural presentation",
          price: "",
          category: "Gallery",
          image: t.image,
          link: "",
        },
        {
          id: crypto.randomUUID(),
          title: "Precision in Details",
          text: "Uncompromising attention to quality",
          price: "",
          category: "Gallery",
          image: t.image,
          link: "",
        },
        {
          id: crypto.randomUUID(),
          title: "Our Environment",
          text: "Designed for comfort and distinction",
          price: "",
          category: "Gallery",
          image: t.image,
          link: "",
        },
      ];
    } else if (s.kind === "about") {
      s.description = aboutText;
    } else if (s.kind === "contact") {
      s.description =
        "Tell us what you have in mind. We’ll help you find the next step.";
    }
  }

  return d;
}

export function toPublic(d: Demo): PublicDemo {
  const { notes, revision, settings, ...rest } = d;
  const { passwordHash, ...safe } = settings;
  return { ...rest, settings: safe };
}

export function toAdmin(d: Demo): AdminDemo {
  const { settings, ...rest } = d;
  const { passwordHash, ...safe } = settings;
  return { ...rest, settings: safe, hasPassword: !!passwordHash };
}

export function isAvailable(d: Demo, now = Date.now()) {
  return (
    d.status === "published" &&
    (!d.settings.expiresAt || new Date(d.settings.expiresAt).getTime() > now)
  );
}

export function whatsappUrl(number: string, message: string) {
  const digits = (number || "").replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : "";
}
