
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
