const request = require('supertest')//untuk mendeklarasi supertest
const app = require('./siswa')
const{siswa} = require("./models")

describe('POST /siswa-register', () =>{//untuk menginput value data 
    //test case for success
    test('should create a new user',async() =>{
        const userData ={
            name:'john jono',
            role:'siswa',
            email:'jon@jono.com',
            katasandi:'123456789'
        }

        const response = await request(app).post('/siswa-register').send(userData)
        expect(response.status).toBe(200)
    })
})