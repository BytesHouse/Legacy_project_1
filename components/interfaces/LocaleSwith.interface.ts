export interface LocaleSwitchProps {
  locale: string | undefined;
  locales: string[] | undefined;
  currentPath: string;
  isMenuOpen?: boolean;
  isAuthPage?: boolean;
  top?: boolean;
}

export interface LocaleData {
  name: string;
}
