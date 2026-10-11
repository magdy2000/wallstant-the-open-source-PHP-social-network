import { AbsoluteFill } from "remotion";
import { Caption } from "../components/Caption";
import { Footage } from "../components/Footage";

export const SystemScene: React.FC = () => (
  <AbsoluteFill>
    <Footage fromSeconds={2.6} playbackRate={0.8} zoom={[1.06, 1.16]} origin="40% 45%" />
    <Caption
      kicker="نظام عزل متكامل"
      title="اللفائف البيتومينية + برايمر D41"
      subtitle="دهان أساس أسفلتي لالتصاق مثالي"
    />
  </AbsoluteFill>
);
