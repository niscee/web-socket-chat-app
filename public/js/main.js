const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();




//get username and group from url
const { username,room } = Qs.parse(location.search, {
      ignoreQueryPrefix:true
});



//send username and room value to the server
socket.emit('user_and_room_info',{username,room});


//receiving message from the server and displaying in the view
socket.on('message',message=>{
  outputMessage(message)
  
  //latest message scroll up chat box
  chatMessages.scrollTop = chatMessages.scrollHeight;


});


// on form submit
chatForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const msg = e.target.elements.msg.value;

    //emiting msg to server
    socket.emit('chatMessage',msg);

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});


//display function
function outputMessage(message){

  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
                   <p class="text">
                   ${message.text}
                   </p>`;
  document.querySelector('.chat-messages').appendChild(div);                 

}