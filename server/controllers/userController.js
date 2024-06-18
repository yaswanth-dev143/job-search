import usermodel from "../models/usermodel.js"

export const updateUserController = async (req,res,next) => {
    const {name,email,lastName,password} = req.body
    if(!name || !email || !lastName || !password){
        next('Please Provide All Fields')
    }
    const user = await usermodel.findOne({id: req.user.userId})
    user.name = name
    user.lastName = lastName
    user.location = location
    
    await user.save()

    const token = user.createJWT()
    res.status(200).json({
        
    })
}