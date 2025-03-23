import { HashTable, HashTableWithLinearProbing } from "./hashTable.mjs";

let hashTable = new HashTable();

// hashTable.set(1, "이운재");
// hashTable.set(4, "최진철");
// hashTable.set(20, "홍명보");
// hashTable.set(6, "유상철");
// hashTable.set(22, "송중국");
// hashTable.set(21, "박지성");
// hashTable.set(5, "이김남일");
// hashTable.set(10, "이영표");
// hashTable.set(8, "최태욱");
// hashTable.set(9, "설기현");
// hashTable.set(14, "이천수");

// console.log(`1: ${hashTable.get(1)}`);

// hashTable.remove(1);

// console.log(`1: ${hashTable.get(21)}`);

hashTable.set("이운재");
hashTable.set("최진철");
hashTable.set("홍명보");
hashTable.set("유상철");
hashTable.set("송중국");
hashTable.set("박지성");
hashTable.set("김남일");
hashTable.set("이영표");
hashTable.set("최태욱");
hashTable.set("설기현");
hashTable.set("이천수");

console.log(hashTable)

console.log(`이운재: ${hashTable.get('이운재')}`);

hashTable.remove('이운재');

console.log(`이운재: ${hashTable.get('이운재')}`);

// const hashTable_2 = new HashTableWithLinearProbing();

// hashTable_2.set(1, "이운재");
// hashTable_2.set(4, "최진철");
// hashTable_2.set(20, "홍명보");
// hashTable_2.set(6, "유상철");
// hashTable_2.set(22, "송중국");
// hashTable_2.set(21, "박지성");
// hashTable_2.set(5, "이김남일");
// hashTable_2.set(10, "이영표");
// hashTable_2.set(8, "최태욱");
// hashTable_2.set(9, "설기현");
// hashTable_2.set(14, "이천수");

// console.log(`1: ${hashTable_2.get(21)}`);
// console.log(hashTable_2);
// hashTable_2.remove(21);
// console.log(hashTable_2);
// hashTable_2.set(21, "박지성");
// console.log(hashTable_2);
// console.log(`1: ${hashTable_2.get(1)}`);
