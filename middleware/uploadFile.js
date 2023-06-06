const multer =  require("multer")
const storage =  multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, "fileUpload")
    },
    filename: function (req, file, cb){
            cb(null, Date.now() +'-' + file.originalname.replace(/\s/g, ""))
    }
})

const upload = multer(({storage}))
module.exports.upload = upload