import pkg from './package.json';
import * as cookies from './lib/cookies';
import * as judge from './lib/judge';

/**
 *
 * @returns {string}
 */

function getVersion() {
  return pkg.version;
}

export { cookies, judge, getVersion };
