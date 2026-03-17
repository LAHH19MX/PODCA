"use client";

import Image from "next/image";

function SinImagen({ size }: { size: number }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#faf5e4] to-[#f8f6f3] flex flex-col items-center justify-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#c9a227"
        strokeWidth="1.3"
        opacity={0.5}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      {size <= 36 && (
        <span className="text-[0.66rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">
          Sin imagen
        </span>
      )}
    </div>
  );
}

export default function ImagenPublicacion({
  src,
  alt,
  size = 32,
}: {
  src: string | null;
  alt: string;
  size?: number;
}) {
  if (!src) return <SinImagen size={size} />;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
