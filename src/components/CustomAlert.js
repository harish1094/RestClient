import PropTypes from "prop-types";
import {
  Modal,
  ModalBody, ModalFooter,
  ModalHeader, ModalTitle
} from "react-bootstrap";
import '../css/app.css';
import CustomButton from "./Button";

/**
 * Custom Alert dialog box
 *
 * @param title text
 * @param description text
 * @param show boolean
 * @param handleClose callback for close
 * @returns ```Custom Alert dialog```
 */

const CustomAlert = ({ title, description, show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader className="wrap-text">
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody className="wrap-text">
        {description}
      </ModalBody>
      <ModalFooter >
        <CustomButton id={"Close"}
          title={"Close"}
          onClick={handleClose}
          className="primary-button" />
      </ModalFooter>
    </Modal>
  );
};

CustomAlert.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

CustomAlert.defaultProps = {
  title: "Error",
  description: "Something went wrong!!",
}

export default CustomAlert;
