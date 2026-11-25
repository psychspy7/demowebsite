import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KITTY CORP Studio — Websites engineered for authority. Built to convert.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FCFBF9",
          color: "#171513",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "0 92px",
        }}
      >
        <div style={{ height: 108, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #E8E4DE" }}>
          <div style={{ width: 58, height: 58, background: "#101010", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
            <div style={{ width: 35, height: 35, borderRadius: "50%", background: "linear-gradient(135deg, #FF8A00 8%, #FF3B56 48%, #8B35FF 88%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#101010", marginLeft: 9, marginTop: -3 }} />
            </div>
          </div>
          <div style={{ fontSize: 19, color: "#49443F" }}>Blueprints</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", paddingTop: 58 }}>
          <div style={{ display: "flex", alignItems: "center", alignSelf: "flex-start", padding: "12px 22px", borderRadius: 40, border: "1px solid #E5DED2", background: "#F5F1E9", fontSize: 15, letterSpacing: 2, color: "#3D3933" }}>
            <div style={{ width: 9, height: 9, borderRadius: 10, background: "#191715", marginRight: 13 }} />
            KITTY CORP STUDIO · INDIA &amp; WORLDWIDE
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 28, fontSize: 70, lineHeight: 1.02, letterSpacing: -3, fontWeight: 500 }}>
            <div>Websites engineered</div>
            <div>for authority.</div>
            <div style={{ fontWeight: 700, background: "linear-gradient(90deg, #201914 0%, #A35D20 78%)", backgroundClip: "text", color: "transparent" }}>Built to convert.</div>
          </div>
          <div style={{ marginTop: 28, maxWidth: 860, fontSize: 23, lineHeight: 1.55, color: "#707967" }}>
            Thoughtful, high-performance websites for ambitious businesses. From a focused business presence to a complete online store, every project is shaped around your goals.
          </div>
        </div>
        <div style={{ marginTop: "auto", marginBottom: 34, display: "flex", justifyContent: "space-between", fontSize: 15, color: "#827A70", letterSpacing: 1 }}>
          <div>BUSINESS WEBSITES · E-COMMERCE · DIGITAL EXPERIENCES</div>
          <div>business.thekittycorp.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
