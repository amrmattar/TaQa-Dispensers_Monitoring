export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  icon?:string;
  photo?:string;
  children?: NavItem[];
}
