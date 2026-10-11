import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill, staticFile } from "remotion";
import { CloseUpScene } from "./scenes/CloseUpScene";
import { FinishScene } from "./scenes/FinishScene";
import { IntroScene } from "./scenes/IntroScene";
import { OutroScene } from "./scenes/OutroScene";
import { SiteScene } from "./scenes/SiteScene";
import { SystemScene } from "./scenes/SystemScene";
import { colors, SCENES, TRANSITION } from "./theme";

const timing = linearTiming({ durationInFrames: TRANSITION });

export const UibPromo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.bg }}>
    <TransitionSeries>
      <TransitionSeries.Sequence name="Intro" durationInFrames={SCENES.intro}>
        <IntroScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={timing} />
      <TransitionSeries.Sequence
        name="Close-up"
        durationInFrames={SCENES.closeUp}
      >
        <CloseUpScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-left" })}
        timing={timing}
      />
      <TransitionSeries.Sequence name="System" durationInFrames={SCENES.system}>
        <SystemScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={timing} />
      <TransitionSeries.Sequence name="Site" durationInFrames={SCENES.site}>
        <SiteScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-left" })}
        timing={timing}
      />
      <TransitionSeries.Sequence name="Finish" durationInFrames={SCENES.finish}>
        <FinishScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={timing} />
      <TransitionSeries.Sequence name="Outro" durationInFrames={SCENES.outro}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Audio src={staticFile("music.wav")} volume={0.8} />
  </AbsoluteFill>
);
