export default class StorageHelper {

  public static setItem(key: string, value: string){
    sessionStorage.setItem(key, value)
  }

  public static getItem(key: string){
    try {
      return sessionStorage.getItem(key)
      
    } catch (error) {
      return error
    }
  }
}