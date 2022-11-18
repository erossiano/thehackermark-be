import mongoose from "mongoose";

//Esquema de la base de datos thehackermark, coleccion products
const schema = new mongoose.Schema({
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
//el nombre de modelo en singular, la coleccion en plural

export const Products = mongoose.model('product', schema);

//Get all books
export const getAllProducts = (req, res) => {
    Products.find((err, products) => {
      if (err) {
        res.send(err);
      }
      res.json(products);
    });
  };
//En get all products

//Get book by isbn
export const getProduct = (req, res) => {
    Products.find(
        { isbn: req.params.isbn },
        (err, products) => {
            if (err) {
                res.send(err);
            }
            res.json(products);
        });
  };
  //End Get book by isbn

//Funcion para crear libros
export const createProduct = (req, res) => {
    const product = new Products({
        //Propiedades
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        publish_date: req.body.publish_date,
        publisher: req.body.publisher,
        numOfPages: req.body.numOfPages,
        price: req.body.price,
        image:  req.body.image,
        category:  req.body.category,
        cantidad: req.body.cantidad,
    });
    
    product.save((err, todo) => {
            if (err) {
                res.send(err);
            }
            res.json(todo);
        });
};
//Define la url para la creacion

//Actualizar productos con router
export const updateProduct = (req, res) => {
    Products.findOneAndUpdate(
      { isbn: req.params.isbn },
      {
        $set: {
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                publish_date: req.body.publish_date,
                publisher: req.body.publisher,
                numOfPages: req.body.numOfPages,
                price: req.body.price,
                image:  req.body.image,
                category:  req.body.category,
                cantidad: req.body.cantidad,
            },
      },
      { new: true },
      (err, Products) => {
        if (err) {
          res.send(err);
        } else res.json(Products);
      }
    );
  };
  //Fin de actualizar productos con router

//Delete products
  export const deleteProduct = (req, res) => {
    Products.deleteOne({ isbn: req.params.isbn })
      .then(() => res.json({ message: "Product Deleted" }))
      .catch((err) => res.send(err));
  };
  //Fin de delete products