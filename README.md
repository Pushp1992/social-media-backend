
### Backend service for Social Media

1. API endpoint for User Profile. (GET/PUT/POST/DELETE)
2. API endpoint for User Post(s). (GET/PUT/POST/DELETE)

### Running backend srvice locally

```
npm run dev
```
The server will start at http://localhost:5000/
### Pre-requisites

1. install brew
https://docs.brew.sh/Installation

### Steps for MongoDB installation.

Please follow this link as well: https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-os-x/

1. brew tap mongodb/brew
2. brew update (optional)
3. brew install mongodb-community@4.4

### Check if mongoDB is installed by running DB
4. brew services start mongodb-community@4.4

### check running service list on DB
5. brew services list

### If above check passes, pls stop the server
5. brew services stop mongodb-community@4.4
