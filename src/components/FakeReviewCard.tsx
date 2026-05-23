interface FakeReviewCardProps {
  reviewText: string;
  stars?: number;
}

export default function FakeReviewCard({ reviewText, stars = 5 }: FakeReviewCardProps) {
  const clampedStars = Math.min(5, Math.max(1, Math.round(stars)));

  return (
    <div className="relative rounded-2xl bg-white px-5 py-4 shadow-[0_1px_4px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.08)] font-[Arial,sans-serif]">
      {/* Header: avatar + meta */}
      <div className="mb-3 flex items-start gap-3">
        {/* Avatar circular difuminado */}
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-200 select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-zinc-400 blur-[1.5px]"
            aria-hidden="true"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>

        {/* Nombre y conteo de reseñas */}
        <div className="flex flex-col justify-center gap-0.5">
          {/* Nombre borroso */}
          <span
            className="block w-28 rounded text-sm font-semibold text-zinc-500 select-none"
            style={{ filter: "blur(4px)", userSelect: "none" }}
            aria-hidden="true"
          >
            Nombre Apellido
          </span>
          {/* Conteo borroso */}
          <span
            className="block w-20 rounded text-xs text-zinc-400 select-none"
            style={{ filter: "blur(4px)", userSelect: "none" }}
            aria-hidden="true"
          >
            12 reseñas
          </span>
        </div>
      </div>

      {/* Estrellas + fecha */}
      <div className="mb-2 flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={14}
              height={14}
              fill={i < clampedStars ? "#FBBC04" : "#e4e4e7"}
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        {/* Fecha borrosa */}
        <span
          className="text-xs text-zinc-400 select-none"
          style={{ filter: "blur(4px)", userSelect: "none" }}
          aria-hidden="true"
        >
          hace 2 semanas
        </span>
      </div>

      {/* Texto de la reseña — completamente legible */}
      <p className="text-sm leading-relaxed text-zinc-700 whitespace-pre-wrap">{reviewText}</p>

      {/* Badge discreto */}
      <span className="absolute bottom-3 right-4 text-[10px] font-medium tracking-wide text-zinc-300 select-none">
        sinosdejaran…
      </span>
    </div>
  );
}
