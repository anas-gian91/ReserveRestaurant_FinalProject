const Guest = require("../models/guestModel");

const createGuest = async(req,res)=>{
    try{
        const savedGuest = await Guest.create(req.body);
        res.status(201).send(savedGuest);
    }catch (error){
        res.status(500).send({error:error.message});
    }
}

const getGuestById =async(req,res)=>{
    try{
        const guest = await Guest.findById(req.params.id);
        if(!guest){
            return res.status(404).send({error:'Guest not found'});
        }
        res.status(201).send(guest);
    }catch(error){
        res.status(500).send({error:error.message});
    }
}
const getGuestByEmail =async(req,res)=>{
    try{
        const guest = await Guest.findOne({email:req.params.email});
        if(!guest){
            return res.status(404).send({error:'Guest not found'});
        }
        res.status(201).send(guest);
    }catch(error){
        res.status(500).send({error:error.message});
    }
};

const updateGuest =async(req,res)=>{
    try{
        const updatedGuest= await Guest.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true});
        if(!updatedGuest){
            return res.status(404).send({error:'Guest not found'});
        }
        res.status(201).send(updatedGuest);
    }catch(error){
        res.status(500).send({error:error.message});
    }
}
const deleteGuest =async(req,res)=>{
    try{
        const deletedGuest = await Guest.findByIdAndDelete(req.params.id);
        if(!deletedGuest){
            return res.status(404).send({error:'Guest not found'});
        }
        res.status(201).send({msg:'Guest deleted succesfully'});

    }catch(error){
        res.status(500).send({error:error.message});
    }
};

module.exports={
    createGuest,
    getGuestById,
    getGuestByEmail,
    updateGuest,
    deleteGuest
};