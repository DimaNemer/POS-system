import React from "react";

/*
  Line in transaction list. Shows qty and item totals.
*/
export default function TransactionItem({ item, onRemove }) {
  const lineTotal = (item.amount + item.fee) * item.quantity;
  return (
    <div className="transaction-card">
      <div>
        <div className="tx-title">{item.name}</div>
        <div className="tx-meta">Price: ${item.amount} • Fee: ${item.fee} • Qty: {item.quantity}</div>
      </div>
      <div className="tx-right">
        <div className="tx-total">${lineTotal.toFixed(2)}</div>
        <button className="btn clear-btn" onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </div>
  );
}
