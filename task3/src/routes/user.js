const express = require('express')
const userModel = require('../models/user')
const router = new express.Router()

router.post('/addUser', async(req,res)=>{
    const user = new userModel(req.body)
    try{
        await user.save()
        res.status(200).send({
            status:1,
            data:user,
            message:'user added successfuly'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error inserting data'
        })
    }
})


router.get('/allUsers', async(req,res)=>{
    try{
        const users = await userModel.find()
        res.status(200).send({
            status:1,
            data:users,
            message:'all data retrieved'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error retreive  data'
        })
    }
})

router.get('/user/:id', async(req,res)=>{
    id = req.params.id
    try{
        user = await userModel.findOne({id:`${id}`})
        res.status(200).send({
            status:1,
            data:user,
            message:'user retrived'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error retrive data'
        })
    }
})
router.patch('/user/:id', async(req,res)=>{
  id = req.params.id
    availableUpdates = ['userName', 'phone','email']
    const reqKeys = Object.keys(req.body) //stil post so req.body
    flag = reqKeys.every(key=> availableUpdates.includes(key))
    try{
        if(!flag) throw new Error('updates not available')
        await userModel.findOneAndUpdate({id:`${id}`}, req.body, {runValidators:true})
        data = await userModel.findOne({id:`${id}`})
        res.status(200).send({
            status:1,
            data:data,
            message: 'updated'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error update data'
        })
    }
})

router.delete('/user/:id', async(req,res)=>{
    const id = req.params.id
    try{
       await userModel.deleteOne({id:`${id}`})
        res.status(200).send({
            status:1,
            data:'',
            message:'deleted'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error inserting data'
        })
    }
})













module.exports=router
