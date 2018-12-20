import { generateShortId, ISONow } from '../utils/common';

export { apps } from './apps';
export { indexer } from './indexer';
export { triggersDBService } from './triggers';
export { activitiesDBService } from './activities';

export const dbUtils = {
  /**
   * Generate short unique id
   * @type Function
   * @return {string}
   */
  generateShortId,
  /**
   * Returns current server date as ISO String
   * @type Function
   * @return {string}
   */
  ISONow,
};
