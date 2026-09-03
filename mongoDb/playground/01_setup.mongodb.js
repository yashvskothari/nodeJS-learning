// use funcation - takes a db as a parameter(in string)

use("ecommerce");

// "products" is the name of the collection present inside the "ecommerce" db

db.products.insertMany([
  {
    name: "Wireless Mouse",
    price: 799,
    category: "Electronics",
    stock: 120,
    ratings: 4.5,
    tags: ["computer", "accessory", "wireless"],
    createdAt: new Date(),
  },
  {
    name: "Mechanical Keyboard",
    price: 2499,
    category: "Electronics",
    stock: 80,
    ratings: 4.8,
    tags: ["keyboard", "mechanical"],
    createdAt: new Date(),
  },
  {
    name: "Gaming Laptop",
    price: 85999,
    category: "Computers",
    stock: 30,
    ratings: 4.6,
    tags: ["gaming", "laptop"],
    createdAt: new Date(),
  },
]);

db.orders.insertMany([
  {
    "oderId": "ORD001",
    "user": "John Doe",
    "products": [
      { "name":"wireless mouse", "quantity": 1, "price": 799 },
      { "name":"Mechanical Keyboard", "quantity": 1, "price": 2499 },
    ],
    "total": 3298,
    "status": "Delivered",
    "createdAt": new Date(),
  },
  {
    "orderId": "ORD002",
    "user": "Jane Smith",
    "products": [
      {name: "Gaming Laptop", "quantity": 1, "price":85999},
    ],
    "total": 85999,
    "status":"Pending",
    "createdAt": new Date()
  }
]);

db.contacts.insertMany([{
  "name": "Alice", "message":"Loved your website!", "phone":23456789, "createdAt":new Date()},
  {
  "name": "Bobi", "message":"Amazing!", "phone":231567789, "createdAt":new Date()},
  {
  "name": "Caroli", "message":"Loved your services!", "phone":234565749, "createdAt":new Date()}
])

// db.dropDatabase(); it will delete the db