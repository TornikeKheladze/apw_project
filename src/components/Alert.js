import { useEffect, useRef, useState } from "react";

import classNames from "classnames";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

const Alert = (props) => {
  const {
    // title,
    // children,
    color = "primary",
    outlined,
    dismissable,
    message,
  } = props;

  const alertRef = useRef();

  const [isAlertActive, setIsAlertActive] = useState(false);

  const onEnter = () => {
    alertRef.current.style.opacity = 0;
    alertRef.current.style.height = 0;
  };

  const onEntering = () => {
    alertRef.current.style.opacity = 100;
    alertRef.current.style.height = alertRef.current.scrollHeight + "px";
  };

  const onEntered = () => {
    alertRef.current.style.removeProperty("opacity");
    alertRef.current.style.removeProperty("height");
  };

  const onExit = () => {
    alertRef.current.style.opacity = 100;
    alertRef.current.style.height = alertRef.current.scrollHeight + "px";
  };

  const onExiting = () => {
    alertRef.current.style.opacity = 0;
    alertRef.current.style.height = 0;
  };

  const onExited = () => {
    alertRef.current.style.removeProperty("opacity");
    alertRef.current.style.removeProperty("height");
  };
  useEffect(() => {
    if (message) {
      setIsAlertActive(true);
    } else {
      setIsAlertActive(false);
    }
  }, [message]);

  return (
    <CSSTransition
      nodeRef={alertRef}
      appear={isAlertActive}
      in={isAlertActive}
      timeout={200}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
      unmountOnExit
    >
      <div
        ref={alertRef}
        className="alert-wrapper fixed bottom-6 right-6 w-80 z-50"
      >
        <div
          className={classNames("alert", `alert_${color}`, {
            alert_outlined: outlined,
          })}
        >
          {message}
          {dismissable ? (
            <button
              className="dismiss la la-times p-0 mt-0 mr-0"
              onClick={() => setIsAlertActive(false)}
            ></button>
          ) : null}
        </div>
      </div>
    </CSSTransition>
  );
};

Alert.propTypes = {
  title: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
  ]),
  outlined: PropTypes.bool,
  dismissable: PropTypes.bool,
};

export default Alert;
