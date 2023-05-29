import React, { useEffect, useState } from "react";
import PageMenu from "../../components/pageMenu/PageMenu";
import "./Wallet.scss";
import mcImg from "../../assets/mc_symbol.png";
import paymentImg from "../../assets/payment.svg";
import {
  AiFillDollarCircle,
  AiFillGift,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import { RiExchangeDollarLine } from "react-icons/ri";
import { FaRegPaperPlane } from "react-icons/fa";
import WalletTransactions from "./WalletTransactions";
import TransferModal from "./TransferModal";
import {
  RESET_TRANSACTION_MESSAGE,
  getUserTransactions,
  selectTransactionMessage,
  selectTransactions,
  transferFund,
  verifyAccount,
} from "../../redux/features/transaction/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authService";
import { getUser, selectUser } from "../../redux/features/auth/authSlice";
import DepositModal from "./DepositModal";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../utils";

const transactions = [
  {
    _id: 123456,
    date: "31-2-2023",
    amount: 100,
    type: "credit",
    ref_acc: "Akpareva Ewomazino",
    ref: "Stripe Deposit",
    status: "Success",
  },
];

const initialState = {
  amount: 0,
  sender: "",
  receiver: "",
  description: "",
  status: "",
};

const initialDepositState = {
  amount: 0,
  paymentMethod: "",
};

const Wallet = () => {
  const dispatch = useDispatch();
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [deposit, setDeposit] = useState(initialDepositState);
  const [isVerified, setIsVerified] = useState(false);
  const [transferData, setTransferData] = useState(initialState);
  const { amount, sender, receiver, description, status } = transferData;
  const { amount: depositAmount, paymentMethod } = deposit;
  const transactionMessage = useSelector(selectTransactionMessage);
  const transactionss = useSelector(selectTransactions);
  const user = useSelector(selectUser);

  const [urlParams] = useSearchParams();
  const payment = urlParams.get("payment");
  const url = window.location.href;
  console.log(url);

  useEffect(() => {
    if (payment === "successful") {
      toast.success("Payment successful");
    }
    if (payment === "failed") {
      toast.success("Payment Failed, please try again later");
    }
  }, [payment]);

  useEffect(() => {
    if (user === {}) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  const closeModal = (e) => {
    if (e.target.classList.contains("cm")) {
      console.log("cm here");
      setShowTransferModal(false);
      setShowDepositModal(false);
      setTransferData({ ...initialState });
      setDeposit({ ...initialDepositState });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
    setIsVerified(false);
    dispatch(RESET_TRANSACTION_MESSAGE());
  };
  const handleDepositChange = (e) => {
    const { name, value } = e.target;
    setDeposit({ ...deposit, [name]: value });
  };

  const transferMoney = async (e) => {
    e.preventDefault();
    if (amount < 1) {
      return toast.error("Please enter a valid amount");
    }
    if (!description) {
      return toast.error("Please enter a description");
    }

    const formData = {
      ...transferData,
      sender: user.email,
      status: "Success",
    };
    dispatch(transferFund(formData));
  };

  const verifyUserAccount = async () => {
    console.log("Verify Account");
    if (receiver === "") {
      return toast.error("Please add receivers account");
    }
    if (!validateEmail(receiver)) {
      return toast.error("Please add a valid account email");
    }
    const formData = {
      receiver,
    };
    console.log(formData);

    dispatch(verifyAccount(formData));
  };

  useEffect(() => {
    if (transactionMessage === "Account Verification Successful") {
      setIsVerified(true);
    }
  }, [transactionMessage]);

  useEffect(() => {
    if (user !== null) {
      const formData = {
        email: user.email,
      };

      dispatch(getUserTransactions(formData));
    }
  }, [dispatch, user]);

  const makeDeposit = async (e) => {
    e.preventDefault();
    console.log(depositAmount);
    if (paymentMethod === "stripe") {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/transaction/depositFundStripe`,
        {
          amount: depositAmount,
        }
      );
      console.log(data);

      // window.open(data.url);
      window.location.href = data.url;
      return;
    }
    toast.error("Please select a payment method.");
  };

  return (
    <>
      <section>
        {/* {isLoading && <Loader />} */}
        <div className="container">
          <PageMenu />
          <div className="wallet">
            <div className="wallet-data --flex-start --flex-dir-column">
              <div className="wallet-info --card --mr">
                <span>Good Morning...</span>
                <h4>{user?.name}</h4>
                <hr />
                <span className="--flex-between">
                  <p>Account Balance</p>
                  <img alt="mc" src={mcImg} width={50} />
                </span>
                <h4>${user?.balance?.toFixed(2)}</h4>
                <div className="buttons --flex-center">
                  <button
                    className="--btn --btn-primary"
                    onClick={() => setShowDepositModal(true)}
                  >
                    <AiOutlineDollarCircle /> &nbsp; Deposit Money
                  </button>
                  <button
                    className="--btn --btn-danger"
                    onClick={() => setShowTransferModal(true)}
                  >
                    <FaRegPaperPlane /> &nbsp; Transfer
                  </button>
                </div>
              </div>

              <div className="wallet-promo --flex-between --card">
                <div className="wallet-text">
                  <span className="--flex-start">
                    <AiFillDollarCircle size={25} color="#ff7722" />
                    <h4>Shopito Wallet</h4>
                  </span>
                  <span className="--flex-start">
                    <h4>Cashback up to 80%</h4>
                    <AiFillGift size={20} color="#007bff" />
                  </span>
                  <span>
                    Use your shopito wallet at checkout and get up to 80%
                    cashback.
                  </span>
                </div>
                <div className="wallet-img">
                  <img src={paymentImg} alt="pay" width={150} />
                </div>
              </div>
            </div>
            {user !== null && (
              <WalletTransactions transactions={transactionss} user={user} />
            )}
          </div>
          {showTransferModal && (
            <TransferModal
              closeModal={closeModal}
              transferData={transferData}
              handleInputChange={handleInputChange}
              handleAccountChange={handleAccountChange}
              onSubmit={transferMoney}
              verifyUserAccount={verifyUserAccount}
              isVerified={isVerified}
            />
          )}
          {showDepositModal && (
            <DepositModal
              closeModal={closeModal}
              handleDepositChange={handleDepositChange}
              onSubmit={makeDeposit}
              deposit={deposit}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Wallet;
