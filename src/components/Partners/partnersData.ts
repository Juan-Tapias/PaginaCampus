import data from '@/data/es.json';

export const partnersPage = data.partners_page;
export const partnerCompanies = data.strategic_partners.companies;

export type ConnectionStep = (typeof partnersPage.connection_cycle.steps)[number];
export type Testimonial = (typeof partnersPage.testimonials.items)[number];
export type PartnerCompany = (typeof partnerCompanies)[number];
