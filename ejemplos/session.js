//session prueba

// function auth(req,res,next){
// if(!req.session.admin || !req.session.user){
//     res.status(401).send('primero debe loguarse como admin')
//     return false
// }
// next()
// }

// app.get('/log', (req,res) => {
//     let {username, password} = req.query
//     req.session.username = username;
//     req.session.password = password;
//     console.log(req.session.username)
//     console.log(req.session.password)
//     if(username !== 'nacho' || password != 1234){
//         console.log('error al loguear')
//         res.status(400).send('error al loguarse')
//         return false
//     }
//     req.session.user = username;
//     req.session.admin = true
//     res.send('logueado!')

// })

// app.get('/private', auth, (req,res) => {
//     res.send('te logueaste al privado!')
// })

// app.get('/logout', (req,res) => {
//     req.session.destroy(err => {
//         if(err){
//             console.log(err)
//             res.status(500).send('logout erroneo')
//         }
//         res.send('logout ok')
//     })
// })