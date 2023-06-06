const { siswa,data_siswa } = require("../models");
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

exports.getAllSiswa = async (req, res) => {
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

exports.getSiswaById = async (req, res) => {
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

exports.postSiswa = async (req, res) => {
    try {
        let image = null
        if (req.file != undefined){
            image = req.protocol + "://" + req.get("host") + "/" + req.file.destination + "/" + req.file.filename
        }

        const body = req.body
        await  siswa.create({
            name:body.name,
            foto:image
        })

        res.send({
            status:200,
            data:body
        })
    } catch (error) {
        console.log(error)
        return res.send({
            status:500,
            message:'Internal server error'
        })
    }
}

exports.putSiswa = async (req, res) => {
    const id =  req.params.id
    const body = req.body
    const data = await siswa.findOne({
        where : {id},
        include : data_siswa,
        attributes: {
            exclude : ["createdAt", "updatedAt"]
        }
    })
    const getSiswa = await data.update({
        name:body.name,
        email:body.email,
        role:body.role,
        password:body.password
    }) //jika ingin memakai semuanya tinggal ditulis nama kolomnya saja dah dihilangkan kurungnya
    // const getDataSiswa = await data_siswa.update({tempatLahir:body.tempatLahir,tanggallahir:body.tanggallahir},{where: {id}})   
    // console.log(getSiswa);
    const siswaUpdated = await siswa.findOne({
        where : {id: getSiswa.id},
        attributes: {exclude : ["createdAt", "updatedAt"]
        }
        })      
        console.log("update bangsat!!!!!!!!!!!!!!!!!!!!!")          
        res.redirect("/siswa")
    // res.send({status:200,
    //             data:siswaUpdated
    //         })
                
}

exports.deleteSiswa = async (req, res) => {
    const id =  req.params.id
    const body = req.body

    const siswaData = await siswa.findOne({
        where : {id},
        include: data_siswa,
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
    res.redirect("/siswa")
    // res.send({
    //     status:200,
    //     data:siswaData,
    //     message:`Success delete data dengan id ${siswaData.id}`
    // })
    
}



exports.logins = async(req,res) => {
    try{
        res.render("login")
    }catch (err)
    {
        console.error(err)
    }
}

exports.loginSiswa = async (req, res) => {
    try {
        const schema = joi.object({
            email:joi.string().email().required(),
            katasandi:joi.string().min(8).required()
        })

        const {error}= schema.validate(req.body)

    if (error) return res.status (400).send ({
        message: error.details[0].message
    })

    let dataSiswa = await siswa.findOne({
        where :{
            email:req.body.email
        },
        attributes:{
            exclude:['createAt','updateAt']
        }

    })

    if (!dataSiswa) {
        return res.status(401).send({
            message:'email atau password tidak sesuai'
        })
    }

    const match = await bcrypt.compare(req.body.katasandi, dataSiswa.katasandi)

    if (!match) {
        return res.status(401).send({
            message:'email atau password tidak sesuai'
        })
    }

    const accessToken = jwt.sign({id:dataSiswa.id,name:dataSiswa.name}, process.env.ACCESS_TOKEN_SECRET)//buat token sepbagai mllik si ID

    dataSiswa = {
        id:dataSiswa.id,
        name:dataSiswa.name,
        email:dataSiswa.email,
        token:accessToken
    }
    res.cookie("token",accessToken)
    res.redirect("/siswa")
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
