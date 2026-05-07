'use client';

import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './AiTechnologiesSection.module.css';
import { aiTechBooks, iaTechnologies } from './iaAcademyData';

const getImageUrl = (bookName: string) => {
  const map: Record<string, string> = {
    'Make': 'make',
    'Notion AI': 'notion',
    'Zapier': 'zapier',
    'Perplexity': 'perplexity',
    'ElevenLabs': 'elevenlabs',
    'HeyGen': 'heyyen',
    'Microsoft Copilot': 'microsftcopilot',
    'Gemini': 'gemini',
    'ChatGPT': 'chatgpt',
    'Github Copilot': 'githubcopilot',
    'NotebookLM': 'notebooklm',
    'Claude': 'claude',
    'Read AI': 'readai',
    'Midjourney': 'midjourney',
  };
  const key = map[bookName];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return key ? (iaTechnologies as any).images_url?.[key] : '';
};

const getDescription = (bookName: string) => {
  const map: Record<string, string> = {
    'Make': 'make',
    'Notion AI': 'notion',
    'Zapier': 'Zapier', // Note: Zapier is capitalized in descripcion_ia
    'Perplexity': 'perplexity',
    'ElevenLabs': 'elevenlabs',
    'HeyGen': 'heyyen',
    'Microsoft Copilot': 'microsftcopilot',
    'Gemini': 'gemini',
    'ChatGPT': 'chatgpt',
    'Github Copilot': 'githubcopilot',
    'NotebookLM': 'notebooklm',
    'Claude': 'claude',
    'Read AI': 'readai',
    'Midjourney': 'midjourney',
  };
  const key = map[bookName];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return key ? (iaTechnologies as any).descripcion_ia?.[key] : '';
};

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
                  const imageUrl = getImageUrl(book);
                  const description = getDescription(book);

                  return (
                    <button
                      key={book}
                      type="button"
                      className={`${styles.bookContainer} ${isActive ? styles.bookContainerActive : ''}`}
                      onClick={() => setActiveBook((current) => (current === index ? null : index))}
                      aria-label={`${iaTechnologies.activate_book_aria_prefix} ${book}`}
                      aria-pressed={isActive}
                      aria-controls={`${sectionId}-book-${index}`}
                      style={{ zIndex: isActive ? 10 : 1 }}
                    >
                      <div id={`${sectionId}-book-${index}`} className={`${styles.book} ${isActive ? styles.bookActive : ''}`}>
                        <div className={styles.spineFace}>
                          {imageUrl && (
                            <Image src={imageUrl} alt={book} width={28} height={28} className={styles.logoMark} />
                          )}
                          <span className={styles.frontLabel}>{book}</span>
                        </div>
                        <div className={styles.backFace} />
                        <div className={styles.coverFace}>
                          <div className={styles.coverHeader}>
                            {imageUrl && (
                              <Image src={imageUrl} alt={book} width={48} height={48} className={styles.coverLogo} />
                            )}
                            <span className={styles.coverTitle}>{book}</span>
                          </div>
                          {description && (
                            <p className={styles.coverDescription}>{description}</p>
                          )}
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
