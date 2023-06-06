const { admin,siswa } = require("../models");
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

exports.getAllSiswabyAdmin = async (req, res) => {
    try {
        const data =await siswa.findAll({
            attributes:{
                exclude :["createAt","updateAt"]
            }
        })
        res.render("mainPage",{data:data})
         
    } catch (err){
        console.log(err)
        res.send({message: "gajalan lur"})
    }
}

exports.getSiswaByIdbyAdmin = async (req, res) => {
    try {
        const userId = req.params.id
        let data = []    
        if (data[0] == null){
            const dataSiswa = await siswa.findOne({
                where: {id:userId},
                attributes:{
                    exclude:["email","password","createAt","updateAt"],
                }
            })
        if (dataSiswa == undefined || dataSiswa == null){
            return res.status(404).send({
                message:`siswa with id ${userId} not found`
            })
        }
    
        // // return res.status(200).send({
        // //     message:`get siswa with id :${userId}`,
        // //     data : dataSiswa
        // // })
        // console.log("dataaaaaaaaaaaaaaaaaa:",dataSiswa.name)
        res.render("edit",{data:dataSiswa})
        } else {
        // res.status(200).send({
        //     message:`get siswa with Id${userId}`,
        //     data: data[0]
        // })
        res.render("edit",{data:dataSiswa})
        }
       
        // const data = await siswa.findAll({ attributes: { exclude: ["id"] } });
        // res.send(data);
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ 
            message: "internal error" });
      }
    };
//     const id = req.params.id
//     console.log(req.user)

//     const data = await siswa.findOne({
//         where : {id},
//         attributes: {
//             exclude : ["createdAt", "updatedAt"]
//         }
//     })
//     res.send(data)
// }

exports.putSiswa = async (req, res) => {
    const id =  req.params.id
    const body = req.body
    const data = await siswa.findOne({
        where : {id},
        attributes: {
            exclude : ["createdAt", "updatedAt"]
        }
    })
    const getSiswa = await data.update({
        name:body.name,
        tgl_lahir:body.tgl_lahir,
        kelas:body.kelas,
        alamat:body.alamat,
        no_hp:body.no_hp,
        nama_ortu:body.nama_ortu,
        no_hp_ortu:body.no_hp_ortu
        
    }) //jika ingin memakai semuanya tinggal ditulis nama kolomnya saja dah dihilangkan kurungnya
    // const getDataSiswa = await data_siswa.update({tempatLahir:body.tempatLahir,tanggallahir:body.tanggallahir},{where: {id}})   
    // console.log(getSiswa);
    const siswaUpdated = await siswa.findOne({
        where : {id: getSiswa.id},
        attributes: {exclude : ["createdAt", "updatedAt"]
        }
        })      
        console.log("update bangsat!!!!!!!!!!!!!!!!!!!!!")          
        res.redirect("/admin")
    // res.send({status:200,
    //             data:siswaUpdated
    //         })
                
}

exports.deleteSiswa = async (req, res) => {
    const id =  req.params.id
    const body = req.body

    const siswaData = await siswa.findOne({
        where : {id},
        attributes: {
            exclude : ["createdAt", "updatedAt"]
        }
    })

    if (!siswaData) {
        return res.status(404).send({
            message:`siswa dengan id ${id} tidak ditemukan`
        })
    }

    await siswaData.destroy()
    res.redirect("/admin")
    // res.send({
    //     status:200,
    //     data:siswaData,
    //     message:`Success delete data dengan id ${siswaData.id}`
    // })
    
}

exports.registerSiswa = async (req, res) => {
    try {
        const body = req.body
        // let image = null

        const schema = joi.object({
            name :joi.string().min(3).required(),
            tgl_lahir:joi.string().min(1),
            kelas:joi.string().min(1),
            alamat:joi.string().min(1),
            no_hp:joi.string().min(1),
            nama_ortu:joi.string().min(1),
            no_hp_ortu:joi.string().min(1)
        })
    console.log(req.body)
    const {error} = schema.validate(req.body)

    if (error) return res.status (400).send ({
        message: error.details[0].message
    })

        // if (req.file != undefined){
    //     image = req.protocol + "://" + req.get("host") + "/" + req.file.destination + "/" + req.file.filename
    // }

    const getSiswa = await siswa.create(body)
    // res.send({
    //     status:200,
    //     message:getSiswa
    // })
    res.redirect("/admin")
} catch (error) {
    console.log(error)
    return res.send({
        status:500,
        message:'Internal server error'
    })
}
}


exports.registerAdmin = async (req, res) => {
    try {
        const name = req.body.name
        // let image = null

        const schema = joi.object({
            name :joi.string().min(3).required(),
            role :joi.string().valid("admin").required(),
            email:joi.string().email().required(),
            katasandi:joi.string().min(8).required(),
        })
    console.log(req.body)
    const {error} = schema.validate(req.body)

    if (error) return res.status (400).send ({
        message: error.details[0].message
    })

    const hashPassword = await bcrypt.hash(req.body.katasandi, 10)

    // if (req.file != undefined){
    //     image = req.protocol + "://" + req.get("host") + "/" + req.file.destination + "/" + req.file.filename
    // }

    const getSiswa = await admin.create({
        name:name,
        role:req.body.role,
        email:req.body.email,
        katasandi:hashPassword
        // image:image
    })
    res.send({
        status:200,
        message:getSiswa
    })
    //res.redirect("/siswa")
} catch (error) {
    console.log(error)
    return res.send({
        status:500,
        message:'Internal server error'
    })
}
}

exports.logins = async(req,res) => {
    try{
        res.render("login")
    }catch (err)
    {
        console.error(err)
    }
}

exports.loginAdmin = async (req, res) => {
    try {
        const schema = joi.object({
            email:joi.string().email().required(),
            katasandi:joi.string().min(8).required()
        })

        const {error}= schema.validate(req.body)

    if (error) return res.status (400).send ({
        message: error.details[0].message
    })

    let dataAdmin = await admin.findOne({
        where :{
            email:req.body.email
        },
        attributes:{
            exclude:['createAt','updateAt']
        }

    })

    if (!dataAdmin) {
        return res.status(401).send({
            message:'email atau password tidak sesuai'
        })
    }

    const match = await bcrypt.compare(req.body.katasandi, dataAdmin.katasandi)

    if (!match) {
        return res.status(401).send({
            message:'email atau password tidak sesuai'
        })
    }

    const accessToken = jwt.sign({id:dataAdmin.id,name:dataAdmin.name}, process.env.ACCESS_TOKEN_SECRET)//buat token sepbagai mllik si ID

    dataAdmin = {
        id:dataAdmin.id,
        name:dataAdmin.name,
        email:dataAdmin.email,
        token:accessToken
    }
    res.cookie("token",accessToken)
    res.redirect("/admin")
    // res.status(200).send({
    //     message:'success login ya?',
    //     data:dataSiswa
    // })
} catch (error) {
    console.log(error)
    res.send(500).send({
        message:'Internal server error'
    })
}
}

exports.logOut = async (req, res) => {
    console.log(req.cookies)
    res.clearCookie("token")
    res.redirect('/')
}
// exports.autoRegister = async () => {
//     try {
//         const body = {
//             name: "mamang garox",
//             role: "admin",
//             email: "mamanggarox@gmail.com"
//         };
        
//         await siswa.create({
//             name:body.name,
//             role:body.role,
//             email:body.email
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
