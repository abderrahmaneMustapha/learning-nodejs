const express = require('express')
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


module.exports = router