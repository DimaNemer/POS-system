import React, { useState, useRef } from "react";
import AddTransaction from "./components/AddTransaction";
import ItemCard from "./components/ItemCard";
import TransactionItem from "./components/TransactionItem";
import PaymentModal from "./components/PaymentModal";
import SummaryModal from "./components/SummaryModal";
import "./index.css";

/*
  App responsibilities (simple):
  - keep available items (menu)
  - keep current transaction items (with quantity)
  - show/hide modals and pass handlers
*/

export default function App() {
  // sample starting menu (you can start empty)
  const [items, setItems] = useState([
  ]);

  const [transactionItems, setTransactionItems] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  const containerRef = useRef(null);

  // Add a new item to menu
  function handleAddMenuItem(newItem) {
    setItems(prev => [...prev, { ...newItem, id: Date.now() }]);
  }

  // Add item to transaction: increment quantity if exists
  function handleSelectItem(item) {
    setTransactionItems(prev => {
      const found = prev.find(p => p.id === item.id);
      if (found) {
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }

  // Remove an item line from transaction
  function handleRemoveFromTransaction(itemId) {
    setTransactionItems(prev => prev.filter(p => p.id !== itemId));
  }

  // Compute totals (used for Payment)
  function computeTotals() {
    const totalTransaction = transactionItems.reduce((sum, it) => sum + (it.amount + it.fee) * it.quantity, 0);
    const totalFees = transactionItems.reduce((sum, it) => sum + (it.fee * it.quantity), 0);
    return { totalTransaction, totalFees };
  }

  // When completing transaction, open payment modal
  function handleCompleteTransaction() {
    if (transactionItems.length === 0) {
      alert("No items selected!");
      return;
    }
    setShowPayment(true);
  }

  // After payment confirmed
  function handlePaymentConfirmed(paymentData) {
    // paymentData includes: cash, credit, debit, creditFee, debitFee, totalPayment
    setPaymentResult(paymentData);
    setShowPayment(false);
    setShowSummary(true);
    // Clear transaction items because sale completed
    setTransactionItems([]);
  }

  // Simple clear transaction
  function handleClearTransaction() {
    setTransactionItems([]);
  }

  const totals = computeTotals();

  return (
    <div className="app-shell" ref={containerRef}>
      <header className="topbar">
        <h1>Transaction POS Manager</h1>
        <button className="btn add-btn" onClick={() => setShowAdd(true)}>Add Transaction Item</button>
      </header>

      <main className="page-grid">
        {/* Left: Items menu */}
        <section className="menu-column">
          <h2>Transaction POS Menu</h2>

          <div className="items-container">
            {items.map(item => (
              <ItemCard key={item.id} item={item} onSelect={handleSelectItem} />
            ))}
          </div>
        </section>

        {/* Right: Transaction summary / actions */}
        <aside className="transaction-column">
          <h2>Transaction List</h2>

          <div className="transaction-box">
            {transactionItems.length === 0 ? (
              <p className="muted">No transactions selected.</p>
            ) : (
              <>
                {transactionItems.map(it => (
                  <TransactionItem key={it.id} item={it} onRemove={handleRemoveFromTransaction} />
                ))}
                <div className="totals-area">
                  <div>Total Fees: <strong>${totals.totalFees.toFixed(2)}</strong></div>
                  <div>Grand Total: <strong>${totals.totalTransaction.toFixed(2)}</strong></div>
                </div>
                <div className="actions-row">
                  <button className="btn" onClick={handleCompleteTransaction}>Complete</button>
                  <button className="btn clear-btn" onClick={handleClearTransaction}>Clear</button>
                </div>
              </>
            )}
          </div>
        </aside>
      </main>

      {/* Modals */}
      {showAdd && <AddTransaction onClose={() => setShowAdd(false)} onAdd={handleAddMenuItem} />}
      {showPayment && <PaymentModal total={totals.totalTransaction} onClose={() => setShowPayment(false)} onConfirm={handlePaymentConfirmed} />}
      {showSummary && paymentResult && <SummaryModal transaction={paymentResult.itemsSnapshot || []} payment={paymentResult} onClose={() => setShowSummary(false)} />}

    </div>
  );
}
