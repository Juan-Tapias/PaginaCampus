'use client';

import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AiTechnologiesSection.module.css';
import { aiTechBooks, iaTechnologies } from './iaAcademyData';

export default function AiTechnologiesSection() {
  const [activeBook, setActiveBook] = useState<number | null>(null);
  const sectionId = useId();
  const bookRows = [aiTechBooks.slice(0, 7), aiTechBooks.slice(7, 14)];

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-12 lg:px-12 lg:pb-28 lg:pt-16">
      <div className="container relative mx-auto max-w-[1130px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto text-center"
        >
          <h2 className="font-poppins text-[28px] font-semibold leading-[1.12] text-[#F0F0F0] sm:text-[34px] lg:text-[35px]">
            {iaTechnologies.heading}
          </h2>
        </motion.div>

        <div className={`mx-auto mt-12 ${styles.shelf}`}>
          <div className={styles.bookRows}>
            {bookRows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className={styles.bookRow}>
                {row.map((book, itemIndex) => {
                  const index = rowIndex * 7 + itemIndex;
                  const isActive = activeBook === index;

                  return (
                    <button
                      key={book}
                      type="button"
                      className={`${styles.bookContainer} ${isActive ? styles.bookContainerActive : ''}`}
                      onClick={() => setActiveBook((current) => (current === index ? null : index))}
                      aria-label={`${iaTechnologies.activate_book_aria_prefix} ${book}`}
                      aria-pressed={isActive}
                      aria-controls={`${sectionId}-book-${index}`}
                    >
                      <div id={`${sectionId}-book-${index}`} className={`${styles.book} ${isActive ? styles.bookActive : ''}`}>
                        <div className={styles.spineFace}>
                          <span className={styles.logoMark} />
                          <span className={styles.frontLabel}>{book}</span>
                        </div>
                        <div className={styles.backFace} />
                        <div className={styles.coverFace}>
                          <span className={styles.coverLogo} />
                          <span className={styles.coverTitle}>{book}</span>
                        </div>
                        <div className={styles.sideFace} />
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
