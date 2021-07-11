export class CreateUserDto {
  readonly name: string;
  readonly login: string;
  readonly password: string;

  constructor({
    name = 'User default name',
    login = 'User default login',
    password = '123456',
  }) {
    this.name = name;
    this.login = login;
    this.password = password;
  }

}
