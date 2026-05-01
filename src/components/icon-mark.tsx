type IconMarkProps = {
  kind: "cup" | "leaf" | "clock";
};

export function IconMark({ kind }: IconMarkProps) {
  const common = "h-10 w-10 text-matcha-deep";

  if (kind === "cup") {
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 15h24v11a9 9 0 0 1-9 9h-6a9 9 0 0 1-9-9V15Z" />
        <path d="M33 18h5a4 4 0 0 1 0 8h-4" />
        <path d="M12 40h20" />
      </svg>
    );
  }

  if (kind === "leaf") {
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M35 11c-7 1-14 4-18 9-4 5-5 11-4 17 6 1 12 0 17-4 5-4 8-11 9-18-1-2-2-3-4-4Z" />
        <path d="M14 34c6-6 11-10 18-15" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className={common} fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="24" cy="24" r="14" />
      <path d="M24 16v10l7 4" />
    </svg>
  );
}
