import { AbsoluteFill } from "remotion";
import { Caption } from "../components/Caption";
import { Footage } from "../components/Footage";

export const CloseUpScene: React.FC = () => (
  <AbsoluteFill>
    <Footage
      fromSeconds={0}
      playbackRate={0.55}
      zoom={[1.18, 1.05]}
      origin="50% 40%"
      focusX={0.45}
    />
    <Caption
      kicker="لفائف العزل المائي"
      title="جودة تبدأ من التفاصيل"
      subtitle="تسليح بوليستر 160 جرام"
    />
  </AbsoluteFill>
);
