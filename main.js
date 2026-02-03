
import { connectMongoDB } from "./config/mongoDB.config.js"
import express from 'express'
import authRouter from "./routes/auth.router.js"
import randomMiddleware from "./middlewares/random.middleware.js"
import cors from 'cors'
import workspaceRouter from "./routes/workspace.router.js"
import workspaceRepository from "./repository/workspace.repository.js"
import messagesRepository from "./repository/messages.repository.js"

connectMongoDB()

const app = express()

app.use(cors())

app.use(express.json())


app.use("/api/auth", authRouter)
app.use("/api/workspace", workspaceRouter)

app.listen(
    8080, 
    () => {
        console.log('Nuestra app se escucha en el puerto 8080')
    }
)

/* mail_transporter.sendMail({
    from: ENVIRONMENT.GMAIL_USERNAME,
    to: ENVIRONMENT.GMAIL_USERNAME,
    subject: 'Probando nodemailer',
    html: `<h1>Probando nodemailer</h1>`
}) */

/* async function crearEspacioDeTrabajo (){

    const workspace = await workspaceRepository.create(
        'id aca',
        'test',
        'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Descripcion del espacio de trabajo'
    )
    await workspaceRepository.addMember(workspace._id, 'id aca', 'Owner')
}

crearEspacioDeTrabajo() */
