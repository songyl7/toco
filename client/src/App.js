import UserTable from './components/UserTable';
import TransactionTable from './components/TransactionTable';
import './App.css';

function App() {
  return (
    <div>
      <h1>Users:</h1>
      <UserTable/>
      <h1>Transactions:</h1>
      <TransactionTable/>
    </div>
  );
}

export default App;
