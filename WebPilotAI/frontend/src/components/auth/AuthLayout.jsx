import { motion } from "framer-motion";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#090909] flex items-center justify-center relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-[140px] -top-40 -left-40"/>

      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#D4AF37]/5 blur-[130px] bottom-0 right-0"/>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .45 }}
        className="w-full max-w-md rounded-3xl border border-[#2A2A2A] bg-[#121212]/95 backdrop-blur-xl shadow-2xl p-10"
      >

        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold text-white">
            WebPilot
          </h1>

          <p className="text-[#D4AF37] mt-3">
            AI Browser Agent
          </p>

        </div>

        {children}

      </motion.div>

    </div>
  );
};

export default AuthLayout;