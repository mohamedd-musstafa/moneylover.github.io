import React, { useState } from "react";
import Icon from "../../assets/images/";

const usePasswordToggle = () => {
  const [visible, setVisibility] = useState(false);
  const inputType = visible ? "text" : "password";
  return [inputType, eye];
};

export default usePasswordToggle;
