exports.authorizeRole = async (req, res, next) => {
    const roleAllowed = ['admin']
    let allowBooelan = false

    roleAllowed.map((value) => {//isinya ada 2 yaitu value dan item, namun karna yang dipakai hanya value, maka item boleh dihapus
        if (req.user.role == value){
            allowBooelan = true
        }
    })

    if (allowBooelan) {
        return next()
    }else{
        return res.status(403).send({
            status: 403,
            message:'akses terlarang'
        })
    }
}