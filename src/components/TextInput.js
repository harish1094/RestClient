import PropTypes from "prop-types";
import "../css/app.css";

/**
 * Customized TextInput Component with label
 * @param id
 * @param name  Control Label
 * @param type Control type
 * @param className css class name
 * @param onChange  callback
 * @param value value
 * @param placeholder placeholder text
 * @param style custom style
 * @param readOnly bool
 * @returns ```<TextInput><TextInput>```
 */
const TextInput = ({
  id, name, style, readOnly,
  type, className, onChange,
  value, placeholder }) => {

  return (<input
    id={id}
    name={name}
    style={style}
    placeholder={placeholder}
    type={type}
    className={"form-control " + className}
    value={value}
    readOnly={readOnly}
    onChange={onChange}></input>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  style: PropTypes.any,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string
};


TextInput.defaultProps = {
  style: {},
  className: "",
  placeholder: "",
  readOnly: false
};

export default TextInput;
