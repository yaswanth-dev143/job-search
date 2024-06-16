import usermodel from "../models/usermodel.mjs";
export const registercontroller = async (req, res, next) => {
  const { name, email, password } = req.body;
  //validate
  if (!name) {
    next("name is required");
  }
  if (!email) {
    next("email is required");
  }
  if (!password) {
    next("password is required and greater than 6 characters");
  }
  const existinguser = await usermodel.findOne({ email });
  if (existinguser) {
    next("Email already register please login");
  }
  const user = await usermodel.create({ name, email, password });
  //token
  const token = user.createJWT();
  res.status(201).send(
    {
      success: true,
      message: "user created successfully",
      user:{
        name:user.name,
        email:user.email,
        location: user.location
      },
      token,
    }
  );
};

export const logiController = async (req,res,next) => {
  const {email,password} = req.body
  if(!email || !password){
    next('please provide all the fields')
  }
  //find user by email
  const user = await usermodel.findOne({email}).select("+password")
  if(!user){
    next('Invalid email or password')
  }
  //compare password
  const isMatch = await user.comparePassword(password)
  if(!isMatch){
    next('Invalid email or password')
  }
  user.password = undefined
  const token = user.createJWT()
  res.status(200).send({
    success:true,
    message:'logged in successfully',
    user,
    token,
  })
}
