import React from "react";
import { TailSpin, Style } from "react-loader-spinner";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  style?: Style;
  height?: number;
  width?: number;
  color?: string;
};

function Spinner({ className, style, height, width, color }: Props) {
  return (
    <TailSpin
      visible={true}
      height={height ?? "80"}
      width={width ?? "100"}
      color={color ?? "#000"}
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={style}
      wrapperClass={className}
    />
  );
}

export default Spinner;
