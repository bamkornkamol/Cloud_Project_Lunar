const express = require("express")
const path = require("path")
const pool = require("../config")
const multer = require('multer')

router = express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './static/uploads') // path to save file
    },
    filename: function (req, file, callback) {
        // set file name
        callback(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.post('/RegisUser',upload.single(), async (req, res, next) => {
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try{
        await pool.query(
            "insert into user(fname, lname, email, password, phone) VALUES(?, ?, ?, ?, ?)",
            [req.body.fname, req.body.lname, req.body.email, req.body.password, req.body.phone]
        );
        conn.commit()
        res.status(200).send('success')
    }catch(err){
        await conn.rollback()
        console.log(err)
        return res.status(404).send('add error')
    }finally{
        conn.release()
        console.log('finally')
    }
})

router.post('/Login', upload.single(), async(req, res) => {
    const email =  req.body.email
    const password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    console.log(password, email)

    try{
        const [data] = await pool.query("select * from user where email = ? and password = ?",[email, password])
        if(data.length == 0){
            return res.json('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
        }
        res.json(data)
    }catch(err){
        await conn.rollback()
        console.log(err)
    }finally{
        conn.release()
    }
})

router.get('/myDormitory/:userId',upload.single(), async (req, res, next) => {
    try{
        const result = await pool.query(
            `select * from dormitory where user_id = ?`, [req.params.userId]
        );
        const result2 = await pool.query(
            `select * from user where id = ?`, [req.params.userId]
        );
        console.log(result)
        return res.json({
            dormitory: result,
            user:result2
          })
    }catch (err){
        console.log(err)
    }
})

router.get('/user/:userId',upload.single(), async (req, res, next) => {
    try{
        const result = await pool.query(
            `select * from user where id = ?`, [req.params.userId]
        );
        console.log(result)
        return res.json({
            user: result
          })
    }catch (err){
        console.log(err)
    }
})

// dormitory ==========================================================================================================================

router.post('/RegisDor/:userId',upload.single(), async (req, res, next) => {
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try{
        await pool.query(
            "insert into dormitory(user_id, name, address, province, district, parish, post, phone, room, floor, water, light, duedate) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [req.params.userId, req.body.name, req.body.address, req.body.province, req.body.district, req.body.parish, req.body.post, req.body.phone,
            req.body.room, req.body.floor, req.body.water, req.body.light, req.body.duedate]
        );
        
        conn.commit()
        res.status(200).send('success')
    }catch(err){
        await conn.rollback()
        console.log(err)
        return res.status(404).send('add error')
    }finally{
        conn.release()
        console.log('finally')
    }
})

router.get('/Dormitory/:userId/:dorId',upload.single(), async (req, res, next) => {
    try{
        const result = await pool.query(
            `select * from dormitory where id = ? and user_id = ?`, [req.params.dorId, req.params.userId]
        );
        const result2 = await pool.query(
            `select * from renter where dor_id = ? ORDER BY num_room`, [req.params.dorId]
        );
        return res.json({
            dormitory: result,
            renter: result2
          })
    }catch (err){
        console.log(err)
    }
})

router.put('/editDormitory/:userId/:dorId',upload.single(), async (req, res, next)=>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try{
        await pool.query(
            `update dormitory set name=?, address=?, province=?, district=?, parish=?, post=?, phone=?, room=?, floor=?, water=?, light=?, duedate=? 
            where id = ? and user_id = ?`, [req.body.name, req.body.address, req.body.province, req.body.district, req.body.parish, req.body.post, req.body.phone,
                req.body.room, req.body.floor, req.body.water, req.body.light, req.body.duedate, req.params.dorId, req.params.userId]
        );
        
        conn.commit()
        res.status(200).send('success')
    }catch(err){
        await conn.rollback()
        console.log(err)
        return res.status(404).send('add error')
    }finally{
        conn.release()
        console.log('finally')
    }
})

router.delete('/deleteDormitory/:userId/:dorId', async (req, res, next)=>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try{
        await pool.query(
            `delete from dormitory where id = ? and user_id = ?`, [req.params.dorId, req.params.userId]
        );
        
        conn.commit()
        res.status(200).send('success')
    }catch(err){
        await conn.rollback()
        console.log(err)
        return res.status(404).send('add error')
    }finally{
        conn.release()
        console.log('finally')
    }
})

// dormitory ==========================================================================================================================

// renter ==========================================================================================================================

