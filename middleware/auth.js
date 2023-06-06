const jwt = require('jsonwebtoken');
const {siswa} = require('../models')

exports.authenticateToken = async (req, res, next) => {
    try {
        
        const cookie = req.cookies
        const token = cookie && cookie.token;

        if (!cookie || Object.keys(cookie).length == 0 || cookie == null){
        return res.send({
            status: 401,
            message: 'Unathorized'
        })
        } 

        let userVerifiedId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {//pencocokan token
            if (err) {
                return res.status(401).send({
                status: 'failed',
                message:err.message
                })
            }
            return user.id//jika hasilnya cocok maka berjalan
        })
        const userVerified = await siswa.findOne({
            where:  {
                id:userVerifiedId
            },
            attributes:{
                exclude:['katasandi','createAt','updateAt']
            }
        })
        req.user = userVerified.dataValues //untuk meminta data orayng yang log in
        next()

        } catch (error) {
        console.log(error)
        return res.send({
        status:500,
        message:'Internal server error'
    })
}
}