import React from "react";

/*
  Card shown in menu. Clicking the card selects it into transaction.
*/
export default function ItemCard({ item, onSelect }) {
  return (
    <div className="item-card" onClick={() => onSelect(item)}>
      <div className="item-left">
        <h4>{item.name}</h4>
        <p className="muted">Amount: ${item.amount}</p>
        <p className="muted">Fee: ${item.fee}</p>
      </div>
      <div className="item-right">
        <div className="item-total">${(item.amount + item.fee).toFixed(2)}</div>
      </div>
    </div>
  );
}