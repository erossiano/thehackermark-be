import Products from "../models/Product.js";

export function getDataById(id){
  var query = Products.find({_id: id}).exec();
  return query;
}

export function getDataByIsbn(isbn){
  var query = Products.find({isbn: isbn}).exec();
  return query;
}

//Get Product by id
export const getProductById = (req, res) => {
  try {
    let response = getDataById(req.params.id);
    response.then(
      (id) => {
        if(!isbn){
          return res.status("400").json({message : "No encontrado"});
        }else{
          return res.json(id);
        }
      }
    );
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message : "Error en el servidor!"});
  }
};

export const getProductByIsbn = (req, res) => {
  try {
    let response = getDataByIsbn(req.params.isbn);
    response.then(
      (isbn) => {
        if(!isbn){
          return res.status(400).json({message : "No encontrado"});
        }else{
          return res.json(isbn);
        }
      }
    );
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message : "Error en el servidor!"});
  }
};
//Get all Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    
    if(!products){
      return res.status(400).json({message : error.message});
    }else{
      return res.send(products);
    }
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message : error.message});
  }
};

//Funcion para crear libros
export const createProduct = (req, res) => {
  try {
      const Product = new Products({
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
      
      Product.save((err, todo) => {
        if (err) {
            res.send(err);
        }
        res.json(todo);
    });

  }catch(error){
    console.log("No fue posible guardar!")
  }
};
//Define la url para la creacion

//Actualizar productos con router
export const updateProduct = (req, res) => {
  try{
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
  }catch(error){
    console.log("No fue posible actualizar!")
  }
};
  //Fin de actualizar productos con router

//Delete Product
export const deleteProduct = (req, res) => {
  Products.deleteOne({ isbn: req.params.isbn })
    .then(() => res.json({ message: "Producto Borrado" }))
    .catch((err) => res.send(err));
};
  //Fin de delete