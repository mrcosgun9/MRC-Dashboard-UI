import { ReactElement } from "react"
 
export type MenuItemType={
  icon?: ReactElement<any, any>,
  title:string,
  href?:string,
  childs?:MenuItemType[]
}