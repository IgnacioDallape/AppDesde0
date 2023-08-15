import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// ^ Importación correcta: utiliza "Strategy as GoogleStrategy"

import passport from "passport";

passport.use(new GoogleStrategy(
    {
        clientID: '1038362339187-pkdfqh5go977sve9ellc7ekeecbf8j1l.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        done(null, profile)
    }
));

export { passport }
