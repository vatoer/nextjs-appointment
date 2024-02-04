import { forwardRef } from "react";


const InputDtPicker = forwardRef((props, ref) => {
  return (
    <div>
      <input type="text" ref={ref} {...props} />
    </div>
  );
}
export default InputDtPicker;
