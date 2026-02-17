import React, { useState, useRef, useEffect } from "react";

/*
  Simple popup form to add a menu item:
  - fields: name, amount, fee
  - onAdd({name, amount, fee}) will be called
  - onClose() closes popup
*/

export default function AddTransaction({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [fee, setFee] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !amount) return;
    onAdd({ name, amount: parseFloat(amount), fee: parseFloat(fee) || 0 });
    setName(""); setAmount(""); setFee("");
    onClose();
  }

  return (
    <div className="overlay">
      <div className="modal-card">
        <h3>Add Transaction Item</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Name
            <input ref={inputRef} value={name} onChange={e => setName(e.target.value)} required />
          </label>
          <label>
            Amount
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
          </label>
          <label>
            Fee
            <input type="number" value={fee} onChange={e => setFee(e.target.value)} />
          </label>

          <div className="modal-actions">
            <button className="btn" type="submit">Add</button>
            <button className="btn clear-btn" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
