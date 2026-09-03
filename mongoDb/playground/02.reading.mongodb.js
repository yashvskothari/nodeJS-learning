// it will be used to fetch or find a data

use("ecommerce");

// db.products.find() // gives all the collections completely

// we can use filters in the find function

db.products.find({"name":"Wireless Mouse"});


// we can also use comparision operators - gt(greater than) , gte(greater than or equal to)


db.products.find({"price": { $gt: 1000}})


// we can also use logical operators

db.products.find({ $or: [{"category": "Electronics"}, {"stock": {$lt:50}}]})

//finding specific field

db.products.find({}, {"name" : 1, "price": 1, "_id" : 0}); // name : 1 means "true" , means i want to see it

//sorting and limiting - used in pagination

db.products.find().sort({price : -1}).limit(2);

// price -1 means getting the product info accroding to price (descending) 
//limit 2 means max 2 products needed

db.products.find().sort({price : -1}).skip(1).limit(2);
// skip 1 means to skip the first product in the sorted list
// means 1 skip karke , agla 2 dikha do

