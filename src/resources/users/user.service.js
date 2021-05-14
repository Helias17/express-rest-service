const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = async () => usersRepo.users.map(User.toResponse);

const createUser = async (name, login, password) => {
  const newUser = new User(name, login, password);
  usersRepo.users.push(newUser);
  return User.toResponse(newUser);
};

const getUserById = async (id) => {
  const foundUser = usersRepo.users.find( user => {
    console.log('user.id', user.id);
    console.log('id', id);
    return user.id === id;
  });
  console.log(foundUser);
  return foundUser ? User.toResponse(foundUser) : null;
};


module.exports = { getAll, createUser, getUserById };
