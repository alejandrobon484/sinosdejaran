"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "#2a2320", borderBottom: "1px solid #3d3330" }}>

      {/* Barra principal */}
      <div className="mx-auto max-w-4xl px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Logo + nombre */}
        <Link href="/" className="flex items-center gap-3" style={{ textDecoration: "none" }}>
          <Image
            src="/images/logo.png"
            alt="Logo SiNosDejaranResponder"
            width={40}
            height={40}
            style={{ borderRadius: "6px", flexShrink: 0 }}
          />
          <span
            className="text-[13px] md:text-[15px]"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              color: "#fdf8f3",
              letterSpacing: "0.02em",
            }}
          >
            SiNosDejaranResponder
          </span>
        </Link>

        {/* Desktop: acciones */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/publicar"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "14px",
              color: "#2a2320",
              backgroundColor: "#c9a96e",
              textDecoration: "none",
              padding: "8px 18px",
              borderRadius: "8px",
              border: "1px solid #c9a96e",
            }}
          >
            Responde
          </Link>
        </div>

        {/* Móvil: botón hamburguesa */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="md:hidden flex items-center justify-center w-10 h-10 bg-transparent border-0 cursor-pointer"
          style={{ fontSize: "22px", color: "#fdf8f3" }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Móvil: menú desplegable */}
      {open && (
        <div
          className="md:hidden px-6 py-4"
          style={{
            backgroundColor: "#2a2320",
            borderTop: "1px solid #3d3330",
          }}
        >
          <Link
            href="/publicar"
            onClick={() => setOpen(false)}
            className="block mt-2"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "15px",
              color: "#2a2320",
              backgroundColor: "#c9a96e",
              textDecoration: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            Responde
          </Link>
        </div>
      )}
    </nav>
  );
}
