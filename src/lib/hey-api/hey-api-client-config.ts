import type { ClientOptions, Config } from './generated/client'

/**
 * Customize the generated API client configuration.
 * Extend this function if you need to override defaults such as baseURL or headers.
 */
export function createClientConfig<T extends ClientOptions>(
  config: Config<T>
): Config<T> {
  return config
}