router.post('/addRenter/:userId/:dorId',upload.single(), async (req, res, next)=>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try{
        await pool.query(
            "insert into renter(dor_id, name1, name2, phone1, phone2, num_room, type, price, email) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [req.params.dorId, req.body.name1, req.body.name2, req.body.phone1, req.body.phone2, req.body.num_room, req.body.type, req.body.price,
            req.body.email]
        );

        conn.commit()
        res.status(200).send('success')
    }catch(err){
        await conn.rollback()
        console.log(err)
        return res.status(404).send('add error')
    }finally{
        conn.release()
        console.log('finally')
    }
})

router.get('/Renter/:userId/:dorId',upload.single(), async (req, res, next) => {
    try{
        const result = await pool.query(
            `select * from renter where dor_id = ? ORDER BY num_room`, [req.params.dorId]
        );
        return res.json({
            renter: result
          })
    }catch (err){
        console.log(err)
    }
})

router.get('/detailRenter/:userId/:dorId/:rentId',upload.single(), async (req, res, next) => {
    try{
        const result = await pool.query(
            `select * from renter where id = ? and dor_id = ?`, [req.params.rentId, req.params.dorId]
        );
        return res.json({
            renter: result
        })
    }catch (err){
        console.log(err)
    }
})

router.put('/editRenter/:userId/:dorId/:rentId',upload.single(), async (req, res, next) => {
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try{
        await pool.query(
            `UPDATE payment SET num_room=? where dor_id = ? and renter_id =?`, 
            [req.body.num_room, req.params.dorId, req.params.rentId]
        );

        await pool.query(
            `UPDATE renter SET  num_room=?,  type=?, price=?, email=?, name1=?, phone1=?, name2=?, phone2=? WHERE id = ? and dor_id = ?`, 
            [req.body.num_room, req.body.type, req.body.price, req.body.email, req.body.name1, req.body.phone1, req.body.name2,
                req.body.phone2, req.params.rentId, req.params.dorId]
        );

        conn.commit()
        res.status(200).send('success')
    }catch(err){
        await conn.rollback()
        console.log(err)
        return res.status(404).send('add error')
    }finally{
        conn.release()
        console.log('finally')
    }
})

router.delete('/deleteRenter/:userId/:dorId/:rentId', async (req, res, next) => {
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try{
        await pool.query(
            `delete from payment where renter_id = ? and dor_id = ?`, [req.params.rentId, req.params.dorId]
        );

        await pool.query(
            `delete from renter where id = ? and dor_id = ?`, [req.params.rentId, req.params.dorId]
        );

        conn.commit()
        res.status(200).send('success')
    }catch(err){
        await conn.rollback()
        console.log(err)
        return res.status(404).send('add error')
    }finally{
        conn.release()
        console.log('finally')
    }
})

// renter ==========================================================================================================================

// payment ==========================================================================================================================

router.get('/payment/:userId/:dorId/:date',upload.single(), async (req, res, next) => {
    try{
        const result = await pool.query(
            `select * from dormitory where id = ?`, [req.params.dorId]
        );
        console.log(req.body.date)

        const result2 = await pool.query(
            `select * from payment where dor_id = ? and date=? ORDER BY num_room`, [req.params.dorId, req.params.date]
        );

        const result3 = await pool.query(
            `select * from renter where dor_id = ? ORDER BY num_room`, [req.params.dorId]
        );

        console.log(result2)
        return res.json({
            dorm:result,
            payment: result2,
            renter: result3
        })
    }catch (err){
        console.log(err)
    }
})

router.post('/addPayment/:userId/:dorId/:rentId',upload.single(), async (req, res, next) => {
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try{
        await pool.query(
            "insert into payment(dor_id, renter_id, num_room, date, water, light, status) VALUES(?, ?, ?, ?, ?, ?, ?)",
            [req.params.dorId, req.params.rentId, req.body.num_room, req.body.date, req.body.water, req.body.light, req.body.status]
        );

        conn.commit()
        res.status(200).send('success')
    }catch(err){
        await conn.rollback()
        console.log(err)
        return res.status(404).send('add error')
    }finally{
        conn.release()
        console.log('finally')
    }
})

router.put('/editStatus/:userId/:dorId/:rentId/:date',upload.single(), async (req, res, next) => {
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try{
        await pool.query(
            `UPDATE payment SET status='1' where dor_id = ? and date = ? and renter_id =?`, 
            [req.params.dorId, req.params.date, req.params.rentId]
        );

        conn.commit()
        res.status(200).send('success')
    }catch(err){
        await conn.rollback()
        console.log(err)
        return res.status(404).send('add error')
    }finally{
        conn.release()
        console.log('finally')
    }
})

// payment ==========================================================================================================================


exports.router = router;