export interface IBaseDataResponse<TData> extends IBaseReponse {
  data: TData;
}
export interface IBaseDatasResponse<TData> extends IBaseReponse {
  data: TData[];
}
export interface IBaseReponse {
  message: string | null;
  status: ResponseStatus;
}
export interface BaseReponse {
  message: string | null;
  status: ResponseStatus;
}
export enum ResponseStatus {
  Ok,
  Error,
  Forbidden,
  Unauthorized,
  Invalid,
  Notfound,
  BasketClear,
}
