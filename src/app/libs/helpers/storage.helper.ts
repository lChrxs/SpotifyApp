export default class StorageHelper {

  /**
   * This function takes a key and a value as parameters and sets the value of the key in session
   * storage
   * @param {string} key - The key to store the value under.
   * @param {string} value - The value to store.
   */
  public static setItem(key: string, value: string){
    sessionStorage.setItem(key, value)
  }

  /**
   * It returns the value of the key passed in as a parameter.
   * @param {string} key - The key of the item you want to get from the session storage.
   * @returns The value of the key in sessionStorage.
   */
  public static getItem(key: string){
    try {
      return sessionStorage.getItem(key)
      
    } catch (error) {
      return error
    }
  }
}