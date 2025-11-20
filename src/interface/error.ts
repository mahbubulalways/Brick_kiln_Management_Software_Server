export interface IErrorSource {
  path: string | number;
  message: string;
}

export type IErrorSources = IErrorSource[];

export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorSources: IErrorSources;
}
