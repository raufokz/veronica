export type Lang = "en" | "es";

export const dict = {
  nav: {
    home: { en: "Home", es: "Inicio" },
    listings: { en: "Listings", es: "Propiedades" },
    about: { en: "About", es: "Acerca de" },
    services: { en: "Services", es: "Servicios" },
    neighborhoods: { en: "Neighborhoods", es: "Vecindarios" },
    testimonials: { en: "Testimonials", es: "Testimonios" },
    blog: { en: "Blog", es: "Blog" },
    contact: { en: "Contact", es: "Contacto" },
    bookACall: { en: "Book a call", es: "Agenda una llamada" },
  },
  hero: {
    eyebrow: { en: "HOUSTON · CLEAR LAKE · BAY AREA", es: "HOUSTON · CLEAR LAKE · BAY AREA" },
    h1: {
      en: "Buying a home shouldn't feel like a test you didn't study for.",
      es: "Comprar casa no debería sentirse como un examen para el que no estudiaste.",
    },
    sub: {
      en: "I'm Veronica Medellin — a Houston REALTOR® with 10+ years of walking families through the paperwork, the negotiation, and the nerves. In English or in Spanish, you'll know exactly what's happening at every step.",
      es: "Soy Veronica Medellin — una REALTOR® de Houston con más de 10 años guiando a familias a través del papeleo, la negociación y los nervios. En inglés o en español, sabrás exactamente qué está pasando en cada paso.",
    },
    cta1: { en: "Book a free 15-minute call", es: "Agenda una llamada gratis de 15 minutos" },
    cta2: { en: "See what my home is worth", es: "Descubre el valor de mi casa" },
    stat1: { en: "10+ years", es: "10+ años" },
    stat2: { en: "100+ families served", es: "100+ familias atendidas" },
    stat3: { en: "English & Español", es: "Inglés y Español" },
    trust: {
      en: "HomeSmart · TREC #0614869 · HAR Member · Equal Housing Opportunity",
      es: "HomeSmart · TREC #0614869 · Miembro HAR · Igualdad de Oportunidad de Vivienda",
    },
  },
  homeValue: {
    h2: { en: "What is your Houston home actually worth in 2026?", es: "¿Cuánto vale realmente tu casa en Houston en 2026?" },
    sub: {
      en: "Not a Zestimate. A real comparative market analysis, prepared by a licensed agent who has sold in your zip code.",
      es: "No es un Zestimate. Un análisis comparativo de mercado real, preparado por una agente con licencia que ha vendido en tu código postal.",
    },
    placeholder: { en: "Enter your property address", es: "Ingresa la dirección de tu propiedad" },
    cta: { en: "Get my home value", es: "Conoce el valor de mi casa" },
  },
  listings: {
    eyebrow: { en: "CURRENTLY ON THE MARKET", es: "ACTUALMENTE EN EL MERCADO" },
    h2: { en: "Homes worth the drive to see", es: "Casas que vale la pena ir a ver" },
    seeFull: { en: "See the full listing", es: "Ver la propiedad completa" },
    browseAll: { en: "Browse all listings", es: "Ver todas las propiedades" },
    filters: { all: { en: "All", es: "Todas" }, house: { en: "House", es: "Casa" }, condo: { en: "Condo", es: "Condominio" }, townhouse: { en: "Townhouse", es: "Casa adosada" } },
  },
  about: {
    eyebrow: { en: "YOUR GUIDE", es: "TU GUÍA" },
    h2: { en: "You've got the goal. I've got the map.", es: "Tú tienes la meta. Yo tengo el mapa." },
    cta: { en: "Read Veronica's story", es: "Lee la historia de Veronica" },
  },
  services: {
    eyebrow: { en: "HOW I HELP", es: "CÓMO AYUDO" },
    h2: { en: "Whatever the goal, there's a plan for it", es: "Sea cual sea la meta, hay un plan para lograrla" },
    buying: { title: { en: "Buying a home", es: "Comprar una casa" }, copy: { en: "From the first Saturday of showings to the day you get the keys — offers, inspections, financing, all of it explained before you sign it.", es: "Desde el primer sábado de recorridos hasta el día que recibes las llaves — ofertas, inspecciones, financiamiento, todo explicado antes de firmar." } },
    selling: { title: { en: "Selling a home", es: "Vender una casa" }, copy: { en: "Pricing backed by real comps, photography that makes people stop scrolling, and negotiation that protects your number.", es: "Precios respaldados por comparables reales, fotografía que detiene el scroll, y negociación que protege tu número." } },
    investing: { title: { en: "Investing", es: "Invertir" }, copy: { en: "Rental math, neighbourhood trajectory, and honest answers about which properties aren't worth your capital.", es: "Números de renta, la trayectoria del vecindario, y respuestas honestas sobre qué propiedades no valen tu capital." } },
    guidance: { title: { en: "One-on-one guidance", es: "Asesoría personalizada" }, copy: { en: "A strategy built around your timeline and your budget — not a template.", es: "Una estrategia construida en torno a tu tiempo y tu presupuesto — no una plantilla." } },
    process: {
      step1: { title: { en: "Consultation", es: "Consulta" }, copy: { en: "A free call to map your goals, budget, and timeline.", es: "Una llamada gratuita para definir metas, presupuesto y tiempos." } },
      step2: { title: { en: "Search or list", es: "Buscar o listar" }, copy: { en: "Curated showings, or pricing and marketing your home to sell.", es: "Recorridos seleccionados, o precio y marketing para vender tu casa." } },
      step3: { title: { en: "Negotiate", es: "Negociar" }, copy: { en: "Offers, inspections, and terms handled in your best interest.", es: "Ofertas, inspecciones y términos manejados en tu mejor interés." } },
      step4: { title: { en: "Close", es: "Cerrar" }, copy: { en: "Paperwork explained plainly, keys in your hand.", es: "Papeleo explicado con claridad, llaves en tu mano." } },
    },
  },
  testimonials: {
    eyebrow: { en: "CLIENT STORIES", es: "HISTORIAS DE CLIENTES" },
    h2: { en: "Don't take my word for it", es: "No solo tomes mi palabra" },
    readMore: { en: "Read more reviews on HAR.com", es: "Lee más reseñas en HAR.com" },
  },
  contact: {
    eyebrow: { en: "LET'S TALK", es: "HABLEMOS" },
    h2: { en: "Tell me what you're trying to do. I'll tell you how to get there.", es: "Cuéntame qué quieres lograr. Yo te digo cómo llegar." },
    fullName: { en: "Full name", es: "Nombre completo" },
    email: { en: "Email", es: "Correo electrónico" },
    phone: { en: "Phone", es: "Teléfono" },
    interest: { en: "I'm interested in", es: "Estoy interesado en" },
    message: { en: "Message", es: "Mensaje" },
    preferredLanguage: { en: "Preferred language", es: "Idioma preferido" },
    send: { en: "Send message", es: "Enviar mensaje" },
    success: { en: "Got it. Veronica will be in touch within one business day.", es: "Recibido. Veronica se pondrá en contacto dentro de un día hábil." },
    interestOptions: {
      buying: { en: "Buying", es: "Comprar" },
      selling: { en: "Selling", es: "Vender" },
      investing: { en: "Investing", es: "Invertir" },
      other: { en: "Just have a question", es: "Solo tengo una pregunta" },
    },
  },
  dock: {
    call: { en: "Call", es: "Llamar" },
    whatsapp: { en: "WhatsApp", es: "WhatsApp" },
    message: { en: "Message", es: "Mensaje" },
  },
  footer: {
    positioning: {
      en: "Bilingual Houston REALTOR® serving Clear Lake & the Bay Area.",
      es: "REALTOR® bilingüe en Houston, sirviendo Clear Lake y el Bay Area.",
    },
    quickLinks: { en: "Quick Links", es: "Enlaces Rápidos" },
    serviceAreas: { en: "Service Areas", es: "Áreas de Servicio" },
    contactHeading: { en: "Contact", es: "Contacto" },
    brokerageLine: {
      en: "Veronica Medellin is a licensed real estate agent affiliated with HomeSmart.",
      es: "Veronica Medellin es una agente de bienes raíces con licencia afiliada a HomeSmart.",
    },
    iabs: { en: "Information About Brokerage Services (IABS)", es: "Información Sobre Servicios de Corretaje (IABS)" },
    consumerProtection: { en: "TREC Consumer Protection Notice", es: "Aviso de Protección al Consumidor de TREC" },
    privacy: { en: "Privacy", es: "Privacidad" },
    accessibility: { en: "Accessibility", es: "Accesibilidad" },
    rights: { en: "All rights reserved.", es: "Todos los derechos reservados." },
  },
} as const;

export function t(entry: { en: string; es: string }, lang: Lang): string {
  return entry[lang];
}
