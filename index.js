const express = require('express')
const {barang,customer,pembayaran,pemesanan,transaksi} = require("./models")
const app = express()
const port = 3000
app.use(express.json())


app.get('/', async (req, res) => {
    const data = await transaksi.findAll()
    res.send(data)
})

app.get('/profile/:id', async (req, res) => {
    
    const id = req.params.id

    const data = await customer.findOne({
        where : {id},
        include: barang,customer,pemesanan,transaksi
        // attributes: {
        //     exclude : ["createdAt", "updatedAt"]
        // }
    })
    console.log(data)
    res.send(data)
})

app.post('/data-profile', (req, res) => {
    try {
        const body = req.body

        //if (body.name === "John") {
            // isi body seperti di bawah ini
            // {
            //     name:"John"
            // }
                pembayaran.create(body)
        // } else {
        //        return res.status(400).send({
        //             status:400,
        //             data:body,
        //             message:`nama bukan John tapi ${body.name }`
        //         })
        // }

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
})

app.put('/put-profile/:id', async (req, res) => {
    const id = req.params.id
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

    const getSiswa = await siswaData.update( 
        {
            name:body.name
        }
    )

    const siswaUpdated = await siswa.findOne({
        where : {id: getSiswa.id},
        attributes: {
            exclude : ["createdAt", "updatedAt"]
        }
    })

    res.send({
        status:200,
        data:siswaUpdated
    })

})

app.delete('/:id', async (req, res) => {
    const id = req.params.id

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
    
    res.send({
        status:200,
        data:siswaData,
        message:`Success delete data dengan id ${siswaData.id}`
    })
})

app.listen(port, () =>{
    console.log(`Examle app in port ${port}`)
})