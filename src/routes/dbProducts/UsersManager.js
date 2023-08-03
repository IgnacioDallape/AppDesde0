import { Users } from "../../dao/models/Users.model.js";
import { createHash, isValidPassword } from "../../utils/bscrypt.js";

class UsersManager {
    async addUser(name, lastname, email, password) {
        try {
            const newUser = {
                name: name,
                lastname: lastname,
                password: createHash(password),
                email: email
            }
            let a = await Users.create(newUser)
            return a
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async findUser(email) {
        try {
            let finding = await Users.findOne({ email: email })
            console.log(finding, 2)
            if (finding) {
                console.log('email ya registrado')
                return false
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async loginUser(user, password) {
        try {
            console.log(user)
            let finding = await Users.findOne({ email: user.email })
            if (!finding) {
                console.log('error en finding')
                return false
            }
            let validating = await isValidPassword(finding, password)
            if (!validating) {
                console.log('error en validating')
                return false
            }
            return finding
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export { UsersManager }