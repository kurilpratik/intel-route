import Link from "next/link";
import React from "react";

const LinkBtn = (props) => {
  return (
    <Link
      href={props.route}
      className="font-bold font-mono text-blue-500 hover:text-blue-600 border border-blue-300 p-2"
    >
      Go to {props.route === "/" ? "Home" : `${props.route}`}
    </Link>
  );
};

export default LinkBtn;
