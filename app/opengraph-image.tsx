import { ImageResponse } from "next/og";

export const alt = "Ketering Jedne Mame — Pravo domaće, od prave mame";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#6b2737",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#d4a853",
            marginBottom: 20,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Ketering · Beograd i okolina
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            color: "#fef3e2",
            lineHeight: 1.15,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}
        >
          <div>Pravo domaće,</div>
          <div>od prave mame.</div>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#fef3e2",
            opacity: 0.85,
            marginTop: 28,
            maxWidth: 700,
          }}
        >
          Kifle, rolati, mini pice — sveže, ručno pripremljeno, dostavljeno na vrata.
        </div>
      </div>
    ),
    { ...size }
  );
}
