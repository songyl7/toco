import React from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'User Id',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'TOCO Balance',
    selector: row => row.balance,
  },
];

export default class UserTable extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios.get(`/api/users`)
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
  }

  render() {
    return (
      <DataTable
        columns={columns}
        data={this.state.users}
      />
    )
  }
}