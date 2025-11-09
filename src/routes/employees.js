import express from "express"
import { PrismaClient } from "../generated/prisma/client.js"

const prisma = new PrismaClient()
const router = express.Router()

//GET
router.get("/", async (req, res) => {
    const employees = await prisma.employee.findMany();
    res.json(employees)
})

//GET id

//POST

router.post("/", async (req, res) => {
    const {name, position, salary} = req.body
    const newEmployee = await prisma.employee.create({
        data: { name, position, salary: Number(salary) },
})
    res.status(201).json(newEmployee)
})

//PUT

//DELETE
export default router