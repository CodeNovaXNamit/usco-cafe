"use client";

import { useState } from "react";

export function SpecialityAccordion({
  label,
  content,
}: {
  label: string;
  content: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-matcha-light pt-5">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between font-sans text-xs uppercase tracking-[0.25em] text-matcha-deep"
      >
        <span>{label}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>
      {open ? <p className="mt-4 max-w-xl text-lg leading-8 text-charcoal/80">{content}</p> : null}
    </div>
  );
}
