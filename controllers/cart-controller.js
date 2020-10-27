const express = require('express')
const app = express()

const shortid = require('shortid')
const db = require('../db')

module.exports.addCart = function(req, res)  {
    let id = req.signedCookies.sessionId
    let idProduct  = req.params.id
    if(!req.signedCookies.sessionId)
    {
        res.redirect('/')
        return;
    }


    let count = db.get('sessions').find({id:id}).get('cart.' + idProduct, 0).value()

    db.get('sessions')
        .find({id:id})
        .set('cart.' + idProduct, count + 1)
        .write()

    res.redirect('/')
}