import { IconType } from "../../components/web/svg/svg";

import style from "./loader.module.css";

type LoaderBerdikarierTrees = "root" | "wrap" | "inner" | "orbit" | "icon";
export interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}
interface LoaderBerdikarierProps {
  classNames?: Partial<Record<LoaderBerdikarierTrees, string>>;
  styles?: Partial<Record<LoaderBerdikarierTrees, CSSProperties>>;
  icon?: IconType;
}

export function LoaderOrbit({ classNames, styles, icon: Icon }: LoaderBerdikarierProps) {
  return (
    <div className={[style.loader_root, classNames?.root].join(" ")} style={styles?.root}>
      <div className={[style.loader_wrap, classNames?.wrap].join(" ")} style={styles?.wrap}>
        <span
          data-loader-type="orbit-rotate"
          className={[style.orbit_rotate_wrap, classNames?.inner].join(" ")}
          style={styles?.inner}
        >
          <span className={[style.orbit, classNames?.orbit].join(" ")} style={styles?.orbit} />
          <span className={[style.orbit, classNames?.orbit].join(" ")} style={styles?.orbit} />
        </span>
        {Icon && <Icon size={42} className={classNames?.icon} style={styles?.icon} />}
      </div>
    </div>
  );
}
