import { Composition, Folder } from "remotion";
import { CloseUpScene } from "./scenes/CloseUpScene";
import { FinishScene } from "./scenes/FinishScene";
import { IntroScene } from "./scenes/IntroScene";
import { OutroScene } from "./scenes/OutroScene";
import { SiteScene } from "./scenes/SiteScene";
import { SystemScene } from "./scenes/SystemScene";
import { FPS, SCENES, TOTAL_FRAMES } from "./theme";
import { UibPromo } from "./UibPromo";

const size = { fps: FPS, width: 1920, height: 1080 };

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="UibPromo" component={UibPromo} durationInFrames={TOTAL_FRAMES} {...size} />
    <Folder name="Scenes">
      <Composition id="Intro" component={IntroScene} durationInFrames={SCENES.intro} {...size} />
      <Composition id="CloseUp" component={CloseUpScene} durationInFrames={SCENES.closeUp} {...size} />
      <Composition id="System" component={SystemScene} durationInFrames={SCENES.system} {...size} />
      <Composition id="Site" component={SiteScene} durationInFrames={SCENES.site} {...size} />
      <Composition id="Finish" component={FinishScene} durationInFrames={SCENES.finish} {...size} />
      <Composition id="Outro" component={OutroScene} durationInFrames={SCENES.outro} {...size} />
    </Folder>
  </>
);
