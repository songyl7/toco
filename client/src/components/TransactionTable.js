import React from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Transaction ID',
    selector: row => row._id,
    sortable: true,
  },
  {
    name: 'Sender ID',
    selector: row => row.senderId,
  },
  {
    name: 'Receiver ID',
    selector: row => row.receiverId,
  },
  {
    name: 'Amount',
    selector: row => row.amount,
  },
  {
    name: 'Transaction Date',
    selector: row => row.date,
  },
];

export default class TransactionTable extends React.Component {
  state = {
    transactions: []
  }

  componentDidMount() {
    axios.get(`/api/transactions`)
      .then(res => {
        const transactions = res.data;
        this.setState({ transactions });
      })
  }

  render() {
    return (
      <DataTable
        columns={columns}
        data={this.state.transactions}
      />
    )
  }
}