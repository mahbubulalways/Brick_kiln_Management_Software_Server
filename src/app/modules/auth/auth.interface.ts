export interface IAuth {
  username: string;
  password: string;
  extra: {
    device: string;
    browser: string;
  };
  ip: string;
}
export type TResetPasswordPayload = {
  email: string;
  confirmPassword: string;
  newPassword: string;
};
