import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fontFamily } from "../theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

// Lower-third style caption, right-aligned for Arabic (RTL).
export const Caption: React.FC<{
  kicker: string;
  title: string;
  subtitle?: string;
  delay?: number;
}> = ({ kicker, title, subtitle, delay = 8 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const out = durationInFrames - 18;

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        direction: "rtl",
        justifyContent: "flex-end",
        padding: "0 140px 130px 140px",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0) 65%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 10,
          opacity: interpolate(frame, [out, out + 14], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Kicker"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: colors.accent,
            fontSize: 38,
            fontWeight: 700,
            opacity: interpolate(frame, [delay, delay + 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              height: 6,
              borderRadius: 3,
              backgroundColor: colors.accent,
              width: interpolate(frame, [delay, delay + 20], [0, 90], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: ease,
              }),
            }}
          />
          {kicker}
        </Interactive.Div>
        <div style={{ overflow: "hidden", paddingBottom: 8 }}>
          <Interactive.Div
            name="Title"
            style={{
              color: colors.ink,
              fontSize: 104,
              fontWeight: 900,
              lineHeight: 1.25,
              textShadow: "0 6px 30px rgba(0,0,0,0.5)",
              translate: interpolate(frame, [delay + 4, delay + 26], ["0px 140px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: ease,
              }),
            }}
          >
            {title}
          </Interactive.Div>
        </div>
        {subtitle ? (
          <Interactive.Div
            name="Subtitle"
            style={{
              color: colors.muted,
              fontSize: 48,
              fontWeight: 400,
              opacity: interpolate(frame, [delay + 18, delay + 34], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(frame, [delay + 18, delay + 34], ["0px 20px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: ease,
              }),
            }}
          >
            {subtitle}
          </Interactive.Div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
