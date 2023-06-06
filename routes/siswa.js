const express = require("express")
const router = express.Router()

const siswaController = require("../controllers/siswa")
const adminController = require("../controllers/admin")
const {authenticateToken} = require("../middleware/auth")
const {authorizeRole} = require("../middleware/authorizeRole")


// router.get('/', siswaController.getAllSiswa) //authenticateToken, authorizeRole,
// router.get('/:id', authenticateToken, authorizeRole, siswaController.getSiswaById)
router.post('/siswa-register', adminController.registerSiswa)
// router.post('/login', siswaController.loginSiswa)
// router.put('/:id', siswaController.putSiswa)
// router.put('/edit', siswaController.putSiswa)
// router.delete('/delete', siswaController.deleteSiswa)
// router.delete('/:id', siswaController.deleteSiswa)

router.get('/', adminController.getAllSiswabyAdmin) //authenticateToken, authorizeRole,
router.get('/edit/:id', siswaController.getSiswaById, adminController.getSiswaByIdbyAdmin) //authenticateToken, authorizeRole,
router.get('/delete/:id', adminController.deleteSiswa)
router.post('/login', adminController.loginAdmin)
router.get('/logins', adminController.logins)
router.post('/admin-register', adminController.registerAdmin)
router.post('/edit/:id', adminController.putSiswa)
// router.put('/:id', adminController.putSiswa)
// router.put('/edit', adminController.putSiswa)
// router.delete('/delete', adminController.deleteSiswa)
// router.delete('/:id', adminController.deleteSiswa)

module.exports = router
