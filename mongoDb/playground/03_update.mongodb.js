use("ecommerce");

// updateOne
//updateMany

// first argument in the updateOne is the selector
db.products.updateOne({ name: "Wireless Mouse" }, { $set: { price: 899 } });

//updateMany

db.products.updateMany({ category: "Electronics" }, { $set: { price: 899 } });

// $inc = increase

db.products.updateMany({ category: "Computers" }, { $inc: { stock: 10 } });

// using $push to add to arrays
db.products.updateOne(
  { name: "Wireless Mouse" },
  { $push: { tags: "new" } }, 
);
//"new" is added in the "tags" array




db.products.find();
