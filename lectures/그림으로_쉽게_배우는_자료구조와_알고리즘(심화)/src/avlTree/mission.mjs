import { AVLTree } from "./avlTree.mjs";

class GabageCollector {
    constructor() {
        this.tree = new AVLTree();
    }

    // 노드 추가
    insertFreeMemory(data) {
        this.tree.root = this.tree.insert(this.tree.root, data);
    }

    // 가장 인근의 노드 찾기
    searchFreeMemory(data) {
        if (this.tree.root === null) {
            return null;
        }

        let currentNode = this.tree.root;
        let parentNode = null;

        while (currentNode !== null) {
            // 현재 노드가 찾고자 하는 데이터보다 작을 경우 오른쪽 서브트리로 이동
            if (currentNode.getData() < data) {
                currentNode = currentNode.getRightSubTree();
            } else {
                // 찾고자 하는 데이터보다 큰 노드를 발견할 경우 부모 노드에 저장 후 왼쪽 서브트리로 이동
                parentNode = currentNode;
                currentNode = currentNode.getLeftSubTree();
            }
        }

        return parentNode ? parentNode : null;
    }

    // 노드 제거
    releaseFreeMemory(data) {
        this.tree.root = this.tree.remove(this.tree.root, data);
    }
}

const gc = new GabageCollector();
console.log("========== 빈 메모리 영역 초기화 ==========");
gc.insertFreeMemory(64); // 빈 64바이트 삽입
gc.insertFreeMemory(48); // 빈 48바이트 삽입
gc.insertFreeMemory(87); // 빈 87바이트 삽입
gc.insertFreeMemory(13); // 빈 13바이트 삽입
gc.insertFreeMemory(102); // 빈 102바이트 삽입
gc.insertFreeMemory(34); // 빈 34바이트 삽입
gc.insertFreeMemory(61); // 빈 61바이트 삽입
gc.insertFreeMemory(40); // 빈 40바이트 삽입
gc.insertFreeMemory(6); // 빈 6바이트 삽입

console.log("========== 삽입된 메모리 중위 순회 ==========");
gc.tree.root.inOrderTraversal(gc.tree.root);

console.log("========== 메모리 제거 1 ==========");
let freeMemory1 = gc.searchFreeMemory(64); // 64바이트 메모리
console.log(freeMemory1 ? freeMemory1.getData() : "매모리를 추가할 수 없습니다.");
if (freeMemory1) {
    gc.releaseFreeMemory(freeMemory1.data);
}
console.log("========== 메모리 제거 2 ==========");
let freeMemory2 = gc.searchFreeMemory(42); // 48바이트 메모리 획득
console.log(freeMemory2 ? freeMemory2.getData() : "매모리를 추가할 수 없습니다.");
if (freeMemory2) {
    gc.releaseFreeMemory(freeMemory2.data);
}

console.log("========== 변경된 메모리 중위 순회 ==========");
gc.tree.root.inOrderTraversal(gc.tree.root);
