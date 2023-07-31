
//new
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const User = require('../models/User');
// const { calculateTax } = require('./cartController'); // Assuming the calculateTax function is already defined in productController.js

// Calculate tax amount based on item price and type
// function calculateTax(item) {
//   let taxPercentage = 0;
//   let flatTaxAmount = 0;

//   if (item.type === 'product') {
//     if (item.price > 1000 && item.price <= 5000) {
//       taxPercentage = 0.12; // Tax PA
//     } else if (item.price > 5000) {
//       taxPercentage = 0.18; // Tax PB
//     }
//     flatTaxAmount = 200; // Tax PC (Flat tax amount)
//   } else if (item.type === 'service') {
//     if (item.price > 1000 && item.price <= 8000) {
//       taxPercentage = 0.1; // Tax SA
//     } else if (item.price > 8000) {
//       taxPercentage = 0.15; // Tax SB
//     }
//     flatTaxAmount = 100; // Tax SC (Flat tax amount)
//   }

//   const itemTotal = item.price * item.quantity;
//   const taxAmount = (itemTotal * taxPercentage + flatTaxAmount) * item.quantity;
//   return taxAmount;
// }
// Calculate tax amount based on item price and type
function calculateTax(item, quantity) {
  let taxPercentage = 0;
  let flatTaxAmount = 0;

  if (item.type === 'product') {
    if (item.price > 1000 && item.price <= 5000) {
      taxPercentage = 0.12; // Tax PA
    } else if (item.price > 5000) {
      taxPercentage = 0.18; // Tax PB
    }
    flatTaxAmount = 200; // Tax PC (Flat tax amount)
  } else if (item.type === 'service') {
    if (item.price > 1000 && item.price <= 8000) {
      taxPercentage = 0.1; // Tax SA
    } else if (item.price > 8000) {
      taxPercentage = 0.15; // Tax SB
    }
    flatTaxAmount = 100; // Tax SC (Flat tax amount)
  }

  const itemTotal = item.price * quantity;
  const taxAmount = (itemTotal * taxPercentage + flatTaxAmount) * quantity;
  return taxAmount;
}



