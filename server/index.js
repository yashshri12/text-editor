import {Server} from 'socket.io'
import Connection from './database/config.js'
import { getDocument,updateDocument } from './controller/documentController.js'
import document from './schema/document.js'
const PORT =9000

Connection()

const io = new Server(PORT,{
    cors:{ 
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
}) 

io.on("connection", socket =>{
    socket.on("get-document",async documentId=>{
        const document = await getDocument(documentId);
        socket.join(documentId)
        socket.emit("load-document",document.data)

    socket.on("send-change", delta=>{
        socket.broadcast.to(documentId).emit("recieve-change",delta)
        })

    socket.on("save-document",async data =>{
        await updateDocument(documentId,data)
    })    
    })
   
   
})

