/* eslint-disable jsx-a11y/no-onchange */
import React, { memo, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import "react-tabs/style/react-tabs.css";
// import "./TransactionStyle.css";

Modal.setAppElement("#root");

function Delete({ isOpen, onRequestClose }) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const onOpenCategoryModal = () => {
    setIsCategoryOpen(true);
  };
  const onCloseCategoryModal = () => setIsCategoryOpen(false);

  return (
    <>
      <Modal
        className="custom-style"
        isOpen={isOpen}
        // style={customStyles}
        onRequestClose={onRequestClose}
      >
        <div className="btn-group">
          <button onClick={onRequestClose} className="btn">
            <span className="btn-text-cancel">CANCEL</span>
          </button>
        </div>
      </Modal>
    </>
  );
}

export default memo(Delete);
