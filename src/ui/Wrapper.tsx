type Props = { children: React.ReactNode; className?: string };

export function Wrapper({ children, className }: Props) {
  return (
    <div className={`inner w-wrapper h-full px-2 lg:px-section ${className}`}>
      {children}
    </div>
  );
}
