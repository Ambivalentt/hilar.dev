// components/ImageShowcase.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
];

const ImageShowcase = ()  =>{
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className=" relative w-full min-h-80 z-30 xl:max-w-[856px] md:max-w-xl sm:h-80 md:h-[400px] mt-16 overflow-hidden transform -skew-y-6 rounded-3xl shadow-2xl">
      {/* Fondo negro en el fondo */}
      <div className="absolute inset-0 bg-black -z-10" />

      {/* Imágenes con transición */}
      {images.map((img, i) => (
        <motion.img
          key={i}
          src={img}
          alt={`project-${i}`}
          className="absolute inset-0 z-40 w-full h-full object-cover"
          animate={{ opacity: i === index ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      ))}
    </section>
  );
}

export default ImageShowcase