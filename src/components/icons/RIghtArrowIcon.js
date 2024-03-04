import React from "react";

const RightArrowIcon = () => {
  const svgRef = React.createRef();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      height="18px"
      ref={svgRef}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M184 112l144 144-144 144"
      />
    </svg>
  );
};

export default RightArrowIcon;
