import mongoose from "mongoose";

const Products = mongoose.model("product",{
    isbn: {type: String},
    title: {type: String},
    author: {type: String},
    publish_date: {type: String},
    publisher: {type: String},
    numOfPages: {type: Number},
    price: {type: Number,
            deafult: 0},
    image:  {type: String},
    category:  {type: String},
    cantidad: {type: Number
                ,default: 1} 
      });

export default Products;