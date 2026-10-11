import { AbsoluteFill } from "remotion";
import { Caption } from "../components/Caption";
import { Footage } from "../components/Footage";

export const FinishScene: React.FC = () => (
  <AbsoluteFill>
    <Footage fromSeconds={14.8} playbackRate={0.9} zoom={[1.03, 1.12]} origin="50% 60%" />
    <Caption kicker="النتيجة" title="أسطح محمية لسنوات" subtitle="حماية تدوم… وثقة تُبنى" />
  </AbsoluteFill>
);
