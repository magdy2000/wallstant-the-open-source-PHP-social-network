import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Logo } from "../components/Logo";
import { colors, fontFamily } from "../theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Moving membrane-like stripes */}
      <AbsoluteFill
        style={{
          opacity: 0.18,
          backgroundImage:
            "repeating-linear-gradient(-20deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 90px)",
          translate: interpolate(frame, [0, 100], ["0px 0px", "-160px 0px"]),
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(217,224,33,0.18) 0%, rgba(0,0,0,0) 45%)",
          opacity: interpolate(frame, [0, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Logo"
        style={{
          scale: interpolate(frame, [0, 28], [0.6, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 14 }),
            output: "perceptual-scale",
          }),
          opacity: interpolate(frame, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          marginBottom: 60,
        }}
      >
        <Logo />
      </Interactive.Div>
      <div
        style={{
          height: 6,
          borderRadius: 3,
          backgroundColor: colors.accent,
          width: interpolate(frame, [18, 45], [0, 520], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
          marginBottom: 40,
        }}
      />
      <Interactive.Div
        name="Arabic name"
        style={{
          color: colors.ink,
          fontSize: 92,
          fontWeight: 900,
          direction: "rtl",
          opacity: interpolate(frame, [26, 44], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [26, 50], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
        }}
      >
        مصنع الاتحاد الدولي للبيتومين
      </Interactive.Div>
      <Interactive.Div
        name="English name"
        style={{
          color: colors.muted,
          fontSize: 44,
          fontWeight: 400,
          letterSpacing: 10,
          textTransform: "uppercase",
          marginTop: 10,
          opacity: interpolate(frame, [40, 58], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Union International Bitumen Factory
      </Interactive.Div>
    </AbsoluteFill>
  );
};
