import { AnimatedRunningWordsType } from "./use-animated-running-words";

import { AnimatedTypingWordsType } from "./use-animated-typing-words";

export type AnimTextAllTypes =
  | (AnimatedTypingWordsType & { anim: "typing" })
  | (AnimatedRunningWordsType & { anim: "running" });
