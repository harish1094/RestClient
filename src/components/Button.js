import PropTypes from "prop-types";
import "../css/app.css";

/**
 * Customized button component
 *
 *  This component can be used for all outline and filled button.
 * 
 * className should be either primary-button or primary-button-outlined,
 * Along with this className, other className can be added based on UI requirement
 * 
 * @param id Component id
 * @param title Button Label
 * @param onClick onClick Event
 * @param className css class name
 * @param style css  
 * @param variant Variant
 * @param disabled Button status disabled or enables
 * @returns ```<button></button>``` 
 */
const CustomButton = ({ id, title, onClick, className,
  variant, disabled, style }) => {
  return (
    <button
      id={id}
      className={className}
      size="lg"
      style={style}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

CustomButton.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  style: PropTypes.any
};

CustomButton.defaultProps = {
  disabled: false,
  style: {}
}

export default CustomButton;
