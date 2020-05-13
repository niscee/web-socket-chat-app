const express = require('express');
const http = require('http'); //express do have http module but we are calling it directly to use socket.io
const path = require('path');
const socketio = require('socket.io');
const formatMsg = require('./util/messageformat');
const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./util/usersstate');

const app = express();
const server = http.createServer(app);
const io = socketio(server);




//set static folder address
app.use(express.static(path.join(__dirname,'public')));

//run whenever client connects Each namespace emits a connection event that receives each Socket instance as a parameter
io.on('connection',socket => {
      
      
     //receiving username and room value from client
     socket.on('user_and_room_info',({username,room})=>{

     // call function userJoin for formating date
     const user = userJoin(socket.id,username,room);
     socket.join(user.room); //specific room 

     //msg display when someone enters the chat room
     socket.emit('message',formatMsg('System','welcome to chat board'));

   //Broadcast when user connects+
   socket.broadcast.to(user.room).emit('message',formatMsg('admin',`${user.username} has joined the chat`));   // to send message to all except current(you) user
 });


   //when client disconect
   socket.on('disconnect',()=>{
     const user = userLeave(socket.id);
     
   	 
    });

   //get chat message from the client
   socket.on('chatMessage',msg=>{
     const user = getCurrentUser(socket.id)
     io.to(user.room).emit('message',formatMsg(user.username,msg));
   });



 });


const PORT = 3000 || process.env.PORT; //look to see if we have environment variable PORT or not if port then use that port else 3000
server.listen(PORT,()=>console.log(`welcome, server running on PORT:  ${PORT}`)); //run a server which need a port number