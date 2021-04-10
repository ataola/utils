import { version } from './package.json';
import * as cookies from './lib/cookies';

/**
 *
 * @returns {string}
 */

function getVersion() {
  return version;
}

export { cookies, getVersion };
