const users = [];


//join user to chat
function userJoin(id,username,room){
	const user = {id,username,room};
	users.push(user);
	console.log("how are you??");
	return user;

}



//get current user
function getCurrentUser(id){
	return  users.find(user=>user.id === id);
}


//get user who logged out
function userLeave(id){
	const index = users.findIndex(user=>user.id === id);
	if (index != -1){
		return users.splice(index, 1);
	}
}


//get room users
function getRoomUsers(room){
	return users.filter(user=>user.room === room);
}


module.exports = {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers
}