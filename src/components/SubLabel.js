import PropTypes from "prop-types";
import '../css/app.css';

/**
 * Label Component for sub heading text, subtitle text
 * @param id Id for label
 * @param title Label text
 * @param className  css class name
 * @returns ```<label>{text}<label>```
 */
const SubLabel = ({ id, title, className }) => {
  return (
    <label id={id} className={"sub-lable " + className}>{title}</label>
  )
}



SubLabel.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  className: PropTypes.string
};

SubLabel.defaultProps = {
  id: "label-text",
  className: ""
};

export default SubLabel;