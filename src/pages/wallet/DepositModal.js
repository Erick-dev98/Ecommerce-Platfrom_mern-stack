import React, { useEffect, useRef } from "react";
import "./DepositModal.scss";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";

const DepositModal = ({
  closeModal,
  onSubmit,
  handleDepositChange,
  deposit,
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section className="--100vh modal-section cm" onClick={closeModal}>
      <div className="--flex-center modal ">
        <div className="--bg-light --p --card modal-content">
          <AiOutlineClose
            color="red"
            size={16}
            className="close-icon cm"
            onClick={closeModal}
          />
          <div className="--flex-start modal-head --my">
            <AiOutlineInfoCircle color="orangered" size={18} />
            <h3 className="--text-p --ml">Send Money To Someone.</h3>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <p className="req">
                <label>Amount</label>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Amount"
                  required
                  name="amount"
                  value={deposit.amount}
                  onChange={handleDepositChange}
                />
              </p>
              <p>
                <label htmlFor={"stripe"} className="radio-label">
                  <input
                    className="radio-input"
                    type="radio"
                    name={"paymentMethod"}
                    id={"stripe"}
                    value={"stripe"}
                    onChange={handleDepositChange}
                  />
                  <span className="custom-radio" />
                  Stripe
                </label>
                <br />
                <label htmlFor={"flutterwave"} className="radio-label">
                  <input
                    className="radio-input"
                    type="radio"
                    name={"paymentMethod"}
                    id={"flutterwave"}
                    value={"flutterwave"}
                    onChange={handleDepositChange}
                  />
                  <span className="custom-radio" />
                  Flutterwave
                </label>
              </p>
              <br />
              <span className="--flex-end modal-footer">
                <button className="--btn --btn-lg cm" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="--btn --btn-primary --btn-lg">
                  Proceed
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositModal;
