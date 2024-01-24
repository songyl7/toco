# TOCO 

## System Architecture

* Client: React
    * axios: make API calls
    * react-data-table-component: show data in a structured table
* Server: Node JS
    * express: handle REST api
    * mongoose: MongoDB object modeling
* DB: MongoDB Atlas
    * `user` collection: store user info
    * `transaction` collection: store transactions info

## Commands

### Start Client

1. `cd client`

1. `npm install && npm start`

### Start Server

1. `cd server`

1. `npm install && npm start`

### Run Server Tests

1. `cd server`

1. `npm run test`

### Dispatch API Requests

1. Get user by ID: 

    ```
    curl --location 'localhost:3001/api/users/1'
    ```

1. Create a new user: 

    ```
    curl --location 'localhost:3001/api/users' \
    --header 'Content-Type: application/json' \
    --data '{
        "id": 2,
        "balance": 40
    }'
    ```

1. Post a transaction:

    ```
    curl --location 'localhost:3001/api/transactions' \
    --header 'Content-Type: application/json' \
    --data '{
        "senderId": 1,
        "receiverId": 2,
        "amount": 10
    }'
    ```

### Server Deployment

Create docker image based on the Dockerfile

## Notes

I aggressively simplified the implementations and tests as this is a quick prototype. Here are a few things that needs to be improved:

1. Set up different environment (mainly databases) for development, testing and production. 
1. Do not use real databases for unit/integration testing. The existing tests should be in a hermetic environment.
1. The steps in transactions (add balance, remove balance, save transaction logs) should be atomic. Current implementation didn't address that.
