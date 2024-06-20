const User = require('../models/user')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const fullname = `${firstname} ${lastname}`;
    const newUser = new User({ email, password, name: fullname });
    const token = await newUser.generateAuthToken();
    await newUser.save();

    res.status(201).json({ message: 'success', user , token });
  } catch (error) {
    console.log('error in register', error);
    res.status(400).json({ error: error.message });
  }
};

const fetchUserById = async(req,res)=>{
    const {id} = req.params;
    try{
        const user = await User.findOne({id:_id})
        if(!user){
            return res.status(400).json({message:"User !! found"})
            }
            else{
                res.send(user)
            }

    }
    catch(error){
        console.log('error in fetching',error);
    }   
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email:email})
        // console.log("user data",user);
        if(!user){
            res.status(400).json({message:"User Not Found"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
        res.status(400).json({message:"Invalid Credentials"})
        }
        else{
            const token = await user.generateAuthToken();
            await user.save();
            res.cookie('userToken',token,{
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000,
            })
            res.status(200).json({message:"success",user,token})
        }
    } catch (error) {
        console.log('error in fetching',error);
    }
}


module.exports = {
    registerUser,
    fetchUserById,
    loginUser
}