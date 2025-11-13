import express from "express";
import { PrismaClient } from "../generated/prisma/client.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config";

const prisma = new PrismaClient();
const router = express.Router();

//register

router.post("/register", async (req,res) => {
    try{
        const {username,email, password, role} = req.body

        const existingUser = await prisma.user.findUnique({where: { email }})
        if (existingUser) {
            return res.status(400).json({error: "User already exists!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role: role || "EMPLOYEE"
            }
        });
        res.status(201).json({message: "User registered succesfully!"})
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Błąd serwera" });
    }
})

//login
router.post("/login", async (req,res) =>{
    try {
        const {email, password} = req.body;

        const user = await prisma.user.findUnique({ where: {email}})

        if(!user){
            return res.status(400).json({error: "Invalid email or password"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password"})
        }

        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.json({ message: "Logged in succesfully!", token})
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
})

export default router