import { cn } from "../../services/utils";

export const Button = ({ 
  children, 
  variant = "premium", 
  className, 
  ...props 
}) => {
  const variants = {
    premium: "btn-premium",
    outline: "btn-outline",
    ghost: "px-6 py-2 hover:text-secondary transition-colors duration-300 font-medium",
  };

  return (
    <button 
      className={cn(variants[variant], className)} 
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        className={cn(
          "px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all",
          error && "border-red-500 focus:ring-red-200 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export const Badge = ({ children, className }) => (
  <span className={cn("px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary uppercase tracking-wider", className)}>
    {children}
  </span>
);
