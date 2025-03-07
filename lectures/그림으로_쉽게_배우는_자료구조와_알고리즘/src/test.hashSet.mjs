import { HashSet } from "./hashSet.mjs";

let hashSet = new HashSet();

console.log(`isEmpty: ${hashSet.isEmpty()}`);

console.log("===========first Input============");

hashSet.add(1);
hashSet.add(1);
hashSet.add(2);
hashSet.add(3);

hashSet.printAll();

console.log(`isEmpty: ${hashSet.isEmpty()}`);

console.log("===========second Input============");

console.log(`isContain: ${hashSet.isContain(1)}`);

hashSet.remove(1);

hashSet.printAll();

console.log(`isEmpty: ${hashSet.isEmpty()}`);
