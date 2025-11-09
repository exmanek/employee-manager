const express = require("express")
const healthRoutes = require("./routes/health")
import { PrismaClient } from "@prisma/client";

const app = express()
const PORT = 3000
app.use(express.json())
const prisma = new PrismaClient();

app.use("/api", healthRoutes)

app.listen(PORT, (error) =>{
    if(!error)
        console.log(`Server działa na http://localhost: ${PORT}`);
    else
        console.log("Server Error: ", error)
    }
);