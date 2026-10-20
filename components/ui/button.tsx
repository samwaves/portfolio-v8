type ButtonVariant = "primary" | "secondary";

const buttonStyles = {
  base:
    "focus-ring inline-flex min-w-0 cursor-pointer items-center " +
    "justify-center rounded-md border px-3 py-2 text-sm font-medium " +
    "transition-colors motion-reduce:transition-none",

  variants: {
    primary:
      "border-transparent bg-primary text-on-primary hover:bg-primary-hover",
    secondary:
      "border-border bg-secondary text-on-secondary " +
      "hover:border-border-hover hover:bg-secondary-hover",
  },
} as const;

export function buttonVariants({
  variant = "primary",
  className,
}: {
  variant?: ButtonVariant;
  className?: string;
} = {}) {
  return `${buttonStyles.base} ${buttonStyles.variants[variant]} ${
    className ?? ""
  }`;
}
