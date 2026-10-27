import React from "react";

export default function BackgroundEffects() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none"
      aria-hidden="true"
    >
      {/* Soft gradient ambient blurs without floating icons */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl" />
    </div>
  );
}
