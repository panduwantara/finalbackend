const {format} = require("mysql2")//msyql2 untuk menjalankan stansport
const winston = require("winston")//untuk mendeklarasi winston
const dailyRotateFile = require("winston-daily-rotate-file")//sama kyk diatas

exports.logger = winston.createLogger({

    //error
    //warning
    //info
    //verbose
    //debug
    //silly

    level:"debug",//pemilihan tingkatan level uji cobanya
    format: winston.format.printf((info)=>{//untuk ngeprint info log
        return `level: ${info.level.toUpperCase()} message ${info.message}`
    }),//memberikan hasil berupa info yang di capslock
    transports:[ //mengirim catatan log ke penyimpanan, bisa error atau statusnya berjalan
        new winston.transports.Console({}),
        new dailyRotateFile({//membuat file log
            level :"error",
            filename:"%DATE%-application-error.log",
            zippedArchive: true,
            maxSize: "1m",
            maxFile: "7d",
        }),
        new dailyRotateFile({
            level :"info",
            filename:"%DATE%-application-info.log",
            zippedArchive: true,
            maxSize: "1m",
            maxFile: "7d",
        })
    ]
})