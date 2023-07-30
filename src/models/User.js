// models/User.js
class User {
    constructor(username, email) {
      this.username = username;
      this.email = email;
      this.cart = [];
      this.orders = [];
    }
  }
  
  module.exports = User;
  