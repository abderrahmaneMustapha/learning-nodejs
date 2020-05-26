const express = require('express')
const uuid = require('uuid')

const router = express.Router()


const members = require('../../Members')


// Get all memebers
router.get('/', 
 (req, res)=> res.json(members)
)

// Get single Member
router.get('/:id', (req, res) =>{
    const found = members.some(member => member.id == req.params.id)
    if (found){
        res.status(200).json(members.filter(member => member.id == req.params.id))
    }
    else{
        res.status(400).json({msg : `No member with the id  ${req.params.id}`})

    }
})

// Create a a new member
router.post('/', (res, req)=>{
    
    
    const newMember = {
      id : uuid.v4(),
      name : req.req.body.name,
      email : req.req.body.email,
      status : "active"

    }

    if (!newMember.name || !newMember.email){
        res.status(400).json({msg : 'please include a name and email'})
    }
    members.push(newMember)
    res.res.json(members)
})


// Update a single Member
router.put('/:id', (req, res) =>{
    const found = members.some(member => member.id == req.params.id)
    if (found){
        const upMember = req.body
        members.forEach(member=>{
            if(member.id == req.params.id){
                member.name = upMember.name ?  upMember.name : member.name
                member.email = upMember.email ?  upMember.email : member.email

                res.json({msg : 'Member update', member})

            }
        })
    }
    else{
        res.status(400).json({msg : `No member with the id  ${req.params.id}`})

    }
})

// Delete a member
router.delete('/:id', (req, res) =>{
    const found = members.some(member => member.id == req.params.id)
    if (found){
        res.status(200).json(members.filter(member => member.id != req.params.id))
    }
    else{
        res.status(400).json({msg : `No member with the id  ${req.params.id}`})

    }
})

module.exports = router