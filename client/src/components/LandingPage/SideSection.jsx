// components/BackgroundText.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BackgroundTextSide = () => {
  const texts = [
    "Create your project",
    "Build ideas",
    "Collaborate",
    "Manage tasks",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top-left */}
      <div className="absolute top-8 left-6 md:left-12 max-w-xs space-y-6 z-20 select-none pointer-events-none">
        {texts.map((text, i) => (
          <motion.h2
            key={`top-${i}`}
            className="text-lg md:text-xl font-bold text-indigo-400"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: i === index ? 1 : 0.3,
              y: i === index ? 0 : 10,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {text}
          </motion.h2>
        ))}
      </div>

      {/* Bottom-right */}
      <div className="absolute bottom-8 right-6 md:right-12 max-w-xs space-y-6 text-right z-10 select-none pointer-events-none">
        {texts
          .slice()
          .reverse()
          .map((text, i) => (
            <motion.h2
              key={`bottom-${i}`}
              className="text-lg md:text-xl font-semibold text-indigo-300"
              initial={{ opacity: 0, y: -50 }}
              animate={{
                opacity: i === index ? 1 : 0.2,
                y: i === index ? 0 : -10,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {text}
            </motion.h2>
          ))}
      </div>
    </>
  );
}


export default BackgroundTextSide;