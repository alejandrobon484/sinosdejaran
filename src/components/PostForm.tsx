"use client";

import { useState } from "react";

interface FormState {
  author_name: string;
  author_position: string;
  author_source: string;
  review_text: string;
  response_text: string;
}

const empty: FormState = {
  author_name: "",
  author_position: "",
  author_source: "",
  review_text: "",
  response_text: "",
};

export default function PostForm({ onCreated }: { onCreated?: () => void }) {
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Error al guardar el post.");
        return;
      }

      setStatus("success");
      setMessage("¡Post publicado correctamente!");
      setForm(empty);
      onCreated?.();
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Inténtalo de nuevo.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-4 shadow-md sm:p-8">
      <h2 className="mb-6 text-xl font-semibold text-zinc-800 sm:text-2xl">Nuevo post</h2>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <Field label="Reseña recibida" required>
          <textarea
            name="review_text"
            value={form.review_text}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Pega aquí la reseña recibida…"
            className={textareaCls}
          />
        </Field>

        <Field label="Tu respuesta" required>
          <textarea
            name="response_text"
            value={form.response_text}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Escribe aquí tu respuesta…"
            className={textareaCls}
          />
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field label="Nombre" required>
            <input
              type="text"
              name="author_name"
              value={form.author_name}
              onChange={handleChange}
              required
              placeholder="Nombre del autor"
              className={inputCls}
            />
          </Field>

          <Field label="Puesto" required>
            <input
              type="text"
              name="author_position"
              value={form.author_position}
              onChange={handleChange}
              required
              placeholder="Ej: Store Manager"
              className={inputCls}
            />
          </Field>

          <Field label="Procedencia" required>
            <input
              type="text"
              name="author_source"
              value={form.author_source}
              onChange={handleChange}
              required
              placeholder="Ej: H&M"
              className={inputCls}
            />
          </Field>
        </div>

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
          className="mt-1 w-full rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 sm:w-auto"
        >
          {status === "loading" ? "Publicando…" : "Publicar post"}
        </button>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-base text-zinc-800 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200 sm:text-sm";

const textareaCls =
  "w-full resize-y rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-base text-zinc-800 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200 sm:text-sm";

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
