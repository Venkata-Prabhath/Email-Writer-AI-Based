import { Loader2 } from "lucide-react";

const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  loading = false,
  variant = "primary",
}) => {
  const variants = {
    primary:
      "bg-[#D4AF37] hover:bg-[#E7C85A] text-black border border-[#D4AF37]",

    secondary:
      "bg-[#171717] hover:bg-[#202020] text-white border border-[#2A2A2A]",

    danger:
      "bg-red-600 hover:bg-red-700 text-white border border-red-600",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        h-12
        px-6
        rounded-xl
        font-semibold
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        hover:scale-[1.02]
        active:scale-95
        ${variants[variant]}
        ${className}
      `}
    >
      {loading && <Loader2 size={18} className="animate-spin" />}

      {children}
    </button>
  );
};

export default Button;