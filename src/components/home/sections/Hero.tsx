
import Navbar from "../../layout/Navbar";
import StarField from "../../shared/StarField";
import TypewriterContent from "../../shared/TypewriterContent";
import data from "../../../data/es.json";
import { motion } from "framer-motion";


export default function Hero() {
  const { hero_content } = data;

  const consoleLines = [
    { text: "// --- CAMPUSLANDS CORE: MAIN_MISSION_CONTROL ---", color: "text-gray-500" },
    { text: "// Protocolo de Ignición de Talento v2.1", color: "text-gray-500" },
    { text: "// Estado: ESPERANDO_LANZAMIENTO", color: "text-amber-400" },
    { text: "", color: "text-transparent" },
    { text: "const MISION = {", color: "text-purple-400" },
    { text: "    id: 'CAMPUS_ALPHA',", color: "text-teal-400" },
    { text: "    objetivo: 'Colonizar_Industria_Tech',", color: "text-teal-400" },
    { text: "    coordinadas: ['LATAM', 'GLOBAL'],", color: "text-teal-400" },
    { text: "    tripulacion: [] // Lista para nuevos Campers", color: "text-gray-400" },
    { text: "};", color: "text-gray-300" },
    { text: "", color: "text-transparent" },
    { text: "// Validando sistemas...", color: "text-gray-500" },
    { text: "if (rastroTalento.formacion === 'ALTO_RENDIMIENTO') {", color: "text-purple-400" },
    { text: "    MISION.tripulacion.push(camperId);", color: "text-gray-300" },
    { text: "    console.log(`> Camper [${camperId}] acoplado a la Misión.`);", color: "text-teal-400" },
    { text: "}", color: "text-gray-300" }
  ];

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-transparent">
      <Navbar />

      <StarField />

      <div className="container relative z-40 mx-auto px-6 lg:px-12 pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between">

        <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl mb-8 select-none pointer-events-none"
          >
            <TypewriterContent lines={consoleLines} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-poppins text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-8 leading-[1.1] text-white drop-shadow-sm"
          >
            {hero_content.heading.split('software').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <>
                    <span
                      style={{
                        color: '#CDC2F4',
                        textShadow: '0 0 20px rgba(205, 194, 244, 0.4)'
                      }}
                      className="italic font-semibold"
                    >
                      software
                    </span>
                    <br className="hidden lg:block" />
                  </>
                )}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-poppins text-gray-400 text-base md:text-xl max-w-2xl mb-12 leading-relaxed font-light"
          >
            {hero_content.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 w-full lg:w-auto"
          >
            {hero_content.call_to_actions.map((cta, index) => (
              <button
                key={index}
                className={`font-roboto-mono group relative overflow-hidden w-full sm:w-[220px] h-[56px] flex items-center justify-center transition-all duration-300 pointer-events-auto active:scale-95 ${cta.type === 'primary'
                    ? 'bg-[#5E39DA] text-white hover:bg-[#6D4AE0] shadow-[0_0_30px_rgba(94,57,218,0.3)]'
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-sm'
                  }`}
              >
                <span className="relative z-10 uppercase text-[16px] font-normal leading-[1.5] tracking-normal">
                  {cta.text}
                </span>
              </button>
            ))}
          </motion.div>

        </div>

        {/* Lado Derecho: Espacio vacío para el Astronauta 3D */}
        <div className="w-full lg:w-[45%] hidden lg:block h-[500px] pointer-events-none">
          {/* El Astronauta se renderiza en el fondo con canvas fixed. 
              Este div solo empuja el layout para que el texto no se monte sobre él en desktop. */}
        </div>

      </div>

    </section>
  );
}