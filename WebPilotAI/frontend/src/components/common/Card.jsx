import { motion } from "framer-motion";

const Card = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        rounded-2xl
        border
        border-[#242424]
        bg-[#141414]
        shadow-2xl
        p-6
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;