import { getCustomRepository } from "typeorm";
import User from "../models/User";
import UserRepository from "../repositories/UserRepository";

interface IUser {
    name: string,
    password: string;
    email: string
}


class CreateUserService {
    public async  execute({name, email,password}:IUser):Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        const userDB = userRepository.create({
            name,
            email,
            password
        })
        await userRepository.save(userDB);
        return userDB
    }
}

export default CreateUserService