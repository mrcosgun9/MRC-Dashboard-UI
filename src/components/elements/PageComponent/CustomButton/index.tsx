import { ButtonHTMLAttributes } from "react";

interface IAction {
  type: string
  url: string
}

interface BtnProps extends ButtonHTMLAttributes<any> {
  title: string,
  action: IAction
}

export default function CustomButton({
  className,
  children,
  title,
  action,
  type,
  ...rest
}: BtnProps) {

  const onClick = async () => {
    if (action.type === 'call') {
      // Perform request
    }
  }

  return (
    <button
      {...rest}
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
    >
      {title}
      {children}
    </button>
  )
}
