import express from "express"
import { PrismaClient } from "../generated/prisma/client.js"

const prisma = new PrismaClient()
const router = express.Router()

//GET

router.get("/", async(req,res) => {
    const users = await prisma.user.findMany();
    res.json(users)
})

//GET id

router.get("/:id", async (req,res) => {
    const {id} = req.params
    const user = await prisma.user.findUnique( {where: {id: Number(id)}})
    res.json(user)
})

//POST

router.post("/", async (req,res) => {
    const {username, email, password, role} = req.body
    const newUser = await prisma.user.create({
        data: {
            username, email, password, role
        }
    })
    res.status(201).json(newUser)
})

//PUT

//DELETE

export default router