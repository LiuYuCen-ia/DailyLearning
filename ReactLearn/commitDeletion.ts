import { Fiber } from "./ConcurrentMode"

// 删除节点，直到我们找到一个带有 dom节点的 子节点
function commitDeletion (fiber : Fiber,domParent) {
    if(fiber.dom) {
        domParent.removeChild(fiber.dom)
    }else {
        commitDeletion(fiber.child,domParent)
    }
}
export {
    commitDeletion
}