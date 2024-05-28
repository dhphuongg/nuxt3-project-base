export interface IPage {
  path: string;
  name?: string;
  title?: string;
}
export interface IPages {
  home: IPage;
  "not-found": IPage;
}
