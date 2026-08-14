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
    slug: "clear-lake",
    name: "Clear Lake",
    headline: {
      en: "Waterfront living with a NASA-area commute",
      es: "Vida junto al agua con un traslado cerca de NASA",
    },
    whoFor: {
      en: "Clear Lake is where NASA and Boeing families land for the short commute, the marinas, and the top-rated Clear Creek ISD schools — without giving up a real neighborhood feel.",
      es: "Clear Lake es donde las familias de NASA y Boeing se establecen por el traslado corto, las marinas, y las escuelas de alta calificación del Clear Creek ISD — sin renunciar a un verdadero ambiente de vecindario.",
    },
    medianPrice: 415000,
    schools: ["Clear Creek ISD", "Clear Lake High School", "Space Center Intermediate"],
    commute: { nasa: "10 min", downtown: "35 min", medicalCenter: "30 min" },
    highlights: [
      { en: "Marinas & sailing clubs on Clear Lake", es: "Marinas y clubes de vela en Clear Lake" },
      { en: "Space Center Houston nearby", es: "Space Center Houston cerca" },
      { en: "Clear Creek ISD, consistently top-rated", es: "Clear Creek ISD, consistentemente entre los mejores" },
    ],
    heroNote: "Clear Lake, Houston, TX",
  },
  {
    slug: "league-city",
    name: "League City",
    headline: {
      en: "New construction and room to grow",
      es: "Construcción nueva y espacio para crecer",
    },
    whoFor: {
      en: "League City is the pick for families who want new construction, bigger lots, and a straight shot down I-45 to Houston or Galveston — with some of the fastest-growing schools in the Bay Area.",
      es: "League City es la opción para familias que quieren construcción nueva, lotes más grandes, y un camino directo por la I-45 hacia Houston o Galveston — con algunas de las escuelas de más rápido crecimiento en el Bay Area.",
    },
    medianPrice: 385000,
    schools: ["Clear Creek ISD", "Friendswood ISD (parts)", "League City Intermediate"],
    commute: { nasa: "15 min", downtown: "40 min", medicalCenter: "35 min" },
    highlights: [
      { en: "New-construction communities", es: "Comunidades de construcción nueva" },
      { en: "Easy I-45 access to Houston & Galveston", es: "Fácil acceso a la I-45 hacia Houston y Galveston" },
      { en: "Family-friendly parks & rec centers", es: "Parques y centros recreativos familiares" },
    ],
    heroNote: "League City, TX",
  },
  {
    slug: "friendswood",
    name: "Friendswood",
    headline: {
      en: "Small-town feel, big-city commute",
      es: "Ambiente de pueblo pequeño, traslado de gran ciudad",
    },
    whoFor: {
      en: "Friendswood is the quiet, established choice — mature trees, a walkable downtown, and Friendswood ISD, one of the highest-rated districts in the Houston area.",
      es: "Friendswood es la opción tranquila y consolidada — árboles maduros, un centro caminable, y Friendswood ISD, uno de los distritos mejor calificados del área de Houston.",
    },
    medianPrice: 445000,
    schools: ["Friendswood ISD", "Friendswood High School", "Windsong Intermediate"],
    commute: { nasa: "15 min", downtown: "30 min", medicalCenter: "25 min" },
    highlights: [
      { en: "Friendswood ISD, top-rated district", es: "Friendswood ISD, distrito mejor calificado" },
      { en: "Walkable historic downtown", es: "Centro histórico caminable" },
      { en: "Mature, tree-lined streets", es: "Calles maduras con arboledas" },
    ],
    heroNote: "Friendswood, TX",
  },
];

export function getNeighborhood(slug: string) {
  return neighborhoods.find((n) => n.slug === slug) ?? null;
}
