export default class Utils {
  static isEmpty(val) {
    return (
        val === null ||
        val === undefined ||
        val === "" ||
        val === "null" ||
        val === 0 ||
        val === "0" ||
        (Array.isArray(val) && val.length === 0) ||
        (Object.keys(val).length === 0 && val.constructor === Object)
    );
  }
}
