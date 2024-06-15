import { AnimatedSpiralWordsType } from "../../../hooks/use-animated/use-animated-spiral-words";

import { AnimatedRunningWordsType } from "../../../hooks/use-animated/use-animated-running-words";

import { AnimatedTypingWordsType } from "../../../hooks/use-animated/use-animated-typing-words";

export type AnimTextAllTypes =
  | (AnimatedTypingWordsType & { anim: "typing" })
  | (AnimatedRunningWordsType & { anim: "running" })
  | (AnimatedSpiralWordsType & { anim: "spiral" });
