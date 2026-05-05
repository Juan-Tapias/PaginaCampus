import data from '@/data/es.json';

const iaAcademy = data.ia_academy;

export const iaAcademyAssets = iaAcademy.assets;
export const iaAcademyHero = iaAcademy.landing.hero;
export const iaFormationPlans = iaAcademy.landing.formation_plans;
export const iaTechSpecialist = iaAcademy.landing.specialist;
export const iaEvolvingTeams = iaAcademy.landing.evolving_teams;
export const iaTechnologies = iaAcademy.landing.technologies;
export const iaContactForm = iaAcademy.landing.contact;
export const iaServicesView = iaAcademy.services_view;

export const iaPlans = iaFormationPlans.cards;
export const specialistModules = iaTechSpecialist.modules;
export const evolvingTeams = iaEvolvingTeams.items;
export const aiTechBooks = iaTechnologies.books;
export const servicesHero = iaServicesView.hero;
export const upcomingSessions = iaServicesView.upcoming_sessions.items;
export const replayVideo = iaServicesView.replay;
