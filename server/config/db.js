import mongoose from 'mongoose'
import colors from 'colors'
const connectDB = async () =>{
    try{
        const  conn = await mongoose.connect('mongodb+srv://pepakayalameghana:saikishore123@cluster0.vvhefks.mongodb.net/jobportal')
        console.log(`connected to mongodb database ${mongoose.connection.host}`.bgMagenta.white);
    }catch(error){
        console.error(`mongoDB Error ${error}`.bgRed.white)
    }
}
export default connectDB;
