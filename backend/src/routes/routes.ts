import { application, NextFunction, Request, request, Response, response, Router } from "express";
import CreateUserService from "../services/CreateUserService";
import jwt from "jsonwebtoken";
import { verify } from "jsonwebtoken"
import AuthenticateUserService from "../services/AuthenticateUserService";
interface IPayload {
    sub: string;
}



const routes = Router();

const listNumbersRomans= {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1
  }

routes.post("/soma", ensureAuthenticated,  (request, response) => {
    const {body} = request.body;
    console.log(body)
    return response.status(200).json("Teste Rota autenticada")
})


routes.post("/subtracao", ensureAuthenticated,  (request, response) => {
    return response.status(200).json("Teste Rota autenticada")
})

routes.post("/usuario", async(request, response)=> {
    try {
        const {name, email , password} = request.body;
        const userService = new CreateUserService();
        const userDB = await userService.execute({
            name, email, password
        })
        const token = jwt.sign({userDB}, 'secretkey');

        let result = {
            token: token,
            user: userDB
        } 

        return response.status(200).json(result)
    } catch (err) {
        return response.status(400).json(err)
    }
})

routes.post("/login", authService);


async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
   const authToken = request.headers.authorization
   if (!authToken) {
       return response.status(401).end();
   }
   const [, token] = authToken.split(" ")
   try {
       const {sub} = verify(token, "bbbdbab10845abec69bded536b8e491a") as IPayload;
       console.log(sub);
       request.user_id = sub
       
       return next();
   } catch (error) {
       return response.status(401).send({message: error.message})
   }
}

async function authService(request:Request,response:Response){
    const {email, password} = request.body
    const authenticateUserService = new AuthenticateUserService()
    const token = await authenticateUserService.execute({
        email,
        password
    })

    return response.status(200).json(token)
}


export default routes;