export interface IAbstractRedis {
  /**
   * check if the key is in redis
   *
   * @param {string} key
   * @returns {boolean}
   */
  hasKeyInRedis(key: string): Promise<boolean>

  /**
   * get value of key in redis
   *
   * @param {string} key
   * @returns {Promise<string | null>}
   */
  getValue(key: string): Promise<string | null>
}
