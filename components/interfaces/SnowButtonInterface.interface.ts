export interface SnowButtonInterface {
  isLink?: boolean;
  callback?: (e?: any) => void;
  link?: string;
  text: string;
}

export interface ButtonProps {
  text: string;
  onClick?: (e?: any) => void;
  search?: boolean;
  customStyle?: string;
  hasIcon?: boolean;
}

export interface RoundedButtonProps {
  text: string;
}
