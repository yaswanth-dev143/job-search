import express from 'express';
import { logiController, registercontroller } from '../controllers/authcontroller.js';
import rateLimit from 'express-rate-limit';

//ip limiter
const limiter= rateLimit(
    {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max:100, // limit each IP to 100 requests per window (here, per 5 minutes)
        standardHeaders: true, //Return rate Limit info in the RateLimit-* header
        legacyHeaders: false, //Disable the 'X-RareLimit-*' headers
    }
)

//router object
const router = express.Router();
//routes

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - lastName
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of user collection
 *          example : DHSASDHJDJHVAJDSVJAVSD
 *        name:
 *          type: string
 *          description: User name
 *        lastName:
 *          type: string
 *          description: User Last Name
 *        email:
 *          type: string
 *          description: user email address
 *        password:
 *          type: string
 *          description: user password should be greater then 6 character
 *        location:
 *          type: string
 *          description: user location city or country
 *      example:
 *        id: GDHJGD788BJBJ
 *        name: John
 *        lastName: Doe
 *        email: johndoes@gmail.com
 *        password: test@123
 *        location: mumbai
 */



// REGISTER || POST
router.post('/register', registercontroller);

// LOGIN || POST
router.post('/login',logiController)
//export
export default router