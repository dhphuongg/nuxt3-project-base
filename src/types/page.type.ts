export interface IPage {
  path: string;
  name?: string;
  title?: string;
}
export interface IPages {
  home: IPage;
  login: IPage;
  register: IPage;
  "not-found": IPage;
}
