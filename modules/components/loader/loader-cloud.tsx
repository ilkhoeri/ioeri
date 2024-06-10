import c from "./loader.module.css";

export function LoaderCloud() {
  return (
    <svg
      viewBox="-4 -4 151 100"
      color="currentColor"
      preserveAspectRatio="xMidYMid"
      data-test="progress"
      className={c.cloudsvg}
    >
      <path
        d="M121.663 90.638c-1.796 0-99.33-.498-101.474-1.478C8.685 83.877 1.25 72.196 1.25 59.396c0-16.656 12.797-30.61 29.052-32.323 7.49-15.706 23.186-25.707 40.714-25.707 20.98 0 39.215 14.752 43.945 34.907 15.09.245 27.29 12.63 27.29 27.822 0 11.968-7.738 22.55-19.256 26.33"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        fillRule="evenodd"
        className={c.cloudpath}
      />
    </svg>
  );
}
