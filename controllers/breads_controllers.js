const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')

// INDEX
breads.get('/', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            Bread.find()
                .then(foundBreads => {
                res.render('index', {
                    breads: foundBreads,
                    bakers: foundBakers,
                    title: 'Index Page'
                })
            })
        })
    // res.render('index', {
    //     breads: Bread,
    //     title: 'Index Page'
    // })
    // res.send(Bread)
})

// NEW
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
        })
})

//EDIT
breads.get('/:indexArray/edit', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            Bread.findById(req.params.indexArray)
                .then(foundBread => {
                    res.render('edit', {
                        bread: foundBread,
                        bakers: foundBakers
                    })
                })
        })
})

//EDIT BEFORE MONGOOSE
//breads.get('/:indexArray/edit', (req, res) => {
//    res.render('edit', {
//        bread: Bread[req.params.indexArray],
//        index: req.params.indexArray
//    })
//})

// SHOW
breads.get('/:arrayIndex', (req, res) => {
    Bread.findById(req.params.arrayIndex)
        .populate('baker')
        .then(foundBread => {
            const bakedBy = foundBread.getBakedBy()
            /*console.log(bakedBy)*/
            res.render('show', {
                bread: foundBread
        })
    })
    .catch(err => {
        res.send('404')
    })
})

// SHOW before Mongoose
// breads.get('/:arrayIndex', (req, res) => {
//     if (Bread[req.params.arrayIndex]) {
//         res.render('Show', {
//             bread: Bread[req.params.arrayIndex],
//             index: req.params.arrayIndex,
//         })        
//     } else {
//         res.send('404')
//     }

//     // res.send(Bread[req.params.arrayIndex])
// })

// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
      req.body.image = undefined
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect('/breads')
})

// CREATE before Mongoose
// breads.post('/', (req, res) => {
//     if (!req.body.image) {
//       req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
//     }
//     if(req.body.hasGluten === 'on') {
//       req.body.hasGluten = true
//     } else {
//       req.body.hasGluten = false
//     }
//     Bread.push(req.body)
//     res.redirect('/breads')
//   })

// DELETE
breads.delete('/:indexArray', (req, res) => {
    // Bread.splice(req.params.indexArray, 1)
    Bread.findByIdAndDelete(req.params.indexArray)
        .then(deletedBread => {
            res.status(303).redirect('/breads')
        })
    
})

// DELETE BEFORE MONGOOSE
//breads.delete('/:indexArray', (req, res) => {
//    Bread.splice(req.params.indexArray, 1)
//    res.status(303).redirect('/breads')
//})

// UPDATE
breads.put('/:arrayIndex',(req, res) => {
    if (req.body.hasGluten == 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.arrayIndex, req.body, {new:true})
        .then(updatedBread => {
            res.redirect(`/breads/${req.params.arrayIndex}`)
        })
    // Bread[req.params.arrayIndex] = req.body
})

// UPDATE BEFORE MONGOOSE
//breads.put('/:arrayIndex', (req, res) => {
//    if (req.body.hasGluten == 'on') {
//        req.body.hasGluten = true
//    } else {
//        req.body.hasGluten = false
//    }
//    Bread[req.params.arrayIndex] = req.body
//    res.redirect(`/breads/${req.params.arrayIndex}`)
//})

module.exports = breads
