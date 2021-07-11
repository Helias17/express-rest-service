export class LoginDto {
  readonly login: string;
  readonly password: string;

  constructor({
    login = 'login',
    password = '123456',
  }) {
    this.login = login;
    this.password = password;
  }
}
