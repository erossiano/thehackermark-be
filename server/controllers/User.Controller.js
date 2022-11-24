import Users from "../models/User.js";

export function getData(id){
  var query = Users.findOne({_id: id}).exec();
  return query;
}


export function getDataByEmail(email){
  var query = Users.findOne({email: email}).exec();
  return query;
}

//Get user by id
export const getUser = (req, res) => {
  try {
    let response = getData(req.params.id);
    response.then(
      (id) => {
        if(!id){
          return res.json({'status': 0, 'message' : "No encontrado"});
        }else{
          return res.json(id);
        }
      }
    );
    
  } catch (error) {
    //console.log(error.message);
    return res.json({'status': 0, 'message' : "Error en el servidor!"});
  }
};


export const getUserByEmail = (req, res) => {
  try {
    let response = getDataByEmail(req.params.email);
    response.then(
      (email) => {
        if(!email){
          return res.json({message : "Email no encontrado"});
        }else{
          return res.json({message : "Email encontrado", 'email':email });
        }
      }
    );
    
  } catch (error) {
    //console.log(error.message);
    return res.json({message : "Error en el servidor!"});
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
      const user = new Users({
          //Propiedades
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          date: req.body.date,
          type: req.body.type,
      });

   const old_user = getDataByEmail(user.email)
console.log("largo: " + old_user.length);
   if(old_user.length === 0){
        user.save((err, todo) => {
          if (err) {
              res.json({'status': 0 ,'message': "No fue posible guardar el usuario"});
          }
          res.json({'status': 1 ,'message': `old: ${old_user.length} El usuario ${todo.name} ha sido guardado!`});
      });
  }else{
    res.json({'status': 0 ,'message': "Ya existe un correo regitrado!"});
  }
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
      res.json({ 'status' : 0,'message': "No se recibieron datos de inicio de sesion" })
      //console.log("Null time:" + Date.now());
    }else{
      console.log(user._id + "time:" + Date.now());
        //req.session.loggedin = true;
        //req.session.email = email;
        res.json({'status' : 0,'message': 'El usuario ha sido autenticado','user' : [{'type': user.type,'name': user.name, 'email': user.email, 'id': user._id}] });
        //res.redirect('/');
        //res.send(user);
    }

  }
}