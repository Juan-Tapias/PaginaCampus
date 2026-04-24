import { partnerCompanies, partnersPage, type PartnerCompany } from './partnersData';

const { recruiters } = partnersPage;

const preferredCompanies = [
  'Aliaddo',
  'Kontrol',
  'SIO',
  'Mantis',
  'Vensure',
  'Wmwise',
  'Wiedii',
  'Globant',
  'Conexalab',
  'Syscom',
  'Conexalab',
  'Amaris',
  'Cure Latam',
  'Iridian',
  'Pensemos',
  'IvoLegal',
  'SmartData',
  'Dataglobbal',
  'Digital Process',
  'Software Medico',
];

function getRecruiterLogos() {
  const byName = new Map(partnerCompanies.map((company) => [company.name, company]));
  const selected = preferredCompanies
    .map((name) => byName.get(name))
    .filter((company): company is PartnerCompany => Boolean(company));

  const unique = selected.filter(
    (company, index, companies) => companies.findIndex((item) => item.name === company.name) === index,
  );

  if (unique.length >= 20) return unique.slice(0, 20);

  const fallback = partnerCompanies.filter(
    (company) => !unique.some((selectedCompany) => selectedCompany.name === company.name),
  );

  return [...unique, ...fallback].slice(0, 20);
}

export default function RecruitersSection() {
  const companies = getRecruiterLogos();

  return (
    <section className="relative overflow-hidden bg-black py-24 lg:min-h-[1124px]">
      <div className="container relative z-20 mx-auto px-6 lg:px-12">
        <div className="mx-auto max-w-[1302px] text-center">
          <p className="font-roboto-mono text-xs uppercase leading-[1.5] text-[#54C6AA]">
            {recruiters.eyebrow}
          </p>
          <h2 className="mt-2 font-poppins text-[30px] font-medium leading-[1.2] text-[#E9E9E9] sm:text-[40px]">
            {recruiters.heading}
          </h2>
          <p className="mt-2 font-poppins text-base leading-[1.5] text-[#CFCFCF]">
            {recruiters.subheading}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1044px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex h-[138px] items-center justify-center border border-[#2A2A2A] bg-[#171717] p-6 lg:h-[176px]"
            >
              <img
                src={company.image}
                alt={company.name}
                className="max-h-[58px] max-w-[142px] object-contain brightness-0 invert grayscale opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
