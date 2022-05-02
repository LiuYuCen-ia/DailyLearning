import { reconcileChildren,createDom, Fiber} from './ConcurrentMode'


function updateHostComponent (fiber) {
    if(!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    reconcileChildren(fiber,fiber.props.children)
}
export {
    updateHostComponent
}