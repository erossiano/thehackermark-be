import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("users", UserSchema);

import Validator from "validator";
import isEmpty from "is-empty";

export const validateRegisterInput = (data) => {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password: "";
    data.password2 = !isEmpty(data.password2) ?
    data.password2 : "";
    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
        // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30})) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};


export const validateLoginInput = (data) => {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};


//Routes
//router.post("api/user/register", registerUser);
export const registerUser = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists"
                                        });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
                });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                        newUser.password = hash;
                        newUser
                        .save()
                        .then(user => res.json(user))
            //16
                        .catch(err => console.log(err));
                });
            });
        }
    });
};

//Login
//router.post("api/user/register", registerUser);

//router.post("/login", (req, res) => {
export const loginUser = (req, res) =>{

// Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
            // Check password
            bcrypt.compare(password, user.password).then(isMatch => {
            //18
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                    };
                // Sign token
                jwt.sign(payload, keys.secretOrKey,{
                                                expiresIn: 31556926 // 1 year in seconds
                                                    },
                                                    (err, token) => {
                                                                        res.json({
                                                                            success: true,
                                                                        token: "Bearer " + token
                                                                        });
                                                                    }
                );
            } else {
            return res.status(400).json({ passwordincorrect: "Password incorrect" });
            }
            });
    });
}

