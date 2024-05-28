export interface IParamsRequest {
  page: number;
  size: number;
  q?: string;
}

export type SuccessMessageResponse = "SUCCESS";
export type ErrorMessageResponse = "ERROR";
export type MessageResponse = SuccessMessageResponse | ErrorMessageResponse;

export interface IApiSuccessResponse<T> {
  code: number;
  data: T;
  message: Exclude<MessageResponse, ErrorMessageResponse>;
  error: null;
}

export interface IApiErrorResponse<T> {
  code: number;
  data: T;
  message: Exclude<MessageResponse, SuccessMessageResponse>;
  error: string;
}

export type IApiResponse<T> = IApiSuccessResponse<T> | IApiErrorResponse<T>;

export interface IApiListResponse<T> extends IParamsRequest {
  code: number;
  message: Exclude<MessageResponse, ErrorMessageResponse>;
  error: null;
  items: T[];
}
