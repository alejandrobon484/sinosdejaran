"use client";

import { useState } from "react";

const SOURCES = ["H&M", "Mercadona", "Vivari"];

interface FormState {
  name: string;
  email: string;
  position: string;
  source: string;
  photo_url: string;
}

const empty: FormState = {
  name: "",
  email: "",
  position: "",
  source: "",
  photo_url: "",
};

export default function ReviewForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Error al guardar la reseña.");
        return;
      }

      setStatus("success");
      setMessage("¡Reseña guardada correctamente!");
      setForm(empty);
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Inténtalo de nuevo.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-8 shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-zinc-800">Nueva reseña</h2>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <Field label="Nombre" required>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Nombre completo"
            className={inputCls}
          />
        </Field>

        <Field label="Email" required>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="correo@ejemplo.com"
            className={inputCls}
          />
        </Field>

        <Field label="Puesto de trabajo" required>
          <input
            type="text"
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            placeholder="Ej: Store Manager"
            className={inputCls}
          />
        </Field>

        <Field label="Procedencia" required>
          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            required
            className={inputCls}
          >
            <option value="" disabled>
              Selecciona procedencia
            </option>
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="URL de la foto">
          <input
            type="text"
            name="photo_url"
            value={form.photo_url}
            onChange={handleChange}
            placeholder="URL de la foto de la reseña"
            className={inputCls}
          />
        </Field>

        {status === "success" && (
          <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {message}
          </p>
        )}
        {status === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
        >
          {status === "loading" ? "Guardando…" : "Enviar reseña"}
        </button>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-800 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-zinc-600">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}
