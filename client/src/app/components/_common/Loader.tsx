interface props {
  size?: "small" | "medium" | "large";
  color?: string
}

const Loader = ({ size = "medium", color }: props): JSX.Element => (
  <div
    className={`mx-auto rounded-full border-2 border-gray-200 animate-spin ${size === "small"
      ? "h-6 w-6"
      : size === "medium"
        ? "h-12 w-12"
        : size === "large"
          ? "h-16 w-16"
          : "h-7 w-7"
      } ${color ? color : 'border-t-red-600'}`}
  ></div>
);

export default Loader;
