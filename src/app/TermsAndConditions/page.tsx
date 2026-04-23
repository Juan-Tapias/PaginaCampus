import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import data from "@/data/es.json";
import { div, main } from "framer-motion/client";



export default function TermsAndConditions() {
    const { title, back_button, content } = data.terms_and_conditions;
    
    const getSlug = (text: string) => {
    if (!text) return "";
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    };

    return (
        <div className="min-h-screen bg-[#070b14] relative overflow-hidden font-poppins selection:bg-[#54C6AA]/30 flex flex-col">
            <div 
            className="absolute inset-0 z-0 pointer-events-none opacity-40"
            style={{
                backgroundImage: `
                radial-gradient(circle at center, rgba(255,255,255,0.15) 1px, transparent 1px),
                radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px, 40px 40px',
                backgroundPosition: '0 0, 30px 20px'
            }}
            />

            <div className="relative z-20">
                <Navbar />
            </div>

            <main className="relative z-10 container mx-auto px-6 md:px-12 pt-32 pb-24 flex flex-col gap-12 max-w-5xl flex-grow">
        
                <Link href="/" className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-fit">
                <ArrowLeft size={18} />
                <span className="text-sm tracking-widest font-mono uppercase">{back_button}</span>
                </Link>

                <div className="flex items-center gap-6 md:gap-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                    <img src="/logo.webp" alt="Logo" className="w-full h-full" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-3xl font-poppins text-white tracking-wide uppercase">
                    {title}
                </h1>
            </div>

          {content.map((item: any, index: number) => (
            <div 
              id={getSlug(item.title)}
              className="w-full rounded-xl overflow-hidden shadow-2xl flex flex-col mt-4 relative z-20" 
              key={index}
            >
              <h2 className="text-2xl sm:text-3xl md:text-3xl font-poppins text-white tracking-wide uppercase">
                {item.title}
              </h2>
              <br />
              {item.subtitle && (
                <h2 className="text-2xl sm:text-3xl md:text-3xl font-poppins text-white tracking-wide uppercase">
                  {item.subtitle}
                </h2>
              )}
              <br />
              <p className="text-gray-300 transition-all font-poppins text-sm md:text-[18px] leading-relaxed tracking-wider block whitespace-pre-line">
                {item.text}
              </p>
            </div>
          ))}
            </main>
            
            <div className="relative z-20 mt-auto">
                <Footer />
            </div>
        </div>
    );
}   