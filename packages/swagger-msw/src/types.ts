import type { PluginFactoryOptions } from '@kubb/core'

export interface RequestConfig<TVariables = unknown> {
  method: 'get' | 'put' | 'patch' | 'post' | 'delete'

  url: string

  params?: unknown

  data?: TVariables

  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
  signal?: AbortSignal
}

export type Options = {
  /**
   * Output to save the ReactQuery hooks.
   * @default hooks/query
   */
  output?: string
}

export type ResolveIdOptions = { tag?: string }

export type PluginOptions = PluginFactoryOptions<Options, false, undefined, ResolveIdOptions>
