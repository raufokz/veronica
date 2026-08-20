export type NeighborhoodContent = {
  slug: string;
  name: string;
  headline: { en: string; es: string };
  whoFor: { en: string; es: string };
  medianPrice: number;
  schools: string[];
  commute: { nasa: string; downtown: string; medicalCenter: string };
  highlights: { en: string; es: string }[];
  heroNote: string;
};

export const neighborhoods: NeighborhoodContent[] = [
  {
    slug: "galleria",
    name: "Galleria / Uptown",
    headline: {
      en: "Cosmopolitan lifestyle in the heart of Houston's fashion district",
      es: "Estilo de vida cosmopolita en el corazón del distrito de moda de Houston",
    },
    whoFor: {
      en: "The Galleria and Uptown area is perfect for professionals who love premier shopping, fine dining, and sleek highraise or classic patio home living.",
      es: "El área de Galleria y Uptown es perfecta para profesionales que aman las compras de primera, alta cocina, y residencias de gran altura o casas clásicas con patio.",
    },
    medianPrice: 580000,
    schools: ["Houston ISD", "School of the Woods", "St. George Place Elementary"],
    commute: { nasa: "5 min", downtown: "15 min", medicalCenter: "20 min" },
    highlights: [
      { en: "World-class shopping at The Galleria Mall", es: "Compras de clase mundial en el centro comercial The Galleria" },
      { en: "Close proximity to Memorial Park & Uptown Park", es: "Cerca de Memorial Park y Uptown Park" },
      { en: "St. George Place Elementary (IB World School)", es: "St. George Place Elementary (Escuela del Mundo del IB)" },
    ],
    heroNote: "Galleria / Uptown, Houston, TX",
  },
  {
    slug: "sugar-land",
    name: "Sugar Land",
    headline: {
      en: "Ranked one of America's best and safest places to live",
      es: "Calificado como uno de los mejores y más seguros lugares para vivir en EE. UU.",
    },
    whoFor: {
      en: "Sugar Land features master-planned communities, tree-lined streets, excellent public schools, and family-friendly parks perfect for a balanced suburban lifestyle.",
      es: "Sugar Land cuenta con comunidades planificadas, calles arboladas, excelentes escuelas públicas, y parques familiares perfectos para un estilo de vida suburbano equilibrado.",
    },
    medianPrice: 495000,
    schools: ["Fort Bend ISD", "Clements High School", "Dulles Middle School"],
    commute: { nasa: "30 min", downtown: "30 min", medicalCenter: "30 min" },
    highlights: [
      { en: "Master-planned lakes & golf communities", es: "Comunidades planificadas con lagos y campos de golf" },
      { en: "Highly acclaimed Fort Bend ISD schools", es: "Escuelas de Fort Bend ISD altamente aclamadas" },
      { en: "Sugar Land Town Square shopping & dining", es: "Compras y restaurantes en Sugar Land Town Square" },
    ],
    heroNote: "Sugar Land, TX",
  },
  {
    slug: "university",
    name: "University Area / Medical Center",
    headline: {
      en: "Vibrant community steps from Rice University and the Medical Center",
      es: "Comunidad vibrante a pasos de Rice University y el Centro Médico",
    },
    whoFor: {
      en: "The University Area is ideal for academic professionals, medical staff, and families wanting walkability, historic homes, and top-tier museum district access.",
      es: "El área universitaria es ideal para profesionales académicos, personal médico y familias que desean transitabilidad, casas históricas, y acceso de primera al distrito de museos.",
    },
    medianPrice: 820000,
    schools: ["Houston ISD", "Roberts Elementary School", "Pershing Middle School"],
    commute: { nasa: "15 min", downtown: "10 min", medicalCenter: "5 min" },
    highlights: [
      { en: "Steps from Rice University & Hermann Park", es: "A pasos de Rice University y Hermann Park" },
      { en: "World's largest medical complex nearby", es: "El complejo médico más grande del mundo cerca" },
      { en: "Walkable tree-lined streets & historic charm", es: "Calles arboladas transitables y encanto histórico" },
    ],
    heroNote: "University Area, Houston, TX",
  },
];

export function getNeighborhood(slug: string) {
  return neighborhoods.find((n) => n.slug === slug) ?? null;
}
