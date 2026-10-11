import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Caption } from "../components/Caption";
import { Footage } from "../components/Footage";
import { colors, fontFamily, useIsVertical } from "../theme";

const features = ["عزل مائي فعّال", "متانة عالية", "سهولة في التركيب"];

export const SiteScene: React.FC = () => {
  const frame = useCurrentFrame();
  const vertical = useIsVertical();

  return (
    <AbsoluteFill>
      <Footage fromSeconds={5.5} zoom={[1.04, 1.12]} focusX={vertical ? 0.36 : 0.42} />
      <Caption kicker="في الموقع" title="تنفيذ احترافي للمشاريع الكبرى" />
      <AbsoluteFill
        style={{
          fontFamily,
          direction: "rtl",
          padding: vertical ? "250px 90px" : "110px 140px",
          alignItems: vertical ? "flex-end" : "flex-start",
          gap: 22,
        }}
      >
        {features.map((f, i) => {
          const start = 40 + i * 12;
          return (
            <Interactive.Div
              key={f}
              name={`Feature ${i + 1}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "16px 34px",
                borderRadius: 999,
                backgroundColor: "rgba(10,10,12,0.72)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: colors.ink,
                fontSize: 44,
                fontWeight: 700,
                opacity: interpolate(
                  frame,
                  [start, start + 14, 132, 146],
                  [0, 1, 1, 0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                ),
                translate: interpolate(
                  frame,
                  [start, start + 20],
                  ["-80px 0px", "0px 0px"],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  },
                ),
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: colors.accent,
                }}
              />
              {f}
            </Interactive.Div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
