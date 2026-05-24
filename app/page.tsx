import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main style={{
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
      alignItems: "center",
      padding: "64px 24px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "640px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
      }}>

        {/* Separador de estrellas */}
        <div style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: "16px",
        }}>
          <span style={{ flex: 1, borderTop: "1px solid #c9a96e" }} />
          <span style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "15px",
            letterSpacing: "0.6em",
            color: "#c9a96e",
            userSelect: "none",
          }}>
            ★ ★ ★
          </span>
          <span style={{ flex: 1, borderTop: "1px solid #c9a96e" }} />
        </div>

        {/* Titular */}
        <h1 style={{
          fontFamily: "var(--font-playfair), serif",
          textAlign: "center",
          fontSize: "clamp(22px, 4vw, 34px)",
          fontWeight: 700,
          lineHeight: 1.35,
          color: "#2a2320",
          margin: 0,
        }}>
          ¿Alguna vez has tenido que tragarte el orgullo y sonreír mientras te destrozaban el día con una{" "}
          <em style={{ fontStyle: "italic", color: "#a07c42" }}>
            reseña injusta, falsa
          </em>{" "}
          o que atacaba directamente a tu persona?
        </h1>

        {/* Imagen */}
        <div style={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "16px",
          boxShadow: "0 1px 4px rgba(42,35,32,0.12)",
        }}>
          <Image
            src="/images/clienta_camarera.jpeg"
            alt="Camarera atendiendo a una clienta"
            width={800}
            height={534}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
            priority
          />
        </div>

        {/* Texto descriptivo */}
        <p style={{
          fontFamily: "var(--font-lato), Lato, sans-serif",
          fontSize: "clamp(15px, 2vw, 17px)",
          lineHeight: 1.75,
          color: "#4a3f3a",
          textAlign: "center",
          margin: 0,
        }}>
          ¿Recibiste una reseña injusta? <strong style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontWeight: 700 }}>No te quedes sin decir lo que piensas.</strong> Miles de profesionales han vivido lo mismo que tú, y todos tienen una historia que el cliente olvidó contar. Aquí puedes responder con la verdad: pega la reseña que recibiste, escribe lo que no pudiste decir en ese momento y publícalo. <em style={{ color: "#a07c42" }}>Tu versión también importa.</em> Que el mundo la lea.
        </p>

        {/* Punto separador */}
        <span style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "32px",
          color: "#c9a96e",
          userSelect: "none",
          lineHeight: 1,
        }}>·</span>

        {/* Botón CTA */}
        <Link
          href="/publicar"
          style={{
            display: "block",
            width: "100%",
            padding: "20px 32px",
            textAlign: "center",
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 900,
            fontSize: "clamp(20px, 3vw, 26px)",
            color: "#2a2320",
            border: "1px solid #c9a96e",
            borderRadius: "12px",
            backgroundColor: "#fdf0e0",
            textDecoration: "none",
            boxSizing: "border-box",
          }}
        >
          Si nos dejaran responder...
        </Link>

      </div>

      <footer style={{
        marginTop: "80px",
        textAlign: "center",
        fontSize: "12px",
        letterSpacing: "0.05em",
        color: "#a89a8e",
      }}>
        Si nos dejaran responder — sinosdejaranresponder.com
      </footer>
    </main>
  );
}
