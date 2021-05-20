import React, { useState, useImperativeHandle } from "react";
import Button from "@material-ui/core/Button";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleVisibility}
          id={`open-modal`}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          onClick={toggleVisibility}
          id={`close-modal`}
        >
          cancel
        </Button>
      </div>
    </div>
  );
});

export default Togglable;
