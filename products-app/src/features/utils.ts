export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export function mergeTwoArraysOfObjectsById(arr1: {id: string | number}[], arr2: {id: string | number}[]) {
  const hash = new Map();
  arr1.concat(arr2).forEach(function (obj) {
    hash.set(obj.id, Object.assign(hash.get(obj.id) || {}, obj));
  });
  return Array.from(hash.values());
}
