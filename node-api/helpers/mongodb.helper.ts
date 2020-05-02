import {MongoClient} from 'mongodb'
import {DEBUG,COLOR} from '../utils/debug'


export default class MongoDB{
    public db:any;

    private cnn:any;
    private port:number;
    private dbUri: string;
    private static _instance: MongoDB;

    constructor(CONFIG : any){
        this.port = CONFIG.MONGODB.PORT
        if(CONFIG.MONGODB.USER_NAME != ""){
            this.dbUri= `mongodb://${CONFIG.MONGODB.USER_NAME}:${CONFIG.MONGODB.USER_PASSWORD}@${CONFIG.MONGODB.HOST}:${CONFIG.MONGODB.PORT}/${CONFIG.MONGODB.DEFAULT_DATABASE}`;
        }else{
            this.dbUri= `mongodb://${CONFIG.MONGODB.HOST}:${CONFIG.MONGODB.PORT}/${CONFIG.MONGODB.DEFAULT_DATABASE}`;
        }
        //console.log(this.dbUri)
    }

    public static getInstance(CONFIG:any){
        return this._instance||(this._instance=new this(CONFIG));
    }

    async connect(){
        //console.log(this.dbUri)
        await MongoClient.connect(this.dbUri,{useNewUrlParser:true,useUnifiedTopology:true})
            .then((connection)=>{
                console.log(`Conectado a MongoDB en el puerto ${this.port}`)
                this.cnn = connection
                this.db = this.cnn.db();
            })
            .catch((err)=>{
                console.log('Ocurrio un error al intentar conectarse a MongoDb',err)
            })
    }

    setDataBase(dbName:string){
        this.db= this.cnn.db(dbName);
    }

}