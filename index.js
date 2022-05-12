import { version } from './package.json';
import * as cookies from './lib/cookies';
import * as judge from './lib/judge';
import * as element from './lib/element';
import * as generator from './lib/generator';
import * as logger from './lib/logger';
import * as url from './lib/url';
import * as num from './lib/num';
import * as color from './lib/color';
import * as baguwen from './lib/baguwen';
/**
 *
 * @returns {string}
 */

function getVersion() {
  return version;
}

export {
  cookies,
  judge,
  element,
  generator,
  logger,
  url,
  num,
  color,
  baguwen,
  getVersion,
};
