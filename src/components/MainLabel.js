import PropTypes from "prop-types";
import '../css/app.css';

/**
 * Label Component for header text, Title text
 *  
 * @param id Id for label
 * @param title Label text
 * @param className  css class name
 * @returns ```<h2>{text}<h2>```
 */
const MainLabel = ({ id, title, className }) => {
  return (
    <span id={id} className={"main-lable " + className}>{title}</span>
  )
}

MainLabel.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  className: PropTypes.string
};

MainLabel.defaultProps = {
  id: "label-text",
  className: ""
};

export default MainLabel;