'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datePickerDark.css';
import { Calendar } from 'lucide-react';
import { iaContactForm } from './iaAcademyData';

export  type FieldType = 'text' | 'radio' | 'checkbox' | 'textarea' | 'date';

export interface FormOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  options?: FormOption[];
  helpText?: string;
}

export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}

export default function IaContactSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const formSections = iaContactForm.form_sections as FormSection[];

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(curr => curr + 1);
      
      const form = document.getElementById('ia-contact-form');
      if (form) {
        const y = form.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      // Submit form logic
      const form = document.getElementById('ia-contact-form') as HTMLFormElement;
      if (form) form.reset();
      setCurrentStep(0);
      setSelectedDate(null);
      setShowSuccessModal(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
      const form = document.getElementById('ia-contact-form');
      if (form) {
        const y = form.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const section = formSections[currentStep];
  const progress = ((currentStep + 1) / formSections.length) * 100;

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
          id="ia-contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleNext();
          }}
          style={{ colorScheme: 'dark' }}
          className="mx-auto mt-20 w-full max-w-[750px] overflow-hidden rounded-[6px] bg-[#1B1B1B] px-6 pb-6 pt-7 shadow-[0_18px_52px_rgba(0,0,0,0.35)] sm:px-8 lg:px-10 lg:pb-10 lg:pt-10"
        >
          <AnimatePresence mode="wait">
            {showSuccessModal ? (
              <motion.div
                key="success-modal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-12 text-center sm:py-16"
              >
                <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#3BC4A5]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B1B1B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                
                <h3 className="mb-6 font-poppins text-[22px] font-medium text-[#F1F1F1] sm:text-[24px]">
                  ¡Enviado con éxito!
                </h3>
                
                <p className="mx-auto mb-10 max-w-[420px] font-poppins text-[15px] font-light leading-[1.6] text-[#E7E7E7] sm:text-[16px]">
                  Agradecemos el tiempo que tomaste en llenar el formulario, nuestro equipo se pondrá en contacto contigo en el menor tiempo posible.
                </p>

                <button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="h-[51px] rounded-[4px] border border-[#8C8C8C] bg-transparent px-8 font-roboto-mono text-[16px] font-normal text-[#E7E7E7] transition-colors hover:border-[#F1F1F1] hover:text-[#F1F1F1]"
                >
                  Volver al inicio
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <p className="font-roboto-mono text-[16px] font-normal uppercase leading-none tracking-[0.04em] text-[#3BE0C3]">
                    PASO {currentStep + 1} DE {formSections.length}
                  </p>
                  <div className="mt-4 h-[15px] overflow-hidden rounded-full bg-[#393939]">
                    <div
                      className="h-full rounded-full bg-[#3BC4A5] transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="font-poppins text-[25px] font-semibold leading-tight text-[#F1F1F1]">{section.title}</h3>
                </div>

                <div className="mt-9 grid gap-10">
                  {section.fields.map((field) => (
                    <div key={field.id} className="block">
                      <span className="block font-roboto-mono text-[14px] font-semibold leading-tight tracking-[0.03em] text-[#BDBDBD]">
                        {field.label} {field.required && <span className="text-[#3BC4A5]">*</span>}
                      </span>
                      
                      {field.helpText && (
                        <span className="mt-1.5 block font-poppins text-[13px] text-[#8C8C8C]">
                          {field.helpText}
                        </span>
                      )}

                      {field.type === 'text' && (
                        <div className="relative">
                          <input
                            type="text"
                            name={field.id}
                            required={field.required}
                            className="mt-6 h-[30px] w-full border-0 border-b border-[#8C8C8C] bg-transparent pb-2 font-poppins text-[15px] text-white outline-none transition-colors focus:border-[#3BC4A5]"
                          />
                        </div>
                      )}

                      {field.type === 'date' && (
                        <div className="relative mt-6">
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date: Date | null) => setSelectedDate(date)}
                            required={field.required}
                            name={field.id}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona una fecha"
                            wrapperClassName="w-full"
                            className="h-[30px] w-full cursor-pointer border-0 border-b border-[#8C8C8C] bg-transparent pb-2 pr-10 font-poppins text-[15px] text-white outline-none transition-colors focus:border-[#3BC4A5]"
                          />
                          <Calendar className="pointer-events-none absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-[#3BC4A5]" />
                        </div>
                      )}

                      {field.type === 'textarea' && (
                        <textarea
                          name={field.id}
                          required={field.required}
                          rows={3}
                          className="mt-6 w-full resize-y rounded-sm border border-[#8C8C8C] bg-transparent p-3 font-poppins text-[15px] text-white outline-none transition-colors focus:border-[#3BC4A5]"
                        />
                      )}

                      {(field.type === 'radio' || field.type === 'checkbox') && field.options && (
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          {field.options.map(opt => (
                            <label key={opt.value} className="flex cursor-pointer items-start gap-3">
                              <input 
                                type={field.type} 
                                name={field.id} 
                                value={opt.value}
                                required={field.type === 'radio' ? field.required : false}
                                className="mt-1 h-4 w-4 flex-shrink-0 cursor-pointer accent-[#3BC4A5]" 
                              />
                              <span className="font-poppins text-[14px] leading-[1.4] text-[#E7E7E7]">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-16 flex items-center justify-between">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="h-[51px] w-[135px] rounded-[4px] border border-[#8C8C8C] bg-transparent font-roboto-mono text-[16px] font-normal text-[#E7E7E7] transition-colors hover:border-[#F1F1F1] hover:text-[#F1F1F1]"
                    >
                      Anterior
                    </button>
                  ) : (
                    <div /> // Spacer
                  )}
                  <button
                    type="submit"
                    className="h-[51px] w-[135px] rounded-[4px] bg-[#6637E8] font-roboto-mono text-[16px] font-normal text-white transition-colors hover:bg-[#7446F2]"
                  >
                    {currentStep === formSections.length - 1 ? 'Finalizar' : 'Siguiente'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
