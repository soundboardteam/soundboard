import admin from '../config/firebase-config'
import { Response, Request, NextFunction } from 'express'

class Middleware {
    async decodeToken(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]
            try {
                const decodeValue = await admin.auth().verifyIdToken(token)
                console.log(decodeValue)
                if (decodeValue) {
                    res.json(decodeValue)
                    next()
                }
                res.json({ message: 'Unauthorized' })
            } catch (e) {
                res.json({ message: 'Internal Error' })
            }
        } else {
            res.json({ message: 'Unauthorized' })
        }
    }
}

module.exports = new Middleware()
