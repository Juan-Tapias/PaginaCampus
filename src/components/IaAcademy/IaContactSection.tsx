'use client';

import { iaContactForm } from './iaAcademyData';

export default function IaContactSection() {
  const fields = [
    iaContactForm.fields.company_name,
    iaContactForm.fields.full_name,
    iaContactForm.fields.phone,
    iaContactForm.fields.corporate_email,
  ];

  return (
    <section className="relative overflow-hidden bg-black px-6 pb-24 pt-14 lg:px-12 lg:pb-28 lg:pt-16">
      <div className="container relative mx-auto max-w-[1050px]">
        <div className="mx-auto text-center">
          <p className="font-roboto-mono text-[14px] uppercase leading-none tracking-[0.16em] text-[#36D7BB] lg:text-[16px]">
            {iaContactForm.eyebrow}
          </p>
          <h2 className="mt-4 font-poppins text-[32px] font-semibold leading-[1.1] text-[#F0F0F0] sm:text-[38px] lg:text-[40px]">
            {iaContactForm.title}
          </h2>
          <p className="mx-auto mt-3 max-w-[820px] font-poppins text-[17px] font-normal leading-[1.45] text-[#E7E7E7] lg:text-[18px]">
            {iaContactForm.subtitle}
          </p>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto mt-20 w-full max-w-[654px] rounded-[6px] bg-[#1B1B1B] px-6 pb-6 pt-7 shadow-[0_18px_52px_rgba(0,0,0,0.35)] sm:px-8 lg:px-6 lg:pb-6"
        >
          <div>
            <p className="font-roboto-mono text-[16px] font-normal uppercase leading-none tracking-[0.04em] text-[#3BE0C3]">
              {iaContactForm.step_label}
            </p>
            <div className="mt-4 h-[15px] overflow-hidden rounded-full bg-[#393939]">
              <div
                className="h-full rounded-full bg-[#3BC4A5]"
                style={{ width: `${iaContactForm.progress}%` }}
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-poppins text-[25px] font-semibold leading-none text-[#F1F1F1]">{iaContactForm.step_title}</h3>
          </div>

          <div className="mt-9 grid gap-8">
            {fields.map((field) => (
              <label key={field} className="block">
                <span className="block font-roboto-mono text-[13px] font-semibold leading-none tracking-[0.03em] text-[#BDBDBD]">
                  {field}
                </span>
                <input
                  type={field === iaContactForm.fields.corporate_email ? 'email' : 'text'}
                  className="mt-8 h-[18px] w-full border-0 border-b border-[#8C8C8C] bg-transparent font-poppins text-[15px] text-white outline-none transition-colors focus:border-[#3BC4A5]"
                />
              </label>
            ))}
          </div>

          <div className="mt-14 flex justify-end">
            <button
              type="submit"
              className="h-[51px] w-[135px] rounded-[4px] bg-[#6637E8] font-roboto-mono text-[16px] font-normal text-white transition-colors hover:bg-[#7446F2]"
            >
              {iaContactForm.cta}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
