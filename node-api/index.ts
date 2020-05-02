import Express, { response } from 'express';
import {Request, Response} from 'express'

import {DEBUG,COLOR} from './utils/debug';
import {APIUtils, APIStatusEnum} from './utils/api.utils'

//JsonWebToken
import jwt from 'jsonwebtoken';
import ENV from './environments/env.production'
import AuthToken from './middleware/token.middleware'
const token = AuthToken(ENV)
//MongoDBHelper Import
import MongoDBClient from 'mongodb'
import MongoDBHelper from './helpers/mongodb.helper'

//const env={
//    PORT: process.env.PORT||8000,
//    NAME: process.env.NAME || 'Micro-Servicio Punto de Venta',
//    ENVIROMENT: process.env.ENVIROMENT||'Development'

//}
const debug=DEBUG();
const color=COLOR();
//Start Express Server
const app = Express();
//Constante APIUTILS
const apiUtils=APIUtils(ENV);
const mongodb= MongoDBHelper.getInstance(ENV);
app.use(Express.urlencoded({extended:true}));
app.use(Express.json());
//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Routes
app.post('/login',(req:Request,res:Response)=>{
    const{userName,password}=req.body;
    
    const mockUser ={
        fullName: 'Miguel Angel Hernández Venegas',
        userName:'mikehv',
        password:'12345',
        email:'miguel@gmail.com'
    }

    const mockRoles=['Captura_Rol','Admon_Catalogs_Rol','Print_Rol']
    const secretKey=ENV.TOKEN.SECRETKEY;


    //Validar Usuario y Contraseña
    if(userName==mockUser.userName && password==mockUser.password){
        
        //Build Payload
        const payload={
            fullName: mockUser.fullName,
            userName: mockUser.userName,
            email : mockUser.email,
            roles : mockRoles
        }
        //Generar token para ese usuario
        jwt.sign(payload,secretKey,{expiresIn:ENV.TOKEN.EXPIRES},(err,token)=>{
            if(err){
                return res.status(500).json(
                    apiUtils.BodyResponse(
                        APIStatusEnum.Internal_Server_Error,
                        'Internal Server Error',
                        'Error al intentar crear el token',
                        null,
                        err
                    )
                );
            }

            res.status(200).json(
                apiUtils.BodyResponse(
                    APIStatusEnum.Success,
                    'OK',
                    'Token Generado ode forma correcta',
                    {userName:mockUser.userName,token},
                    null
                )
            )
        });
    }else{
        res.status(403).json(
            apiUtils.BodyResponse(
                APIStatusEnum.Forbidden,
                '',
                'Credenciales Invalidas. El usuario y/o contraseña porporcionados no son validos. Favor de verificar.',
                {
                    msg:'Invalid Credentials'
                },
                null
            )
        )
    }
});


app.get('/products',async (req:Request,res:Response) =>{
    const productos= await mongodb.db.collection('products').find({}).toArray()
    
    res.status(200).json(
       apiUtils.BodyResponse(
           APIStatusEnum.Success,'OK','La solicitud ha tenido exito',
           {
                productos,
                authUser:req.body.authUser
               
           }
       )
    );
});

app.get('/product/:codigo',async (req:Request,res:Response) =>{
    const {codigo} = req.params;
    //const _id = new MongoDBClient.ObjectID(id);
    

    const productos= await mongodb.db.collection('products').find({codigo:{$eq:codigo}}).toArray();
    
    res.status(200).json(
       apiUtils.BodyResponse(
           APIStatusEnum.Success,'OK','La solicitud ha tenido exito',
           {
                productos,
                authUser:req.body.authUser
               
           }
       )
    );
});

app.get('/productsByCategoria/:categoria',async (req:Request,res:Response) =>{
    const {categoria} = req.params
    const productos= await mongodb.db.collection('products').find({"categoria":{$regex:categoria,"$options" : "i"}}).toArray()
    
    res.status(200).json(
       apiUtils.BodyResponse(
           APIStatusEnum.Success,'OK','La solicitud ha tenido exito',
           {
                productos,
                authUser:req.body.authUser
               
           }
       )
    );
});

app.get('/productsByDescripcion/:descripcion',async (req:Request,res:Response) =>{
    const {descripcion} = req.params
    const productos= await mongodb.db.collection('products').find({"descripcion":{$regex:descripcion,"$options" : "i"}}).toArray()
    
    res.status(200).json(
       apiUtils.BodyResponse(
           APIStatusEnum.Success,'OK','La solicitud ha tenido exito',
           {
                productos,
                authUser:req.body.authUser
               
           }
       )
    );
});


app.listen(ENV.API.PORT,async()=>{
    try{
        await mongodb.connect();
    }catch(error){
        process.exit();
    }
    
    debug.express(`El servidor ${color.express('Express')} se inicio ${color.success('correctamente')} en el puerto ${color.info(ENV.API.PORT)}`);
});


