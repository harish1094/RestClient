import PropTypes from "prop-types";
import "../css/app.css";

/**
 * Customized TextArea Component with label
 * @param id
 * @param name  Control Label
 * @param type Control type
 * @param className css class name
 * @param onChange  callback
 * @param value value
 * @param placeholder placeholder text
 * @param style custom style
 * @param rows no of lines
 * @returns ```<TextArea><TextArea>```
 */
const TextArea = ({
    id, name, style,
    type, className, onChange,
    value, placeholder, rows }) => {

    return (<textarea
        id={id}
        name={name}
        style={style}
        placeholder={placeholder}
        rows={rows}
        type={type}
        className={"form-control " + className}
        value={value}
        onChange={onChange}></textarea>
    );
};

TextArea.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    style: PropTypes.any,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.string,
};


TextArea.defaultProps = {
    style: {},
    className: "",
    placeholder: "",
    rows: "8"
};

export default TextArea;
