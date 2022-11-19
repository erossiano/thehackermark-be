import mongoose from "mongoose";

const Products = mongoose.model("product",{
    isbn: {type: String},
    title: {type: String},
    author: {type: String},
    publish_date: {type: String},
    publisher: {type: String},
    numOfPages: {type: Number},
    price: {type: Number},
    image:  {type: String},
    category:  {type: String},
    cantidad: {type: Number} 
      });

export default Products;