import express from "express"
import { PrismaClient } from "./generated/prisma/client.js"
import healthRoutes from "./routes/health.js"
import employeesRoutes from "./routes/employees.js"

const app = express()
const PORT = 3000
app.use(express.json())
const prisma = new PrismaClient();

app.use("/api", healthRoutes)
app.use("/api", employeesRoutes)

app.listen(PORT, (error) =>{
    if(!error)
        console.log(`Server działa na http://localhost: ${PORT}`);
    else
        console.log("Server Error: ", error)
    }
);