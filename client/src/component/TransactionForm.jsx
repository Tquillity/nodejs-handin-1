import React, { useState } from 'react';

export default function TransactionForm({ onTransactionSubmit }) {
  const [amount, setAmount] = useState('');
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onTransactionSubmit({ amount, sender, recipient });
    setAmount('');
    setSender('');
    setRecipient('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Sender:</label>
        <input
          type="text"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
      </div>
      <div>
        <label>Recipient:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      <button type="submit">Create Transaction</button>
    </form>
  );
}
