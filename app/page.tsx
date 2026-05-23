import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#FAF7F2] px-6 py-16 sm:px-8 sm:py-24">
      <div className="w-full max-w-2xl flex flex-col items-center gap-12">

        {/* Star separator with lines */}
        <div className="flex w-full items-center gap-4">
          <span className="flex-1 border-t border-amber-300/60" />
          <span className="font-playfair text-base tracking-[0.6em] text-amber-400 select-none">
            ★ ★ ★
          </span>
          <span className="flex-1 border-t border-amber-300/60" />
        </div>

        {/* Headline */}
        <h1 className="font-playfair text-center text-3xl font-bold leading-tight text-zinc-800 sm:text-4xl sm:leading-tight">
          ¿Alguna vez has tenido que tragarte el orgullo y sonreír mientras te destrozaban el día con una{" "}
          <em className="text-amber-700">
            reseña de Google injusta, falsa
          </em>{" "}
          o que atacaba directamente a tu persona?
        </h1>

        {/* Image */}
        <div className="w-full overflow-hidden rounded-2xl shadow-sm">
          <Image
            src="/images/clienta_camarera.jpeg"
            alt="Camarera atendiendo a una clienta"
            width={800}
            height={534}
            className="w-full object-cover"
            priority
          />
        </div>

        {/* Dot separator */}
        <span className="font-playfair text-3xl text-amber-300 select-none">·</span>

        {/* CTA button */}
        <Link
          href="/publicar"
          className="w-full rounded-xl border border-amber-300 bg-amber-50 px-8 py-5 text-center text-xl font-semibold font-playfair text-amber-800 shadow-sm transition hover:bg-amber-100 hover:shadow-md sm:w-auto"
        >
          Si nos dejaran responder...
        </Link>

      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-xs tracking-wide text-zinc-400">
        Si nos dejaran responder — sinosdejaranresponder.com
      </footer>
    </main>
  );
}
