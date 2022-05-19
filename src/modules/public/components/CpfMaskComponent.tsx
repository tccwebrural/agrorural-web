import React from "react";
import { IMaskInput } from "react-imask";
import { PhoneModel } from "../models/PhoneModel";
const CpfMaskComponent = React.forwardRef<HTMLElement, PhoneModel>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000.000.000-00"
        definitions={{
          "#": /[1-9]/,
        }}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);
export { CpfMaskComponent };
