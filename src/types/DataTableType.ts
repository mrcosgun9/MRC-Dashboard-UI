export type ColumnType={
  name: string, 
  uid: string, 
  sortable?: boolean,
  type?:ColumnTypeEnum,
  othersData?:string[]
}
export enum ColumnTypeEnum{
  image,
  actions,
  email,
  avatar
}