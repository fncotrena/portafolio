export default function ToolTip({ children }: { children: React.ReactNode }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute -top-11 left-1/2 z-20 -translate-x-1/2 scale-95 whitespace-nowrap rounded-lg border border-border-soft bg-surface px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
    >
      {children}
    </span>
  );
}
