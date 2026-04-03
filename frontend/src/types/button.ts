export type ButtonType = {
  label          : string;
  selected?      : boolean;
  borderless?    : boolean;    
  bgTransparent? : boolean;
  flex?          : number;
  pHorizontal?   : number        
  pVertical?     : number     
  disable?       : boolean;   
  fontSize?      : 'XS' | 'SM';
  onClick        : () => void;
  Icon?          : React.ElementType;
}