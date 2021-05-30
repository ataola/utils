import { version } from './package.json';
import * as cookies from './lib/cookies';
import * as judge from './lib/judge';
import * as element from './lib/element';
import * as generator from './lib/generator';
import * as logger from './lib/logger';
import * as url from './lib/url';
/**
 *
 * @returns {string}
 */

function getVersion() {
  return version;
}

export { cookies, judge, element, generator, logger, url, getVersion };
