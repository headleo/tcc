const express =  require("express");
const app = express();
const http = require('http')
const server = http.createServer(app);
const path = require('path');

const socketIo = require('socket.io')

const io = socketIo.listen(server) 


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/',(req,res)=>{
        console.log("acessou por aqui")
        res.render('index')
})
var historico = [];
io.on('connection',(socket)=>{

    console.log('Nova conexão');
    

    

    historico.forEach(linha => {
        socket.emit('desenhar',linha)
    });

    

    socket.on('desenhar',(linha)=>{
        historico.push(linha);
        io.emit('desenhar',linha)
    })

    socket.on('clear', ()=>{
        historico = new Array()
        io.emit('desenhar')
      })

})
server.listen(process.env.PORT || '3000', ()=>{
    console.log("running")
})
