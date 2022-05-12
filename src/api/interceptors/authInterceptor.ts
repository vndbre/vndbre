import { AxiosRequestConfig } from 'axios';
import { KEY_TOKEN, KEY_USERNAME } from '../../utils/localStorageKeys';
import { ApiProxyEndpoints } from '../apiProxyEndpoints';
import { LocalStorageService } from '../services/localStorageService';

const authenticationRequiredEndpoints = [ApiProxyEndpoints.Logout];

/**
 * Checks if a request should be intercepted.
 * @param config Request config.
 */
function shouldInterceptToken(config: AxiosRequestConfig): boolean {
  return config.url != null && authenticationRequiredEndpoints.includes(config.url as ApiProxyEndpoints);
}

/**
 * Interceptor that adds token and username to requests.
 * @param config Axios config.
 */
export function authInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
  if (!shouldInterceptToken(config)) {
    return config;
  }

  const token = LocalStorageService.get(KEY_TOKEN);
  const username = LocalStorageService.get(KEY_USERNAME);

  if (token == null || username == null) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      username,
      sessiontoken: token,
    },
  };
}
