import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {APIUtils,APIStatusEnum} from '../utils/api.utils'


export default (CONFIG:any)=>{
    const apiUtils=APIUtils(CONFIG)
    return{
        verify:(req: Request,res:Response,next:NextFunction)=>{
            const bearerHeader = req.headers['authorization']
            if(typeof bearerHeader !== 'undefined'){
                const bearer=bearerHeader.split(' ')
                const bearerToken=bearer[1]
                
                jwt.verify(bearerToken,CONFIG.TOKEN.SECRETKEY,(err:any,tokenDecoded:any)=>{
                    if(err){
                        return res.status(APIStatusEnum.Forbidden).json(
                            apiUtils.BodyResponse(
                                APIStatusEnum.Forbidden,
                                'Acceso Prohibido al verificar el Token (Middleware TOKENs)',
                                'El token proporcionado, noes un token valido, favor de verificar',
                                { },
                                err
                            )
                        )
                    }
                    req.body.authUser=tokenDecoded
                    next()
                })
            }else{
                return res.status(APIStatusEnum.Unauthorized).json(
                    apiUtils.BodyResponse(
                        APIStatusEnum.Unauthorized,
                        'Acceso no autorizado',
                        'Necesita proporcionar un Token',
                        {},
                        {}
                    )
                )
            }
        }
    }
}