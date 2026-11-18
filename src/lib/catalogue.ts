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
export const industries: Industry[] = [
  {
    id: "medico",
    name: "Medical & wellness",
    eyebrow: "Care, made accessible",
    description: "Welcoming digital experiences for every kind of care.",
    image: "medical",
    color: "#17665b",
    specialties: [
      "Hospitals",
      "Doctors",
      "Dental clinics",
      "Diagnostic laboratories",
      "Physiotherapy",
      "Eye clinics",
      "Dermatology",
      "Veterinary",
      "Mental wellness",
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
      "JEE coaching",
      "NEET coaching",
      "UPSC coaching",
      "NDA & defence coaching",
      "Schools",
      "Tuition centres",
      "Computer institutes",
      "Language institutes",
      "Skill development",
      "Online education",
      "Daycare",
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
      "Property dealers",
      "Real estate agencies",
      "Builders",
      "Luxury properties",
      "Rental properties",
      "Commercial properties",
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
      "Fine dining",
      "Cafés",
      "Fast food",
      "Cloud kitchens",
      "Bakeries",
      "Indian restaurants",
      "Pizza & burgers",
      "Sweet shops",
      "Catering",
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
      "Clothing",
      "Electronics",
      "Mobile shops",
      "Grocery",
      "Furniture",
      "Hardware",
      "Jewellery",
      "Gift shops",
      "Bookstores",
      "Sports shops",
      "Optical stores",
      "Pet care",
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
    specialties: ["Hair studio", "Beauty salon", "Spa & wellness"],
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
    specialties: ["Training club", "Yoga studio", "Personal training"],
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
    specialties: ["Boutique hotel", "Resort", "Guest house"],
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
    specialties: ["Car dealership", "Vehicle repair", "Motorcycle showroom"],
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
      "Business consultancy",
      "Chartered accountants",
      "Legal consultants",
      "Architects",
      "Interior design",
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
      "Home maintenance",
      "Cleaning services",
      "Repairs & installation",
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
    specialties: ["Travel agency", "Adventure tours", "Curated holidays"],
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
    specialties: ["Event management", "Wedding planners", "Corporate events"],
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
    specialties: ["Photography", "Design studio", "Personal portfolio"],
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
      "Lifestyle store",
      "Fashion collection",
      "Specialty products",
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
      "Industrial products",
      "Custom fabrication",
      "Consumer manufacturing",
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
      "Community foundation",
      "Education initiative",
      "Environmental organisation",
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
    specialties: ["Transport services", "Warehousing", "Freight solutions"],
    sections: [
      ["services", "Logistics solutions"],
      ["catalogue", "Service coverage"],
      ["gallery", "Operations"],
      ["faq", "Shipment enquiries"],
    ],
    cta: "Request a quote",
  },
];
const layouts: Layout[] = [
  "editorial",
  "split",
  "immersive",
  "minimal",
  "structured",
];
const styleNames = [
  "Signature",
  "Perspective",
  "Atmosphere",
  "Essential",
  "Framework",
];
export const templates: Template[] = industries.flatMap((industry, i) =>
  industry.specialties.map((specialty, j) => ({
    id: `${industry.id}-${j + 1}`,
    industry: industry.id,
    name: `${specialty} / ${styleNames[(i + j) % 5]}`,
    specialty,
    layout: layouts[(i + j) % 5],
    color: industry.color,
    font: ["serif", "sans", "serif", "sans", "sans"][(i + j) % 5],
    image: `/images/${industry.image}.jpg`,
    description: `A ${layouts[(i + j) % 5]} design for ${specialty.toLowerCase()}, with editable ${industry.sections
      .map((s) => s[1].toLowerCase())
      .slice(0, 2)
      .join(" and ")}.`,
  })),
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
    description: "Add the details that make this business unique.",
    visible: true,
    ctaLabel: "",
    ctaLink: "",
    items:
      kind === "faq"
        ? [
            blankItem(
              "How can I make an enquiry?",
              "Use the enquiry form below. The business can follow up using your contact details.",
            ),
            blankItem(
              "Is this a live business website?",
              "This is an illustrative website concept. Services, availability and pricing must be confirmed with the business.",
            ),
          ]
        : kind === "hours"
          ? [
              blankItem("Monday – Friday", "Add confirmed opening hours"),
              blankItem("Saturday – Sunday", "Add confirmed opening hours"),
            ]
          : kind === "gallery"
            ? [
                blankItem(
                  "A closer look",
                  "Illustrative stock photography",
                  image,
                ),
              ]
            : kind === "team" || kind === "testimonials"
              ? []
              : kind === "about" || kind === "contact"
                ? []
                : [
                    blankItem(
                      "Featured offering",
                      "Describe this offering and who it is for.",
                      image,
                    ),
                    blankItem(
                      "Explore your options",
                      "Add accurate details for this business.",
                      image,
                    ),
                    blankItem(
                      "Personalised support",
                      "Explain the next step for an interested customer.",
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
  const headings: Record<string, string> = {
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
      description:
        "An illustrative website concept. Replace this copy with approved business information before sharing.",
      category: t.specialty,
      logo: "",
      favicon: "",
    },
    contact: {
      phone: "",
      whatsapp: "",
      whatsappMessage: `Hello ${businessName}, I would like to know more.`,
      email: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      maps: "",
      instagram: "",
      facebook: "",
      linkedin: "",
    },
    hero: {
      heading: headings[industry.id],
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
      title: businessName,
      description: `Explore this ${t.specialty.toLowerCase()} website concept.`,
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
    footer:
      "Website demonstration. Please confirm all details directly with the business.",
  };
  const offerings: Record<string, [string, string, string][]> = {
    medico: [
      [
        "Consultation enquiries",
        "Learn about the care options available and ask about arranging a consultation.",
        "Care",
      ],
      [
        "Specialist services",
        "An example space for confirmed specialities and the services offered by the clinic.",
        "Specialities",
      ],
      [
        "Plan your visit",
        "Find practical details about appointments, accessibility and what to expect.",
        "Your visit",
      ],
    ],
    institute: [
      [
        `${t.specialty} programme`,
        "Introduce the curriculum, learning format and confirmed course details.",
        "Courses",
      ],
      [
        "Upcoming batches",
        "Add verified batch schedules and admission information here.",
        "Batches",
      ],
      [
        "Learning resources",
        "Present the study materials and learning support included in the programme.",
        "Learning",
      ],
    ],
    "real-estate": [
      [
        "Featured residence",
        "Illustrative property listing. Add verified location, size and availability before sharing.",
        "Residential",
      ],
      [
        "A space for business",
        "Illustrative commercial space. Replace with approved specifications and pricing.",
        "Commercial",
      ],
      [
        "A new neighbourhood",
        "Present a confirmed rental or development, with accurate location details.",
        "Rental",
      ],
    ],
    restaurant: [
      [
        "House special",
        "A sample menu entry. Add the dish, ingredients and confirmed price.",
        "Kitchen",
      ],
      [
        "Something to sip",
        "Present a signature drink and any relevant dietary information.",
        "Drinks",
      ],
      [
        "A sweet finish",
        "Introduce a dessert from the confirmed menu.",
        "Desserts",
      ],
    ],
    "local-business": [
      [
        "Everyday favourites",
        "Introduce an available product with accurate size, material and price details.",
        "Everyday",
      ],
      [
        "New in store",
        "A space for the latest verified addition to the collection.",
        "New arrivals",
      ],
      [
        "Something special",
        "Highlight a featured product and invite customers to check availability.",
        "Featured",
      ],
    ],
    salon: [
      [
        "A fresh perspective",
        "Describe a confirmed hair, beauty or personal-care service.",
        "Signature",
      ],
      [
        "Time to unwind",
        "Introduce an available treatment, its duration and price.",
        "Treatments",
      ],
      [
        "A personalised visit",
        "Help visitors enquire about the right service for them.",
        "Consultation",
      ],
    ],
    gym: [
      [
        "Start moving",
        "Introduce an entry membership with confirmed access and pricing.",
        "Memberships",
      ],
      [
        "Build your rhythm",
        "Describe class options, schedules and what is included.",
        "Classes",
      ],
      [
        "A plan for you",
        "Present personal-training options and confirmed trainer details.",
        "Coaching",
      ],
    ],
    hotel: [
      [
        "The classic room",
        "Illustrative room type. Add approved amenities, occupancy and tariff information.",
        "Rooms",
      ],
      [
        "Space to slow down",
        "A sample suite presentation. Confirm availability directly with the property.",
        "Suites",
      ],
      [
        "A considered escape",
        "Describe a verified stay package and its inclusions.",
        "Experiences",
      ],
    ],
    automobile: [
      [
        "Explore the showroom",
        "Illustrative vehicle entry. Add verified model, specifications and price.",
        "Vehicles",
      ],
      [
        "Service & maintenance",
        "Describe confirmed workshop services and invite a service enquiry.",
        "Service",
      ],
      [
        "Parts & accessories",
        "Present available accessories with accurate compatibility details.",
        "Accessories",
      ],
    ],
    professional: [
      [
        "Understand the challenge",
        "Introduce the practice’s confirmed areas of expertise.",
        "Advisory",
      ],
      [
        "Make a clear plan",
        "Describe the approach and deliverables for this service.",
        "Planning",
      ],
      [
        "Move forward together",
        "Explain how clients can engage the team for ongoing support.",
        "Support",
      ],
    ],
    "home-services": [
      [
        "Everyday maintenance",
        "Describe the confirmed maintenance services and service areas.",
        "Maintenance",
      ],
      [
        "A fresh start",
        "Introduce available cleaning or home-care options.",
        "Care",
      ],
      [
        "Repairs & installation",
        "List the repair and installation work the business offers.",
        "Repairs",
      ],
    ],
    travel: [
      [
        "A mountain escape",
        "Illustrative itinerary. Add confirmed dates, inclusions and pricing.",
        "Mountains",
      ],
      [
        "A slower kind of journey",
        "A space for a curated holiday, tailored to the traveller.",
        "Holidays",
      ],
      [
        "Make it your own",
        "Invite travellers to share their interests for a personalised proposal.",
        "Custom trips",
      ],
    ],
    event: [
      [
        "A celebration of you",
        "Introduce planning services and confirmed package inclusions.",
        "Celebrations",
      ],
      [
        "Gather with purpose",
        "Present the approach to corporate events and gatherings.",
        "Corporate",
      ],
      [
        "The finishing details",
        "Show how design, coordination and styling come together.",
        "Styling",
      ],
    ],
    portfolio: [
      [
        "A considered concept",
        "Outline your creative discipline and the kind of projects you take on.",
        "Concept",
      ],
      [
        "From idea to image",
        "Describe your production process using approved examples.",
        "Production",
      ],
      [
        "An ongoing conversation",
        "Invite collaborations and explain your working approach.",
        "Collaboration",
      ],
    ],
    ecommerce: [
      [
        "The everyday collection",
        "Illustrative product. Add verified material, dimensions and price.",
        "Everyday",
      ],
      [
        "A fresh addition",
        "Introduce an available product and its distinctive details.",
        "New arrivals",
      ],
      [
        "The considered edit",
        "A place for a curated product with confirmed availability.",
        "Featured",
      ],
    ],
    manufacturing: [
      [
        "Core product range",
        "Present verified product specifications and applications.",
        "Products",
      ],
      [
        "Custom requirements",
        "Describe confirmed customisation capabilities and enquiry requirements.",
        "Custom",
      ],
      [
        "Technical information",
        "Offer accurate product details and supporting documentation.",
        "Technical",
      ],
    ],
    ngo: [
      [
        "Community initiatives",
        "Describe an active programme with verified objectives and context.",
        "Community",
      ],
      [
        "Learning & opportunity",
        "Present approved information about educational initiatives.",
        "Education",
      ],
      [
        "Ways to get involved",
        "Explain confirmed opportunities for volunteering or partnerships.",
        "Participation",
      ],
    ],
    logistics: [
      [
        "Transport enquiries",
        "Describe confirmed transport services and operating regions.",
        "Transport",
      ],
      [
        "Storage solutions",
        "Present available warehousing services and verified facilities.",
        "Warehousing",
      ],
      [
        "A connected plan",
        "Invite enquiries about coordinated logistics requirements.",
        "Solutions",
      ],
    ],
  };
  for (const s of d.sections) {
    if (["services", "catalogue", "pricing"].includes(s.kind)) {
      s.description =
        "Illustrative offerings. Confirm services, pricing and availability with the business.";
      s.items = offerings[industry.id].map(([title, text, category]) => ({
        ...blankItem(title, text, t.image),
        category,
      }));
    }
    if (s.kind === "contact")
      s.description =
        "Tell us what you have in mind. We’ll help you find the next step.";
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
  const digits = number.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : "";
}
