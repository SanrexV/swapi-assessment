import React from "react";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  icon: Icon,
  iconPosition = "left",
}) => {
  const baseStyles =
    "rounded-md transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-30";
  const disabledStyle =
    "dark:disabled:hover:bg-[#0000] dark:disabled:text-white/40 cursor-not-allowed";

  return (
    <button
      className={`${baseStyles} ${disabled ? disabledStyle : ""}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {Icon && iconPosition === "left" && <Icon size={20} />}
      {label}
      {Icon && iconPosition === "right" && <Icon size={20} />}
    </button>
  );
};

export default Button;
