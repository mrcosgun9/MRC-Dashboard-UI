export type ColumnType={
  name: string, 
  uid: string, 
  sortable?: boolean,
  type?:ColumnTypeEnum
}
export enum ColumnTypeEnum{
  image,
  actions,
  email
}