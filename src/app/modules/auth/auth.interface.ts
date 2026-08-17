export interface IAuth {
  username: string;
  password: string;
  extra: {
    device: string;
    browser: string
  }
}
