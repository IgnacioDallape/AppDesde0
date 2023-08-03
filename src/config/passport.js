import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"; //si o si crearlo asi para el constructor Strategy
import { Users } from "../dao/models/Users.model.js";
import { createHash } from "../utils/bscrypt.js";


const initializatePassport = () => {
    //register
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                let data = req.body
                let findinig = await Users.findOne({ email: username })
                if (findinig) {
                    console.log('usuario existente')
                    done(null, false)
                }
                let newUser = {
                    name: data.firstName,
                    lastname: data.lastName,
                    email: data.email,
                    password: createHash(data.password),
                    admin: false
                }
                if (data.email == 'nacho.dallape@gmail.com') {
                    newUser.admin = true
                }
                let adding = await Users.create(newUser)
                if (!adding) {
                    console.log('error en crear el usuario en adding')
                    return false
                }
                done(null, adding)  //el primer valor es null siempre
            } catch (error) {
                console.log(error)
                done('error al crear usuario' + error)
            }
        }

    )),
        passport.serializeUser((user, done) => {  //user es result del done anterior
            done(null, user._id)
        }),
        passport.deserializeUser(async (id, done) => {
            let user = await Users.findById(id)
            done(null, user)
        })

}

export { initializatePassport }