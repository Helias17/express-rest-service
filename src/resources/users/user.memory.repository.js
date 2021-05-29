let users = [];
const User = require('./user.model');


/** get all users
 * @returns {array} return array of user's instances
*/
const getAllUsers = async () => users.map(User.toResponse);


/** create user
 * @param {string} name - user's name
 * @param {string} login - user's login
 * @param {string} password - user's password
 * @returns {Object|undefined} return created user instance, if user was not found return undefined
*/
const createUser = async (name, login, password) => {
  const newUser = new User(name, login, password);
  users.push(newUser);
  return User.toResponse(newUser);
}


/** get user by id
 * @param {id} id - user's id
 * @returns {Object|undefined} return user instance, if user was not found return undefined
*/
const getUserById = async (id) => users.find( user => user.id === id)


/** delete user
 * @param {id} id - user's id
 * @returns {boolean} return true, if user was succesfully deleted, else - return false
*/
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


/** update user info
 * @param {id} id - user's id
 * @param {userInfo} userInfo - data to update user
 * @returns {Object|null} return updated user or null, if user wasn't found
*/
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