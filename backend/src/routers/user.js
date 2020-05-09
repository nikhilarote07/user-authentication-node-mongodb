const express = require("express");
const User = require("../models/User")
const auth = require("../middleware/auth")
const router = express.Router()

router.post("/users", async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token})
    } catch(error) {
        res.status(400).send(error)
    }
})

router.post("/user/login", async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password)
        console.log("user", user)
        if(!user) {
            return res.status(401).send({ error: "Login failed!!! Check Authentication credientials"})
        }
        const token =  await user.generateAuthToken()
        res.send({ user, token, loginStatus: true})
    } catch(error) {

    }
})

router.get("/user/me", auth, async( req, res) => {
    res.send(req.user)
})

router.post("/user/me/logout", auth, async(req, res) => {
    try {
        req.user.token = req.user.token.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send({ message: "Logout Successfully" })
    } catch(error) {
        res.status(500).send(error)
    }
})

router.post("/user/me/logoutAll", auth, async(req, res) => {
    try {
        req.user.token = req.user.token.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send({ message: "Logout Successfully" })
    } catch(error) {
        res.status(500).send(error)
    }
})

module.exports = router