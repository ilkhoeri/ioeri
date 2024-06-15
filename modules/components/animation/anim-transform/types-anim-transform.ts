import * as React from "react";

import type { CSSProperties, Globals } from "../../../types/shared";
import type { DispatchType } from "../../../types/dispatch";

export type TransformProps = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "style"> &
  DispatchType & {
    el?: React.ElementType;
    ref?: React.Ref<HTMLElement>;
    style?: CSSProperties;
    /**
     *### opacity is number
     *```js
     * value : 0.1 - 1
     * default_value : 1 (for before animation)
     *```
     */
    opacity?: {
      before?: number | string;
      after?: number | string;
    };
    /**
     *### withoutOpacity is boolean
     *```js
     * default_value :
     * before_animation = 0
     * after_animation = 1
     *```
     */
    withoutOpacity?: boolean;
    /**
     *### hold is number
     *```js
     * value : 0.1 - 1
     * default_value : 0.1
     *```
     */
    hold?: number;
    /**
     *```js
     * default_value :
     * "opacity 0.5s ease, all 1s ease"
     *```
     */
    // transition?: string;
    /**
   *### transform is short set transform style
   *```js
   * default_value :
    --transform-before: scale(0);
    --transform-after: scale(1);
    --transform-origin: bottom;
    --transform-delay: 0.3s;
   *```
   */
    transform?: {
      before?: "scale(0)" | "translateY(6rem)" | "translateX(-6rem)" | "translateX(-2rem)" | "none" | (string & {});
      after?: "scale(1)" | "translateX(0)" | "translateY(0)" | "none" | (string & {});
      origin?: "0 0" | "center" | "top" | "right" | "bottom" | "left" | Globals | (string & {});
      box?: React.CSSProperties["transformBox"];
      style?: React.CSSProperties["transformStyle"];
    };

    transition?:
      | React.CSSProperties["transition"]
      | {
          /**
           * @extends
           * ```js
           * React.CSSProperties["transitionDelay"]
           * ```
           */
          delay?: React.CSSProperties["transitionDelay"] | string | number;
          /**
           * @extends
           * ```js
           * React.CSSProperties["transitionProperty"]
           * ```
           */
          property?: React.CSSProperties["transitionProperty"] | (string & {});
          /**
           * @extends
           * ```js
           * React.CSSProperties["transitionDuration"]
           * ```
           */
          duration?: React.CSSProperties["transitionDuration"] | (string & {});
          /**
           * @extends
           * ```js
           * React.CSSProperties["transitionTimingFunction"]
           * ```
           */
          timingFunction?: React.CSSProperties["transitionTimingFunction"] | (string & {});
          /**
           * @extends
           * ```js
           * React.CSSProperties["transitionBehavior"]
           * ```
           */
          behavior?: React.CSSProperties["transitionBehavior"] | (string & {});
        };
  };
