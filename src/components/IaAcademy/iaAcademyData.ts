import data from '@/data/es.json';

const fallbackSlides = data.partners_page.selection.carrusel;

const firebaseBase = 'https://firebasestorage.googleapis.com/v0/b/paginacampus.firebasestorage.app/o';

export const iaAcademyAssets = {
  heroRobot: `${firebaseBase}/ia-academy%2FIA-representation.svg?alt=media`,
  heroCrossed: `${firebaseBase}/ia-academy%2FIA-representation-hero.svg?alt=media`,
  heroTime: `${firebaseBase}/ia-academy%2FIA-representation-tiempo.svg?alt=media`,
  logo: `${firebaseBase}/ia-academy%2Fia-logo.svg?alt=media`,
  fallbackHero: fallbackSlides[0]?.slide,
  fallbackCrossed: fallbackSlides[1]?.slide,
  fallbackTime: fallbackSlides[2]?.slide,
  fallbackLogo: data.strategic_partners.companies[4]?.image,
};

export const iaAcademyHero = {
  eyebrow: 'IA ACADEMY',
  heading: 'Entrena equipos para la nueva era de la inteligencia artificial',
  highlight: 'con ejecución real',
  description:
    'Programas inmersivos para líderes, equipos técnicos y unidades operativas que quieren integrar IA de forma medible.',
  primaryCta: 'Explorar servicios',
  secondaryCta: 'Ver sesiones',
  nextMasterclass: {
    title: 'Próxima masterclass',
    topic: 'Orquestación IA para operaciones empresariales',
    date: 'Jueves 16 · 18:30 COT',
    href: '/IaAcademy/servicios',
  },
};

export const iaPlans = [
  {
    id: 'talento',
    title: 'Talento IA para equipos internos',
    subtitle: 'Upskilling técnico',
    description: 'Entrenamos perfiles de producto y desarrollo con frameworks de adopción rápida.',
  },
  {
    id: 'liderazgo',
    title: 'Liderazgo y estrategia IA',
    subtitle: 'Toma de decisión',
    description: 'Alineamos dirección, métricas y riesgos para implementar IA con enfoque de negocio.',
  },
  {
    id: 'automatizacion',
    title: 'Automatización operativa',
    subtitle: 'Procesos y ROI',
    description: 'Diseñamos casos de uso con impacto en tiempos, costos y calidad de ejecución.',
  },
  {
    id: 'gobernanza',
    title: 'Gobernanza y escalabilidad',
    subtitle: 'Seguridad y continuidad',
    description: 'Estandarizamos prácticas de uso, seguridad y seguimiento para escalar sin fricción.',
  },
];

export const specialistItems = [
  'Diseño de casos de uso priorizados por impacto',
  'Implementación guiada con sesiones hands-on',
  'Métricas de productividad y performance por cohorte',
];

export const evolvingTeams = [
  {
    quote:
      'Pasamos de pruebas aisladas a procesos automatizados en menos de 6 semanas. El equipo entendió cómo implementar IA en producción.',
    author: 'ANDRÉS MORA',
    role: 'Head of Operations',
    company: 'Logística LATAM',
  },
  {
    quote:
      'El programa nos dio un marco de decisión para priorizar casos con ROI real. Hoy tenemos un roadmap de IA sostenible.',
    author: 'DIANA CASTRO',
    role: 'Innovation Lead',
    company: 'Fintech Regional',
  },
  {
    quote:
      'La diferencia estuvo en la ejecución: sesiones aplicadas a nuestros propios flujos y seguimiento por resultados.',
    author: 'SANTIAGO RUIZ',
    role: 'CTO',
    company: 'HealthTech',
  },
];

export const aiTechBooks = [
  'Prompts',
  'Agents',
  'RAG',
  'MLOps',
  'LangChain',
  'n8n',
  'LLM Ops',
  'Guardrails',
  'Vector DB',
  'Evals',
];

export const iaContactForm = {
  title: 'Activa tu ruta IA Academy',
  subtitle: 'Cuéntanos tu objetivo y armamos una sesión de diagnóstico.',
  fields: {
    name: 'Nombre completo',
    email: 'Email corporativo',
    teamSize: 'Tamaño del equipo',
    goal: 'Objetivo principal',
  },
  cta: 'Solicitar diagnóstico',
};

export const servicesHero = {
  title: 'Servicios IA Academy',
  subtitle: 'Sesiones en vivo, implementación guiada y roadmap operativo.',
  dateLabel: 'Próxima transmisión',
  date: '16 MAY · 18:30 COT',
};

export const upcomingSessions = [
  {
    title: 'Arquitectura de agentes IA para soporte interno',
    date: '16 MAY · 18:30 COT',
    duration: '60 min',
  },
  {
    title: 'Automatización con RAG y workflows empresariales',
    date: '23 MAY · 18:30 COT',
    duration: '75 min',
  },
  {
    title: 'Gobernanza y observabilidad en productos IA',
    date: '30 MAY · 18:30 COT',
    duration: '60 min',
  },
  {
    title: 'Escalamiento de equipos IA: de piloto a operación',
    date: '06 JUN · 18:30 COT',
    duration: '60 min',
  },
];

export const replayVideo = {
  title: 'Última transmisión',
  description: 'Revisa la sesión más reciente y comparte el enlace con tu equipo.',
  youtubeEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
};