// View cart API
async function viewCart(req, res) {
  const { username } = req.params;

  try {
    // Find the user by their username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId: user._id }).populate('items.item');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }

    // Calculate total tax and total bill
    let totalTax = 0;
    let totalBill = 0;

    // Create an array to store item details
    const itemDetails = [];

    cart.items.forEach((cartItem) => {
      const item = cartItem.item;
      const itemQuantity = cartItem.quantity;
      const taxAmount = calculateTax({ ...item.toObject(), quantity: itemQuantity });
      const itemTotal = item.price * itemQuantity;
      totalTax += taxAmount;
      totalBill += itemTotal + taxAmount;

      // Add item details to the array
      itemDetails.push({
        name: item.name,
        type: item.type,
        quantity: cartItem.quantity,
        price: item.price,
      });
    });

    // Create a new cart object with the required information
    const cartWithDetails = {
      username: user.username,
      items: itemDetails,
      totalTax,
      totalBill,
    };

    res.status(200).json(cartWithDetails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart.' });
  }
}
async function addToCart(req, res) {
  const { username, itemName, quantity } = req.body;

  try {
    console.log('Received request to add item to cart:', { username, itemName, quantity });

    // Find the user by their username
    const user = await User.findOne({ username });
    console.log('Found user:', user);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Find the product by its name
    const itemToAdd = await Product.findOne({ name: itemName });
    console.log('Found item to add:', itemToAdd);
    if (!itemToAdd) {
      return res.status(404).json({ error: 'Item not found.' });
    }

    // Find the user's cart or create a new cart if it doesn't exist
    let cart = await Cart.findOne({ userId: user._id });
    console.log('Found cart:', cart);
    if (!cart) {
      cart = new Cart({ userId: user._id, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (cartItem) => cartItem.itemName === itemName
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ item: itemToAdd._id, itemName, quantity }); // Save the itemName along with the item
    }

    // Calculate total bill and taxes
    let totalBill = 0;
    let totalTax = 0;

    for (const cartItem of cart.items) {
      const item = await Product.findById(cartItem.item);
      const itemQuantity = cartItem.quantity;

      console.log('Calculating tax for item:', item.name, 'Quantity:', itemQuantity);
      const taxAmount = calculateTax(item, itemQuantity);
      const itemTotal = item.price * itemQuantity;

      totalTax += taxAmount;
      totalBill += itemTotal + taxAmount;
    }

    console.log('Total tax:', totalTax);
    console.log('Total bill:', totalBill);

    // Update cart with total bill and taxes
    cart.totalBill = totalBill;
    cart.totalTax = totalTax;

    // Save the updated cart to the database
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error occurred while adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart.' });
  }
}

// // Add product or service to the cart API
// async function addToCart(req, res) {
//   const { username, itemName, quantity } = req.body;

//   try {
//     // Find the user by their username
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     // Find the product by its name
//     const itemToAdd = await Product.findOne({ name: itemName });
//     if (!itemToAdd) {
//       return res.status(404).json({ error: 'Item not found.' });
//     }

//     // Find the user's cart or create a new cart if it doesn't exist
//     let cart = await Cart.findOne({ userId: user._id });
//     if (!cart) {
//       cart = new Cart({ userId: user._id, items: [] });
//     }

//     // Check if the item already exists in the cart
//     const existingItemIndex = cart.items.findIndex(
//       (cartItem) => cartItem.itemName === itemName
//     );

//     if (existingItemIndex !== -1) {
//       cart.items[existingItemIndex].quantity += quantity;
//     } else {
//       cart.items.push({ item: itemToAdd._id, itemName, quantity }); // Save the itemName along with the item
//     }

//     // Calculate total bill and taxes
//     let totalBill = 0;
//     let totalTax = 0;

//     for (const cartItem of cart.items) {
//       const item = await Product.findById(cartItem.item);
//       const itemQuantity = cartItem.quantity;

//       const taxAmount = calculateTax({ ...item.toObject(), quantity: itemQuantity });
//       const itemTotal = item.price * itemQuantity;

//       totalTax += taxAmount;
//       totalBill += itemTotal + taxAmount;
//     }

//     // Update cart with total bill and taxes
//     cart.totalBill = totalBill;
//     cart.totalTax = totalTax;

//     // Save the updated cart to the database
//     await cart.save();

//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add item to cart.' });
//   }
// }

// Remove an item from the cart
// async function removeFromCart(req, res) {
//   const { username, itemName } = req.params;
//   console.log(username, itemName);

//   try {
//     // Find the user by their username
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     // Find the user's cart
//     const cart = await Cart.findOne({ userId: user._id });
//     if (!cart) {
//       return res.status(404).json({ error: 'Cart not found.' });
//     }

//     // Check if the item exists in the cart
//     const existingItem = cart.items.find(
//       (cartItem) => cartItem.itemName === itemName
//     );

//     if (existingItem) {
//       console.log(existingItem.itemName)
//       // If quantity is greater than 1, reduce the quantity by 1
//       if (existingItem.quantity > 1) {
//         existingItem.quantity -= 1;
//       } else {
//         // If quantity is 1 or less, remove the item from the cart
//         cart.items = cart.items.filter((cartItem) => cartItem.itemName !== itemName);
//       }

    

//       // Calculate total bill and taxes after removing the item
//       let totalBill = 0;
//       let totalTax = 0;

//       for (const cartItem of cart.items) {
//         const item = cartItem.item;
//         const itemQuantity = cartItem.quantity;
//         const taxAmount = calculateTax({ ...item.toObject(), quantity: itemQuantity });
//         const itemTotal = item.price * itemQuantity;
//         totalTax += taxAmount;
//         totalBill += itemTotal + taxAmount;
//       }

//       // Update cart with total bill and taxes
//       cart.totalBill = totalBill;
//       cart.totalTax = totalTax;

//       // Save the updated cart to the database
//       await cart.save();

//       return res.status(200).json(cart);
//     } else {
//       return res.status(404).json({ error: 'Item not found in the cart.' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to remove item from the cart.' });
//   }
// }





// Remove an item from the cart
async function removeFromCart(req, res) {
  const { username, itemName } = req.params;
  console.log("Username:", username);
  console.log("Item name:", itemName);

  try {
    // Find the user by their username
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found.");
      return res.status(404).json({ error: 'User not found.' });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId: user._id });
    if (!cart) {
      console.log("Cart not found.");
      return res.status(404).json({ error: 'Cart not found.' });
    }

    // Check if the item exists in the cart
    console.log("Items in the cart:", cart.items);
    const existingItemIndex = cart.items.findIndex((cartItem) => cartItem.itemName === itemName);

    if (existingItemIndex !== -1) {
      // Item found in the cart
      console.log("Existing item:", cart.items[existingItemIndex]);

      const existingItem = cart.items[existingItemIndex];

      if (existingItem.quantity > 1) {
        // Decrease the quantity by 1
        existingItem.quantity -= 1;
      } else {
        // Remove the item from the cart
        cart.items.splice(existingItemIndex, 1);
      }

      // Calculate total bill and taxes after removing the item
      let totalBill = 0;
      let totalTax = 0;

      for (const cartItem of cart.items) {
        const item = await Product.findById(cartItem.item);
        const itemQuantity = cartItem.quantity;
        console.log("Calculating tax for item:", item.name, "Quantity:", itemQuantity);

        const taxAmount = calculateTax(item, itemQuantity);
        const itemTotal = item.price * itemQuantity;
        totalTax += taxAmount;
        totalBill += itemTotal + taxAmount;
      }

      console.log("Total tax:", totalTax);
      console.log("Total bill:", totalBill);

      // Update cart with total bill and taxes
      cart.totalBill = totalBill;
      cart.totalTax = totalTax;

      // Save the updated cart to the database
      await cart.save();

      return res.status(200).json(cart);
    } else {
      console.log("Item not found in the cart.");
      return res.status(404).json({ error: 'Item not found in the cart.' });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: 'Failed to remove item from the cart.' });
  }
}
// Clear the cart API
async function clearCart(req, res) {
  const { username } = req.params;

  try {
    // Find the user by their username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId: user._id });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }

    // Clear all items from the cart
    cart.items = [];

    // Reset total bill and total tax
    cart.totalBill = 0;
    cart.totalTax = 0;

    // Save the updated cart to the database
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear the cart.' });
  }
}



module.exports = { viewCart, addToCart, removeFromCart, clearCart };
