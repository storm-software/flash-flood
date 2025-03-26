/* -------------------------------------------------------------------

                 ⚡ Storm Software - Pump Dot Dump

 This code was released as part of the Pump Dot Dump project. Pump Dot Dump
 is maintained by Storm Software under the Apache-2.0 License, and is
 free for commercial and private use. For more information, please visit
 our licensing page.

 Website:         https://stormsoftware.com
 Repository:      https://github.com/storm-software/pump-dot-dump
 Documentation:   https://stormsoftware.com/projects/pump-dot-dump/docs
 Contact:         https://stormsoftware.com/contact
 License:         https://stormsoftware.com/projects/pump-dot-dump/license

 ------------------------------------------------------------------- */

import type { SVGProps } from "react";

export type EthereumLogoProps = SVGProps<SVGSVGElement> & {
  grayscale?: boolean;
};

export const EthereumLogo = ({ grayscale, ...props }: EthereumLogoProps) => {
  let color0 = "#8A92B2";
  let color1 = "#62688F";
  let color2 = "#454A75";

  if (grayscale) {
    color0 = "#8C8C8C";
    color1 = "#343434";
    color2 = "#303030";
  }

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 327.5 533.3"
      {...props}>
      <path fill={color0} d="M163.7,197.2V0L0,271.6L163.7,197.2z" />
      <path
        fill={color1}
        d="M163.7,368.4V197.2L0,271.6L163.7,368.4z M163.7,197.2l163.7,74.4L163.7,0V197.2z"
      />
      <path fill={color2} d="M163.7,197.2v171.2l163.7-96.8L163.7,197.2z" />
      <path fill={color0} d="M163.7,399.4L0,302.7l163.7,230.7V399.4z" />
      <path fill={color1} d="M327.5,302.7l-163.8,96.7v134L327.5,302.7z" />
    </svg>
  );
};
