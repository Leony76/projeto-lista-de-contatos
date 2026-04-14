import Calling from "./Calling";
import ConfirmAction from "./ConfirmAction";
import { Form } from "./form";
import ImageExpand from "./ImageExpand";

export type ModalType = {
  visible        : boolean;
  onRequestClose : () => void;
}; 

export const Modal = {
  ConfirmAction,
  ImageExpand,
  Calling,
  Form,
};