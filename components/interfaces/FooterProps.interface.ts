export interface FooterProps {
  top?: boolean;
  styles?: string;
  array?: FooterArrayItem[];
}

type FooterArrayItem = {
  text: string;
  href: string;
  items?: {
    href: string;
    text: string;
  }[];
};
