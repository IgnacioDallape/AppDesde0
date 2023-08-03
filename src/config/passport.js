import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"; //si o si crearlo asi para el constructor Strategy
import { Users } from "../dao/models/Users.model.js";
import { createHash, isValidPassword } from "../utils/bscrypt.js";


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
                    return done(null, false)
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
                return done(null, adding)  //el primer valor es null siempre
            } catch (error) {
                console.log(error)
                return done('error al crear usuario' + error)
            }
        }
    ));

    passport.use('login', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                let user = await Users.findOne({ email: username })
                if (!user) {
                    console.log('email no encontrado')
                    return done(null, false)
                }
                let descryptingPassword = await isValidPassword(user, password)
                if (!descryptingPassword) {
                    console.log('contraseña incorrecta')
                    return done(null, false)
                }

                return done(null, user)
            } catch (error) {
                console.log(error)
                return done('error al iniciar sesion ' + error)
            }
        }
    ))

        passport.serializeUser((req, user, done) => {  //user es result del done anterior
            req.session.name = user.name
            req.session.email = user.email
            req.session.admin = false
            if (req.session.email == 'nacho.dallape@gmail.com') {
                req.session.admin = true
            }
            done(null, user._id)
        }),
        passport.deserializeUser(async (id, done) => {
            let user = await Users.findById(id)
            done(null, user)
        })

}

export { initializatePassport }