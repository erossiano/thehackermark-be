import Users from "../models/User.js";

export function getData(id){
  var query = Users.find({_id: id}).exec();
  return query;
}


export function getDataByEmail(email){
  var query = Users.find({email: email}).exec();
  return query;
}

//Get user by id
export const getUser = (req, res) => {
  try {
    let response = getData(req.params.id);
    response.then(
      (id) => {
        if(!id){
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


export const getUserByEmail = (req, res) => {
  try {
    let response = getData(req.params.email);
    response.then(
      (email) => {
        if(!id){
          return res.status("400").json({message : "Email no encontrado"});
        }else{
          return res.json(email);
        }
      }
    );
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message : "Error en el servidor!"});
  }
};


//Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    
    if(!users){
      return res.status("400").json({message : error.message});
    }else{
      return res.send(users);
    }

    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message : error.message});
  }
};

//Funcion para crear libros
export const createUser = (req, res) => {
  try {
      const user = new Users({
          //Propiedades
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          date: req.body.date,
          type: req.body.type,
      });
      
      user.save((err, todo) => {
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
export const updateUser = (req, res) => {
  try{
    Users.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          date: req.body.date,
          type: req.body.type,
        },
      },
      { new: true },
      (err, Users) => {
        if (err) {
          res.send(err);
        } else res.json(Users);
      }
    );
  }catch(error){
    console.log("No fue posible actualizar!")
  }
};
  //Fin de actualizar productos con router

//Delete user
export const deleteUser = (req, res) => {
  Products.deleteOne({ _id: req.params.id })
    .then(() => res.json({ message: "Usuario Borrado" }))
    .catch((err) => res.send(err));
};
  //Fin de delete