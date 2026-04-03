import Calling from "./Calling";
import { Form } from "./form";
import MoreActions from "./MoreActions";

export type ModalType = {
  visible        : boolean;
  onRequestClose : () => void;
} 

export const Modal = {
  MoreActions,
  Calling,
  Form,
};