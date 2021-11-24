import { EntityRepository, Repository } from "typeorm";
import User from "../models/User";

@EntityRepository(User)
class UserRepository extends Repository<User>{
    public async findUser(name: string): Promise<User | undefined> {
        const userDB = await this.findOne({
            where: { name: name }
        })
        return userDB;
    }
}

export default UserRepository;