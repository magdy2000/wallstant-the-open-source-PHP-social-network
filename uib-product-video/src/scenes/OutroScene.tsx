import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Footage } from "../components/Footage";
import { Logo } from "../components/Logo";
import { colors, fontFamily, useIsVertical } from "../theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const vertical = useIsVertical();
  const fade = (s: number) =>
    interpolate(frame, [s, s + 18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, fontFamily }}>
      <AbsoluteFill style={{ filter: "blur(18px)", opacity: 0.35 }}>
        <Footage
          fromSeconds={16}
          playbackRate={0.6}
          zoom={[1.15, 1.25]}
          focusX={0.6}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: "rgba(8,8,10,0.6)" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Interactive.Div
          name="Logo"
          style={{
            scale: interpolate(frame, [0, 26], [0.7, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 14 }),
              output: "perceptual-scale",
            }),
            opacity: fade(0),
            marginBottom: 50,
          }}
        >
          <Logo size={0.85} />
        </Interactive.Div>
        <Interactive.Div
          name="Tagline"
          style={{
            color: colors.ink,
            fontSize: 96,
            fontWeight: 900,
            direction: "rtl",
            opacity: fade(14),
            translate: interpolate(frame, [14, 38], ["0px 40px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: ease,
            }),
          }}
        >
          عزل يُعتمد عليه
        </Interactive.Div>
        <Interactive.Div
          name="Company"
          style={{
            color: colors.accent,
            fontSize: 50,
            fontWeight: 700,
            direction: "rtl",
            marginTop: 6,
            opacity: fade(26),
          }}
        >
          مصنع الاتحاد الدولي للبيتومين
        </Interactive.Div>
        <Interactive.Div
          name="Contact"
          style={{
            display: "flex",
            flexDirection: vertical ? "column" : "row",
            gap: vertical ? 14 : 30,
            alignItems: "center",
            marginTop: 50,
            padding: vertical ? "26px 60px" : "18px 44px",
            borderRadius: vertical ? 48 : 999,
            border: "1px solid rgba(255,255,255,0.25)",
            backgroundColor: "rgba(255,255,255,0.06)",
            color: colors.ink,
            fontSize: 44,
            fontWeight: 400,
            direction: "ltr",
            opacity: fade(40),
          }}
        >
          www.uib.com.sa
          <div
            style={{
              width: vertical ? 300 : 2,
              height: vertical ? 2 : 40,
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
          />
          info@uib.com.sa
        </Interactive.Div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          backgroundColor: "black",
          opacity: interpolate(frame, [120, 140], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
