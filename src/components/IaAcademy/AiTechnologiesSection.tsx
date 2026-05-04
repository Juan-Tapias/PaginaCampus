'use client';

import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AiTechnologiesSection.module.css';
import { aiTechBooks } from './iaAcademyData';

export default function AiTechnologiesSection() {
  const [activeBook, setActiveBook] = useState(2);
  const groupName = useId();

  return (
    <section className="relative overflow-hidden px-6 py-24 lg:px-12 lg:py-32">
      <div className="container relative mx-auto max-w-[1302px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[860px] text-center"
        >
          <p className="font-roboto-mono text-xs uppercase tracking-[0.24em] text-[#54C6AA]">TECNOLOGÍAS DE IA</p>
          <h2 className="mt-4 font-poppins text-[34px] font-semibold leading-[1.15] text-[#E9E9E9] sm:text-[44px] lg:text-[56px]">
            Biblioteca técnica para despliegues reales
          </h2>
          <p className="mx-auto mt-6 max-w-[700px] font-poppins text-[17px] leading-[1.7] text-white/75">
            Explora las rutas de entrenamiento por tecnología. Las integraciones visuales finales de logos se mantienen en
            placeholder según diseño.
          </p>
        </motion.div>

        <div className="mt-14 rounded-[14px] border border-white/10 bg-[#090A10] px-4 py-10 sm:px-8">
          <div className={`mx-auto flex max-w-[1160px] flex-wrap items-end justify-center gap-1 sm:gap-3 ${styles.shelf}`}>
            {aiTechBooks.map((book, index) => (
              <label key={book} className={styles.bookContainer} onMouseEnter={() => setActiveBook(index)}>
                <div className={styles.book}>
                  <div>
                    <span className={styles.frontLabel}>{book}</span>
                  </div>
                  <div />
                  <div>
                    <span className={styles.spineLabel}>{book}</span>
                  </div>
                  <div />
                  <input
                    type="radio"
                    name={groupName}
                    checked={activeBook === index}
                    onChange={() => setActiveBook(index)}
                    aria-label={`Activar libro ${book}`}
                  />
                </div>
              </label>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {aiTechBooks.slice(0, 6).map((label) => (
              <div key={label} className="flex w-[110px] flex-col items-center gap-2">
                <div className={styles.placeholder} />
                <span className="text-center font-roboto-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
