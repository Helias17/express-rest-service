let users = [];
const User = require('./user.model');

const getAllUsers = async () => users.map(User.toResponse);

const createUser = async (name, login, password) => {
  const newUser = new User(name, login, password);
  users.push(newUser);
  return User.toResponse(newUser);
}

const getUserById = async (id) => users.find( user => user.id === id)

const deleteUser = async (id) => {
  let isUserDeleted = false;
  users = users.filter( user => {
    if (user.id !== id) {
      return true;
    }
    isUserDeleted = true;
    return false;
  } );

  return isUserDeleted;
}

const updateUser = async (id, userInfo) => {
  const userArrIndex = users.findIndex( item => item.id === id );
  if (userArrIndex >= 0) {
    users[userArrIndex].name = userInfo.name;
    users[userArrIndex].login = userInfo.login;
    users[userArrIndex].password = userInfo.password;
    return User.toResponse(users[userArrIndex]);
  }    
  return null;
}


module.exports = { 
  users, 
  getUserById, 
  createUser, 
  getAllUsers,
  deleteUser,
  updateUser,
};