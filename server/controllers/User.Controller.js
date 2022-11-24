import { response } from "express";
import Users from "../models/User.js";

export function getData(id){
  //var query = Users.findOne({_id: id}).exec();
  var query = Users.findOne({_id: id}).exec( 
    function (err, user) {
      if(!user){
        return null;
      }else{
        return user._id.toString();
      }

      if(err){
        return err;
      }

    }
    );
}


export function getDataByEmail(email){
  Users.findOne({email: email},
    function (err, user) {   
        //console.log(user._id.toString());
        //throw err;
        if(!user){
          return "0";
        }else{
          return user._id.toString();
        }

        if(err){
          return err;
        }

      }
    );

}

//Get user by id
export const getUser = (req, res) => {
  try {
    let id = getData(req.params.id);
        if(!id){
          return res.json({'status': 0, 'message' : "No encontrado"});
        }else{
          return res.json(id);
        }   
  } catch (error) {
    //console.log(error.message);
    return res.json({'status': 0, 'message' : "Error en el servidor!"});
  }
};


export const getUserByEmail = (req, res) => {
  try {
    //Funcion de busqueda de email
    let email = req.params.email;
    Users.findOne({email: email},
      function (err, user) {   
          if(!user){
            return res.json({'status': 0, 'message' : "Email no encontrado"});
          }else{
            return res.json({'status': 1, 'message' : "Email encontrado.", 'id' : user._id.toString() });
          }
          if(err){
            return err;
          }
        }
      );
    //Fin de busqueda de email
  } catch (error) {
    return res.json({'status': 0, 'message' : error.message});
  }
};




//Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    
    if(!users){
      return res.json({message : "No se encontraron el usuarios"});
    }else{
      return res.send(users);
    }
    
  } catch (error) {
    //console.log(error.message);
    return res.json({message : error.message});
  }
};

//Funcion para crear libros
export const createUser = (req, res) => {
  try {
      const new_user = new Users({
          //Propiedades
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          date: req.body.date,
          type: req.body.type,
      });

    Users.findOne({email: new_user.email},
      function (err, user) {   
          if(!user){
            console.log(new_user);
                new_user.save((error, todo) => {
                if (error) {
                  res.json({'status': 0 ,'message': "No fue posible guardar el usuario"});
                }
                  res.json({'status': 1 ,'message': `El usuario ${todo.name} ha sido guardado!`});
                });
          }else{
            res.json({'status': 0, 'message' : "El usuario ya existe", 'id' : user._id.toString() });
          }
          if(err){
            return err;
          }
        }
      );

  }catch(error){
    //console.log("No fue posible guardar!")
    return res.json({'status': 0 , message : error.message});
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
          res.json({'message': err, 'status': 0});
        } else res.json({'message': "Usuario guardado!", 'status': 1});
      }
    );
  }catch(error){
    //console.log("No fue posible actualizar!")
    return res.json({'status': 0, 'message' : error.message});
  }
};
  //Fin de actualizar productos con router

//Delete user
export const deleteUser = (req, res) => {
  Users.deleteOne({ _id: req.params.id })
    .then(() => res.json({'status': 1, 'message': "Usuario Borrado" }))
    .catch((err) => res.json({'status': 0, 'message': err }));
};
  //Fin de delete

export async function getValidUser(email, password){
  let query = await Users.findOne({'email': email, 'password':password});
  return query;
}

export const authUser = async (req, res) => {
    // Capture the input fields
  let email = req.body.email;
  let password = req.body.password;

  // Ensure the input fields exists and are not empty
  if (email && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    const user = await getValidUser(email, password);

    if(!user){
      res.json({ 'status' : 0,'message': `Usuario o Contraseña errada ${email}` } )
      //console.log("Null time:" + Date.now());
    }else{
      console.log(user._id + "time:" + Date.now());
        //req.session.loggedin = true;
        //req.session.email = email;
        res.json({'status' : 0,'message': 'El usuario ha sido autenticado','user' : [{'status': 1,'type': user.type,'name': user.name, 'email': user.email, 'id': user._id}] });
        //res.redirect('/');
        //res.send(user);
    }

  }
}