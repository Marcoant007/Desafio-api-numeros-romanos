import { application, Router } from "express";

const routes = Router();

interface NumBody {
    num1: number;
    num2: number
}
interface numberRoman {
    I : number;
    V : number;
    X : number;
    L : number;
    C : number;
    D : number;
    M : number
}


routes.post("/soma", (request, response) => {
    let values : number[] = []
    values = request.body.values;
   
    const listNumbers = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
      };


    let numbersRomans = ["I", "V", "X", "L", "C", "D", "M"]



    console.log(values)
    


    return response.status(200).json();

})

routes.post("/subtracao", (request, response) => {
    
})




export default routes;