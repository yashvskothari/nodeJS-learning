use("ecommerce");

db.sales.find();



db.sales.createIndex({quantity:1}) // means add an index in ascending order on quantity
db.sales.getIndexes();
