import jwt from 'jsonwebtoken'
import ENVIRONMENT from '../config/environment.config.js'
import ServerError from '../helpers/error.helpers.js'

function authMiddleware(request, response, next) {
    try {

        const authorization_header = request.headers.authorization

        if (!authorization_header) {
            throw new ServerError('No autorizado', 401)
        }

        const auth_token = authorization_header.split(' ')[1]

        if (!auth_token) {
            throw new ServerError('No autorizado', 401)
        }

        const user = jwt.verify(auth_token, ENVIRONMENT.JWT_SECRET_KEY)

        request.user = user
        next()
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return response.status(401).json(
                {
                    ok: false,
                    status: 401,
                    message: "No autorizado",
                    data: null
                }
            )
        }
        if (error.status) {
            return response.status(error.status).json({
                status: error.status,
                ok: false,
                message: error.message,
                data: null
            })
        }

        return response.status(500).json({
            ok: false,
            status: 500,
            message: "Error interno del servidor",
            data: null
        })
    }
}

export default authMiddleware