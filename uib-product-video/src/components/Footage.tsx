import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const SOURCE_ASPECT = 848 / 478;

// Graded, slowly pushing-in shot from the source footage.
export const Footage: React.FC<{
  fromSeconds: number;
  playbackRate?: number;
  zoom?: [number, number];
  origin?: string;
  // Horizontal point of interest (0 = left, 1 = right) kept in frame when the
  // 16:9 source is cropped into a taller composition.
  focusX?: number;
}> = ({
  fromSeconds,
  playbackRate = 1,
  zoom = [1.04, 1.14],
  origin = "50% 50%",
  focusX = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const videoWidth = Math.max(width, height * SOURCE_ASPECT);
  const videoHeight = videoWidth / SOURCE_ASPECT;

  return (
    <AbsoluteFill style={{ backgroundColor: "black", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transformOrigin: origin,
          scale: interpolate(frame, [0, durationInFrames], zoom, {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.33, 0, 0.67, 1),
          }),
        }}
      >
        <div
          style={{
            position: "absolute",
            width: videoWidth,
            height: videoHeight,
            left: -(videoWidth - width) * focusX,
            top: (height - videoHeight) / 2,
          }}
        >
          <Video
            src={staticFile("footage.mp4")}
            trimBefore={Math.round(fromSeconds * fps)}
            playbackRate={playbackRate}
            objectFit="cover"
            muted
            style={{
              width: "100%",
              height: "100%",
              filter: "contrast(1.12) saturate(1.08) brightness(0.95)",
            }}
          />
        </div>
      </AbsoluteFill>
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
