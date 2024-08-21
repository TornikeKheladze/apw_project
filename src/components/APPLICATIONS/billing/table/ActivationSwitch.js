import Tippy from "@tippyjs/react";
import Switch from "components/form/Switch";
import { useState } from "react";

const ActivationSwitch = ({ isActive, activate, data }) => {
  const [checked, setChecked] = useState(isActive);

  return (
    <Tippy
      theme="light-border tooltip"
      touch={["hold", 500]}
      offset={[0, 12]}
      interactive
      animation="scale"
      appendTo={document.body}
      content="სტატუსის გააქტიურება"
    >
      <Switch
        onChange={(e) => {
          setChecked(e.target.checked);
          activate(data.id);
        }}
        checked={checked}
      />
    </Tippy>
  );
};

export default ActivationSwitch;
