import { colors, fontFamily } from "../theme";

// UIB oval badge, recreated after the label on the roll.
export const Logo: React.FC<{ size?: number }> = ({ size = 1 }) => (
  <div
    style={{
      width: 420 * size,
      height: 230 * size,
      borderRadius: "50%",
      background: "linear-gradient(160deg, #1f6b3a 0%, #0f4a26 100%)",
      border: `${10 * size}px solid ${colors.accent}`,
      boxShadow: `0 0 0 ${4 * size}px #0f4a26, 0 20px 60px rgba(0,0,0,0.5)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily,
      fontWeight: 900,
      fontSize: 140 * size,
      letterSpacing: 8 * size,
      color: "#f4f7d0",
      direction: "ltr",
    }}
  >
    UIB
  </div>
);
