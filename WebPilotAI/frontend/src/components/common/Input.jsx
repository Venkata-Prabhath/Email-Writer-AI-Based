const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">

      {label && (
        <label className="text-sm text-gray-400">

          {label}

        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        className="
          w-full
          h-12
          rounded-xl
          border
          border-[#2A2A2A]
          bg-[#111111]
          px-4
          text-white
          outline-none
          transition-all
          duration-300
          placeholder:text-gray-500
          focus:border-[#D4AF37]
          focus:ring-2
          focus:ring-[#D4AF37]/20
        "
      />

    </div>
  );
};

export default Input;