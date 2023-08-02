import { Users } from "../../dao/models/Users.model.js";

class UsersManager{
    async addUser(name, lastname, email, password){
        try {
                const newUser = {
                    name: name,
                    lastname: lastname,
                    password: password,
                    email: email
                }
                let a = await Users.create(newUser)
                console.log(a)
                return a
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export { UsersManager }