import React, { useRef} from "react";

/*
  Summary modal shows transaction snapshot and payment details.
  It includes a print button which prints only the summary (via CSS print rule).
  We expect props:
  - transaction: array of items (with qty) snapshot
  - payment: payment object (cash, credit, debit, fees, totalPayment)
  - onClose()
*/
export default function SummaryModal({ transaction = [], payment = {}, onClose }) {
  const printRef = useRef();

  // When printing, the CSS will make only #print-area visible.
  function handlePrint() {
    // give a moment to ensure print area is visible, then print
    window.print();
  }

  // compute transaction total as a double-check
  const txTotal = transaction.reduce((s, it) => s + (it.amount + it.fee) * it.quantity, 0);

  return (
    <div className="overlay">
      <div className="modal-card wide">
        <h3>Transaction Summary</h3>

        <div id="print-area" ref={printRef} className="print-area">
          <div className="receipt-header">
            <div>Company POS</div>
            <div>{new Date().toLocaleString()}</div>
          </div>

          <div className="receipt-items">
            {transaction.map(it => (
              <div className="receipt-line" key={it.id}>
                <div>{it.name} x{it.quantity}</div>
                <div>${((it.amount + it.fee) * it.quantity).toFixed(2)}</div>
                <div className="muted small">({it.amount}+{it.fee} fee)</div>
              </div>
            ))}
          </div>

          <div className="receipt-totals">
            <div>Total: ${txTotal.toFixed(2)}</div>
            <div>Cash: ${payment.cash ?? 0}</div>
            <div>Credit: ${payment.credit ?? 0} (+${(payment.creditFee ?? 0).toFixed(2)})</div>
            <div>Debit: ${payment.debit ?? 0} (+${(payment.debitFee ?? 0).toFixed(2)})</div>
            <div className="total-box">Paid: ${(payment.totalPayment ?? 0).toFixed(2)}</div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={handlePrint}>Download PDF</button>
          <button className="btn clear-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
