import { VNode, CreateElement, PluginFunction } from "vue";

export type MessageModel = 'alert' | 'prompt' | 'confirm';
export type MessageType = '' | 'success' | 'info' | 'warning' | 'error';
type CreateElementFunc = (h: CreateElement) => VNode;
type BeforeCloseFunction = (result: boolean, modal: any, close: () => void) => any;
type ValidatorResult = { valid: boolean, message: string };
type MessageReturn = { result: boolean, value?: string | number };
type Validator = (value: string | number) => ValidatorResult;
export interface MessageOptions {
  successIcon?: string;
  infoIcon?: string;
  warningIcon?: string;
  errorIcon?: string;
  title?: string;
  icon?: string;
  iconSize?: number;
  mode?: MessageModel;
  type?: MessageType;
  content?: string | CreateElementFunc;
  width?: number | string;
  maxWidth?: number | string;
  className?: string;
  transition?: string;
  beforeClose?: BeforeCloseFunction;
  okLabel?: string;
  cancelLabel?: string;
  inputType?: string;
  inputPlaceholder?: string;
  inputValue?: string | number;
  validator?: Validator;
}

export interface Message {
  (options: MessageOptions): Promise<MessageReturn>;
  config(options: MessageOptions): MessageOptions;
  install: PluginFunction<MessageOptions>;
  alert(content: string, options: MessageOptions): Promise<MessageReturn>;
  alert(content: string, title: string, options: MessageOptions): Promise<MessageReturn>;
  confirm(content: string, options: MessageOptions): Promise<MessageReturn>;
  confirm(content: string, title: string, options: MessageOptions): Promise<MessageReturn>;
  prompt(content: string, options: MessageOptions): Promise<MessageReturn>;
  prompt(content: string, title: string, options: MessageOptions): Promise<MessageReturn>;
}

export default Message;


declare module 'vue/types/vue' {
  interface Vue {
    $message(options: MessageOptions): Promise<MessageReturn>;
    $alert(content: string, options: MessageOptions): Promise<MessageReturn>;
    $alert(content: string, title: string, options: MessageOptions): Promise<MessageReturn>;
    $confirm(content: string, options: MessageOptions): Promise<MessageReturn>;
    $confirm(content: string, title: string, options: MessageOptions): Promise<MessageReturn>;
    $prompt(content: string, options: MessageOptions): Promise<MessageReturn>;
    $prompt(content: string, title: string, options: MessageOptions): Promise<MessageReturn>;
  }
}

