import PropTypes from "prop-types";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Modal,
  ModalBody, ModalFooter,
  ModalHeader, ModalTitle
} from "react-bootstrap";
import '../css/app.css';
import CustomButton from "./Button";

/**
 * `Confirmation Alert` dialog box
 *
 * React.forwardRef creates a React component that forwards the `ref`
 * attribute it receives to another component(parent) below in the tree
 * 
 * @param cancelText  label of cancel button
 * @param confirmText  label of confirmation button
 * @param handleClose callback for close
 * @param handleConfirm callback for confirmation
 * @param ref createRef/useRef, child component function controller
 * @returns ```Confirmation Alert dialog```
 */

const ConfirmationDialog = forwardRef((
  { cancelText, confirmText, handleClose, handleConfirm }, ref) => {

  const [showDialog, toggleDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(null);

  /**
   * `useImperativeHandle` should be used with `forwardRef`.
   * 
   * Function that defined inside the `useImperativeHandle` can be accessible
   * in parent class by using ref
   * 
   * toggleDialog can be accessed - this.<refName>.current.toggleDialog()
   * 
   * Title and description for the alert box and values for confirmation
   * can be passed as params 
   * this.<refName>.current.toggleDialog("Title", "Description for the alert", "value")
   */
  useImperativeHandle(ref, () => ({
    toggleDialog(title = "", description = "", value = null) {// Function that can be accessed in parent 
      setTitle(title);
      setDescription(description);
      toggleDialog(!showDialog);
      setValue(value);
    }
  }));

  return (
    <Modal
      show={showDialog}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader >
        <ModalTitle className="wrap-text">{title}</ModalTitle>
      </ModalHeader>
      <ModalBody className="wrap-text">
        {description}
      </ModalBody>
      <ModalFooter >
        <CustomButton id={cancelText}
          title={cancelText}
          onClick={handleClose}
          className="primary-button-outlined" />
        <CustomButton id={confirmText}
          title={confirmText}
          onClick={() => handleConfirm(value)}
          className="primary-button" />
      </ModalFooter>
    </Modal>
  );
});

ConfirmationDialog.propTypes = {
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired
};

ConfirmationDialog.defaultProps = {
  cancelText: "Cancel",
  confirmText: "OK"
}

export default ConfirmationDialog;
