import React, { useState } from "react";

export default function PaymentModal({ total, onClose, onConfirm }) {
  const [cash, setCash] = useState(0);
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);

  // Fees
  const creditFee = Number(credit) * 0.02;
  const debitFee = Number(debit) * 0.02;

  const totalPayment =
    Number(cash) +
    Number(credit) +
    Number(debit) +
    creditFee +
    debitFee;

  function confirm() {
    if (totalPayment < total) {
      alert(`Payment is less than total due (${total.toFixed(2)}).`);
      return;
    }

    onConfirm({
      cash: Number(cash),
      credit: Number(credit),
      debit: Number(debit),
      creditFee,
      debitFee,
      totalPayment,
    });
  }

  return (
    <div className="overlay">
      <div className="modal-card wide">
        <h3>Payment</h3>

        <p className="due-box">Total Due: ${total.toFixed(2)}</p>

        <div className="form-grid">
          <label>
            Cash
            <input
              type="number"
              min="0"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
            />
          </label>

          <label>
            Credit (+2% fee)
            <input
              type="number"
              min="0"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
            />
          </label>

          <label>
            Debit (+2% fee)
            <input
              type="number"
              min="0"
              value={debit}
              onChange={(e) => setDebit(e.target.value)}
            />
          </label>
        </div>

        <div className="totals-small">
          <div>Credit Fee: ${creditFee.toFixed(2)}</div>
          <div>Debit Fee: ${debitFee.toFixed(2)}</div>
          <div className="total-box">Total Payment: ${totalPayment.toFixed(2)}</div>
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={confirm}>Confirm Payment</button>
          <button className="btn clear-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
