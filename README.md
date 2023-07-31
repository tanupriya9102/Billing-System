# Billing-System
The Billing System Project is a web application that allows users to manage their shopping cart, calculate taxes for products and services, and view their total bill. The system is designed to be user-friendly and efficient, making it convenient for both customers and business owners.

# Features
Add Products: Add products and services to purchase
Add to Cart: Users can add products and services to their shopping cart.
Remove from Cart: Users can remove items from the cart, either by reducing the quantity or completely removing the item.
View Cart: Users can view the items in their cart along with the calculated tax and total bill.
Tax Calculation: The system automatically calculates the tax for each product and service based on their price range and type.
User Creation: Users can create accounts 
Clear Cart: Users have the option to clear their entire cart, removing all items.

# Some Important file's description
cartController.js: This file contains the controller functions for handling cart-related operations. It includes functions to add items to the cart, remove items, view the cart, and clear the cart.

productController.js: This file contains the controller functions for managing product-related operations. It includes functions to create, read, update, and delete products.

userController.js: This file contains the controller functions for user-related operations. It includes functions to register new users, authenticate users, and manage user profiles.

Cart.js: This file defines the Mongoose schema for the "Cart" model. It represents the shopping cart for each user and contains information about the user, items in the cart, total bill, and total tax.

Product.js: This file defines the Mongoose schema for the "Product" model. It contains information about products, such as name, price, type (product or service), etc.

User.js: This file defines the Mongoose schema for the "User" model. It contains information about registered users, such as username, email, and hashed password.

Item.js: This file (assumed) might define the Mongoose schema for the "Item" model. It could be related to products or services in the cart or any other relevant data.

cartRoutes.js: This file defines the Express routes for cart-related operations. It maps the HTTP endpoints to the corresponding controller functions in cartController.js.

productRoutes.js: This file defines the Express routes for product-related operations. It maps the HTTP endpoints to the corresponding controller functions in productController.js.

userRoutes.js: This file defines the Express routes for user-related operations. It maps the HTTP endpoints to the corresponding controller functions in userController.js.

db.js: This file might contain the configuration for connecting to the database (e.g., MongoDB) using Mongoose or other relevant settings.

index.js: This is the main entry point of the application. It sets up the server, includes necessary middleware, connects to the database, and starts listening for incoming HTTP requests.
# Installation
To run the project locally, follow these steps:

Clone the repository from GitHub Link.
Install the required dependencies using npm install.
Set up the MongoDB database and provide the connection URL in the configuration file.
Run the application using npm start.
Usage
Once the project is running, users can access the application through a web browser. They can create an account or log in using existing credentials. After logging in, users can add products and services to their cart, view the cart, and manage its contents. The system will automatically calculate the tax and display the total bill.
Use postman to perform the functionalities of this project

