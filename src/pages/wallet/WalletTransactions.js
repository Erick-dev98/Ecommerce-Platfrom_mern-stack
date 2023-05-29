import React from "react";
import "./WalletTransactions.scss";

const WalletTransactions = ({ transactions, user }) => {
  return (
    <div className="wallet-transactions">
      <hr />
      <br />
      <h3>Transactions</h3>
      <div className={"table"}>
        {transactions.length === 0 ? (
          <p>No order found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Date</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Ref Account</th>
                <th>Description</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => {
                const {
                  _id,
                  createdAt,
                  amount,
                  sender,
                  receiver,
                  description,
                  status,
                } = transaction;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{createdAt}</td>
                    <td>{_id}</td>
                    <td>
                      {"$"}
                      {amount}
                    </td>
                    <td>{sender === user.email ? "Debit" : "Credit"}</td>
                    <td>{sender === user.email ? receiver : sender}</td>
                    <td>{description}</td>
                    <td>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WalletTransactions;
