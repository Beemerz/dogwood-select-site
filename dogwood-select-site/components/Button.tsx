interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-block px-6 py-3 rounded-full font-medium transition-colors duration-200';

  const variants: Record<'primary' | 'secondary', string> = {
    primary: 'bg-dogwoodGreen text-ivory hover:bg-charcoal',
    secondary:
      'border border-dogwoodGreen text-dogwoodGreen hover:bg-dogwoodGreen hover:text-ivory',
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
