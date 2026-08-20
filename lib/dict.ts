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
    eyebrow: {
      en: "HOUSTON · SUGAR LAND · GALLERIA · UNIVERSITY",
      es: "HOUSTON · SUGAR LAND · GALLERIA · UNIVERSITY",
    },
    h1: {
      en: "Houston and Sugar Land Real Estate, Guided Start to Finish.",
      es: "Bienes raíces en Houston y Sugar Land, guiados de principio a fin.",
    },
    sub: {
      en: "I'm Veronica Medellin, a bilingual REALTOR® with 10+ years helping buyers, sellers and investors across Sugar Land, the Galleria and the University area. Let's make your next move your best one yet.",
      es: "Soy Veronica Medellin, una REALTOR® bilingüe con más de 10 años ayudando a compradores, vendedores e inversionistas en Sugar Land, Galleria y el área de University. Hagamos de tu próximo paso el mejor hasta ahora.",
    },
    cta1: { en: "Book a free consultation", es: "Agenda una consulta gratis" },
    cta2: { en: "See what my home is worth", es: "Descubre el valor de mi casa" },
    stat1: { en: "10+ years experience", es: "10+ años de experiencia" },
    stat2: { en: "100+ families served", es: "100+ familias atendidas" },
    stat3: { en: "English & Español", es: "Inglés y Español" },
    trust: {
      en: "HomeSmart · TREC #0614869 · HAR Member · Equal Housing Opportunity",
      es: "HomeSmart · TREC #0614869 · Miembro HAR · Igualdad de Oportunidad de Vivienda",
    },
    zipCodesTitle: { en: "Areas I cover", es: "Áreas que cubro" },
    zips: [
      { name: "Sugar Land", zip: "77478 · 77479 · 77096 · 77098" },
      { name: "Galleria / Uptown", zip: "77057 · 77056" },
      { name: "University", zip: "77030 · 77005 · 77025 · 77401" },
    ],
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
    buying: { title: { en: "Buying a Home", es: "Comprar una casa" }, copy: { en: "From the first Saturday of showings to the day you get the keys — offers, inspections, financing, all of it explained before you sign.", es: "Desde el primer sábado de recorridos hasta el día que recibes las llaves — ofertas, inspecciones, financiamiento, todo explicado antes de firmar." } },
    selling: { title: { en: "Selling a Home", es: "Vender una casa" }, copy: { en: "Pricing backed by real comps, pre-staging tips that make people stop scrolling, and negotiation that protects your number.", es: "Precios respaldados por comparables reales, consejos de pre-decoración que hacen detener el scroll, y negociación que protege tu número." } },
    investing: { title: { en: "Investing", es: "Invertir" }, copy: { en: "Rental math, neighborhood hotspots, and transaction flow — the type of focus that lets you decide with confidence.", es: "Números de renta, zonas candentes del vecindario, y flujo de transacciones — el enfoque que te permite decidir con confianza." } },
    guidance: { title: { en: "One-on-One Guidance", es: "Asesoría personalizada" }, copy: { en: "Real strategy built around your timeline and your budget — not a template.", es: "Una estrategia real construida en torno a tu tiempo y tu presupuesto — no una plantilla." } },
    process: {
      step1: { title: { en: "Consultation", es: "Consulta" }, copy: { en: "A honest chat on your goals, budget and timeline.", es: "Una charla honesta sobre tus metas, presupuesto y tiempos." } },
      step2: { title: { en: "Search or List", es: "Buscar o listar" }, copy: { en: "Curated showings or pricing and marketing your home to sell.", es: "Recorridos seleccionados o precio y marketing para vender tu casa." } },
      step3: { title: { en: "Negotiate", es: "Negociar" }, copy: { en: "Offers, inspections, and items handled in your best interest.", es: "Ofertas, inspecciones y temas manejados en tu mejor interés." } },
      step4: { title: { en: "Close", es: "Cerrar" }, copy: { en: "Paperwork explained clearly, keys in your hands and done.", es: "Papeleo explicado claramente, llaves en tus manos y listo." } },
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
      en: "Bilingual Houston REALTOR® serving Galleria, Sugar Land & University area.",
      es: "REALTOR® bilingüe en Houston, sirviendo Galleria, Sugar Land y el área de University.",
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
  areas: {
    eyebrow: { en: "WHERE I WORK", es: "DÓNDE TRABAJO" },
    h2: {
      en: "The neighborhoods I know street by street",
      es: "Los vecindarios que conozco calle por calle",
    },
    sub: {
      en: "Pricing a home well means knowing which streets buyers ask for, which schools move a listing, and what sold three doors down last month. These are the areas I work in every week.",
      es: "Valorar bien una casa significa saber qué calles piden los compradores, qué escuelas mueven una propiedad y qué se vendió a tres casas de distancia el mes pasado. Estas son las áreas en las que trabajo cada semana.",
    },
    zipLabel: { en: "ZIP codes", es: "Códigos postales" },
    cta: { en: "See homes in these areas", es: "Ver casas en estas áreas" },
    groups: [
      {
        name: { en: "Sugar Land", es: "Sugar Land" },
        zips: "77478 · 77479 · 77096 · 77098",
        blurb: {
          en: "Master-planned communities, strong schools, and steady resale demand from families moving in from across Houston.",
          es: "Comunidades planificadas, buenas escuelas y demanda constante de reventa de familias que llegan de todo Houston.",
        },
      },
      {
        name: { en: "Galleria & Uptown", es: "Galleria y Uptown" },
        zips: "77057 · 77056",
        blurb: {
          en: "High-rise condos and townhomes for buyers who want to walk to work, dining and shopping inside the Loop.",
          es: "Condominios en torre y townhomes para quienes quieren caminar al trabajo, restaurantes y tiendas dentro del Loop.",
        },
      },
      {
        name: { en: "University Area", es: "Área de University" },
        zips: "77030 · 77005 · 77025 · 77401",
        blurb: {
          en: "Affluent residential pockets, tree-lined streets, and top-tier medical and educational proximity inside the Loop.",
          es: "Áreas residenciales exclusivas, calles arboladas y cercanía de primer nivel a centros médicos y educativos dentro del Loop.",
        },
      },
    ],
  },
  homeFaq: {
    items: [
      {
        q: {
          en: "Which areas of Houston do you cover?",
          es: "¿Qué áreas de Houston cubres?",
        },
        a: {
          en: "I work across Sugar Land (77478, 77479, 77096, 77098), the Galleria and Uptown (77057, 77056), and the University area (77030, 77005, 77025, 77401). If your address is outside those areas, call me anyway — I will tell you honestly whether I am the right agent or refer you to someone who is.",
          es: "Trabajo en Sugar Land (77478, 77479, 77096, 77098), Galleria y Uptown (77057, 77056), y el área de University (77030, 77005, 77025, 77401). Si tu dirección está fuera de esas áreas, llámame igual — te diré con honestidad si soy la agente adecuada o te referiré a alguien que lo sea.",
        },
      },
      {
        q: { en: "Do you work in Spanish?", es: "¿Atiendes en español?" },
        a: {
          en: "Yes. Every part of the process — showings, offers, inspection reports, negotiation and closing — can be handled in Spanish or English, whichever you are more comfortable with. Contracts themselves are in English, so I walk through each section with you before you sign anything.",
          es: "Sí. Cada parte del proceso — visitas, ofertas, reportes de inspección, negociación y cierre — se puede manejar en español o inglés, el que te resulte más cómodo. Los contratos están en inglés, así que reviso cada sección contigo antes de que firmes.",
        },
      },
      {
        q: {
          en: "What does it cost to work with you as a buyer?",
          es: "¿Cuánto cuesta trabajar contigo como comprador?",
        },
        a: {
          en: "Commission terms are agreed in writing before we start looking, and what the seller offers varies by listing. I will show you the numbers for any home you are considering so you know your costs before you make an offer, not at the closing table.",
          es: "Los términos de comisión se acuerdan por escrito antes de empezar a buscar, y lo que ofrece el vendedor varía según la propiedad. Te mostraré los números de cualquier casa que estés considerando para que conozcas tus costos antes de hacer una oferta, no en la mesa de cierre.",
        },
      },
      {
        q: {
          en: "How long does it take to sell a home here?",
          es: "¿Cuánto tarda en venderse una casa aquí?",
        },
        a: {
          en: "It depends on price, condition and the specific ZIP code — a Sugar Land family home and a Galleria high-rise move on very different timelines. I will give you current days-on-market figures for your street, not a citywide average, as part of your market analysis.",
          es: "Depende del precio, la condición y el código postal — una casa familiar en Sugar Land y una torre en Galleria se mueven en tiempos muy distintos. Te daré cifras actuales de días en el mercado para tu calle, no un promedio de toda la ciudad, como parte de tu análisis.",
        },
      },
      {
        q: {
          en: "Is the home valuation really free?",
          es: "¿La valoración de la casa es realmente gratis?",
        },
        a: {
          en: "Yes, and there is no obligation to list with me afterwards. You get a comparative market analysis based on what comparable homes actually closed for near you. Plenty of people use it just to decide whether this is the right year to sell.",
          es: "Sí, y no hay obligación de listar conmigo después. Recibes un análisis comparativo de mercado basado en los precios reales de cierre de casas comparables cerca de ti. Mucha gente lo usa solo para decidir si este es el año correcto para vender.",
        },
      },
      {
        q: {
          en: "I am a first-time buyer. Where do I start?",
          es: "Soy comprador primerizo. ¿Por dónde empiezo?",
        },
        a: {
          en: "Start with a lender conversation so you know your real budget, then we look at homes that fit it. Going the other way around is how people fall in love with a house they cannot finance. I can introduce you to lenders, and there is no pressure to use any of them.",
          es: "Empieza con una conversación con un prestamista para conocer tu presupuesto real, y luego vemos casas que encajen. Hacerlo al revés es como la gente se enamora de una casa que no puede financiar. Puedo presentarte prestamistas, y no hay presión de usar ninguno.",
        },
      },
    ],
  },
} as const;

export function t(entry: { en: string; es: string }, lang: Lang): string {
  return entry[lang];
}
