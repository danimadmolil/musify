/**
 *
 * @param {*} arr an array with object as its items
 * @param {*} key the common key on array elements(objects) that use as key of each object on the result object
 * @example  mapArrayToObject([{id:1,name:'some name'}],"id")
 * @result  {1:{id:1:name:"some name"}}
 * */
export default function mapArrayToObject(arr, key) {
  return arr.reduce((ac, next) => {
    if (typeof next === "object") {
      ac[next[key]] = next;
      return ac;
    } else {
      throw Error(
        `each item of array that you want map to object should be an object with key of ${key} on it`
      );
    }
  }, {});
}
