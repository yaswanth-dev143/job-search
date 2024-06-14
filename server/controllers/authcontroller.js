import usermodel from "../models/usermodel.mjs";
export const registercontroller = async (req, res, next) => {
  const { name, email, password, lastName } = req.body;
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
  const user = await usermodel.create({ name, email, password, lastName });
  res.status(201).send({
    success: true,
    message: "user created successfully",
    user: {
      name: user.name,
      lastName: user.lastname,
      email: user.email,
      location: user.location,
    },
  });
};
