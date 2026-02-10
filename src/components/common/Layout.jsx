import { cn } from "../../services/utils";

export const Container = ({ children, className }) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
};

export const Section = ({ children, className, id, dark = false }) => {
  return (
    <section 
      id={id} 
      className={cn(
        "py-20 md:py-28 overflow-hidden", 
        dark ? "bg-dark text-white" : "bg-white text-primary",
        className
      )}
    >
      {children}
    </section>
  );
};
