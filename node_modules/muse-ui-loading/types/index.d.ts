import { PluginFunction, VNodeDirective } from 'vue'

export interface LoadingOptions {
  overlayColor?: string
  size?: number
  color?: string
  fixed?: boolean
  target?: Element | HTMLElement
  className?: string
}

export interface LoadingInstance {
  instance: any;
  close(): void;
}

export interface Loading {
  (options?: LoadingOptions): LoadingInstance;
  install: PluginFunction<LoadingOptions>;
  config(options?: LoadingOptions): LoadingOptions;
}

export interface LoadingDirective extends VNodeDirective {
  name: 'loading'
  value: boolean
}

export default Loading

declare module 'vue/types/vue' {
  interface Vue {
    /** If you do not have a specific DOM node to attach the Loading directive, or if you simply prefer not to use Loading as a directive, you can call this service with some configs to open a Loading instance. */
    $loading(options: LoadingOptions): LoadingInstance
  }
}
