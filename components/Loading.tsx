import React from "react";
import { Svg, Path } from "react-native-svg";

const Loading = () => {
  return (
    <Svg
      height="30"
      width="30"
      viewBox="0 0 24 24"
      style={{ transform: [{ rotate: "0deg" }] }}
    >
      <Path
        fill="currentColor"
        fillOpacity="0.2"
        d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        clipRule="evenodd"
      />
      <Path
        fill="currentColor"
        d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
      />
    </Svg>
  );
};

export default Loading;
