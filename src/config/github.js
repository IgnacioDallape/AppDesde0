import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.use('github',
    new GitHubStrategy({
        clientID: '9d93044cb65baf1c3951',
        clientSecret: '7db2a63471c1df12f3894f54f5139c8e52403eec',
        callbackURL: "http://localhost:8080/auth/github/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile)
            done(null, profile)
        }
    ));

export { passport }