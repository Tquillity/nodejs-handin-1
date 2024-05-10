import React from 'react';
import TransactionForm from './component/TransactionForm';

function App() {
  const handleTransactionSubmit = async (transactionData) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/transactions/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
      const responseData = await response.json();
      console.log('Transaction Response:', responseData);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <div>
      <h1>Create Transaction</h1>
      <TransactionForm onTransactionSubmit={handleTransactionSubmit} />
    </div>
  );
}

export default App;

