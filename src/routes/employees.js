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

router.get("/:id", async (req, res) => {
    const { id } = req.params
    const employee = await prisma.employee.findUnique( {where: { id: Number(id)}})
    res.json(employee)
})

//POST

router.post("/", async (req, res) => {
    const {name, position, salary} = req.body
    const newEmployee = await prisma.employee.create({
        data: { name, position, salary: Number(salary) },
})
    res.status(201).json(newEmployee)
})

//PUT

router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { name, position, salary } = req.body
    const updatedEmployee = await prisma.employee.update({
        where: {id: Number(id)},
        data: {name,position,salary: Number(salary)},
    })
    res.json(updatedEmployee)
})

//DELETE

router.delete("/:id", async (req,res)=>{
    const {id} = req.params
    await prisma.employee.delete({where: {id: Number(id)}})
    res.json({message: "Employee with id "+id+" deleted succesfully!"})
})
export default router