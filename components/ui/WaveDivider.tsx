import type { WaveDividerProps } from "@/lib/types";

export default function WaveDivider({ fillColor, flipY = false }: WaveDividerProps) {
  return (
    <div
      className={`pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden leading-none ${
        flipY ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-12 w-full md:h-16"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40C120 70 240 10 360 40C480 70 600 10 720 40C840 70 960 10 1080 40C1200 70 1320 10 1440 40V80H0V40Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
