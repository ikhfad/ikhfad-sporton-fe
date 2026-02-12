type TButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "dark" | "ghost";
  size?: "normal" | "small";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  className,
  variant = "primary",
  size = "normal",
  ...props
}: TButtonProps) => {
  const baseStyles =
    "inline-flex gap-2 duration-300 justify-center items-center cursor-pointer hover:scale-105 rounded-lg";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/85",
    dark: "bg-dark text-white hover:bg-dark/85",
    ghost: "bg-transparent hover:bg-gray-100 text-dark",
  };

  const sizes = {
    normal: "py-3 px-6 md:py-4 md:px-9",
    small: "py-2 px-5 md:py-[10px] md:px-7",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
