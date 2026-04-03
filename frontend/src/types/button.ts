export type ButtonType = {
  label      : string;
  onClick    : () => void;
  selected?  : boolean;
  Icon?      : React.ElementType;
  borderless?: boolean;    
  bgTransparent?: boolean;
  fontSize?: 'XS' | 'SM';
}