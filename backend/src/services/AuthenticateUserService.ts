import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAutenticateRequest {
    email: string
    password: string
}


class AuthenticateUserService {
    async execute({ email, password }: IAutenticateRequest) {
        const userRepository = getCustomRepository(UserRepository)

        const users = await userRepository.findOne({
            email
        })

        if (!users) {
            throw new Error("Email/Password incorret")
        }

        const passwordMatch = compare(password, users.password);
        if (!passwordMatch) {
            throw new Error("Password/Email incorret")
        }

        //Gerar token
        const token = sign({
            email: users.email
        }, "bbbdbab10845abec69bded536b8e491a", {
            subject: users.name,
            expiresIn: "1d"
        });

        return token

    }
}

export default AuthenticateUserService