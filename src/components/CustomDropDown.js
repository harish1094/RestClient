import PropTypes from "prop-types";
import Select from "react-select";
import '../css/app.css';

/**
 * DropDown Selection Component for option selection
 * @param id Id for label
 * @param placeholder Label text
 * @param options Drop down options
 * @param isSearchable bool value to enable/disble search
 * @param onChange callback for on select
 * @param invalid Values invalid or not yet selected
 * @param value Selected value 
 * @returns ```<Select />```
 */
const CustomDropDown = ({ id, placeholder, options, isSearchable,
    onChange, invalid, value }) => {
    /** Custom style for Select component
     *  
     *  Highlighting the border with red if the column
     *  is not selected
     */
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: invalid ? "1px solid #dc3545" :
                "1px solid #001e3c",
            boxShadow: "none",
            "&:hover": {
                boxShadow: "0 0 10px #2564eb2c",
            }
        }),
        placeholder: (defaultStyles) => ({
            ...defaultStyles,
            whiteSpace: "nowrap"
        }),
        option: (provided, state) => ({
            ...provided,
            color: "hsl(0, 0%, 20%)",
            backgroundColor: state.isSelected ? "#2564eb5d" : null,
            "&:hover": {
                backgroundColor: "#2564eb2c"
            },
            whiteSpace: "nowrap"
        })
    };

    return (
        <Select
            id={id}
            key={id}
            styles={customStyles}
            options={options}
            isSearchable={isSearchable}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

CustomDropDown.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    isSearchable: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    invalid: PropTypes.bool,
    value: PropTypes.any.isRequired,
};

CustomDropDown.defaultProps = {
    isSearchable: false,
    invalid: false
};

export default CustomDropDown;