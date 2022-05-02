// 下一个工作单位
interface Props {
    children : any;
}
export interface Fiber {
    type : any,
    dom : any;
    parent ?: any;
    props : Props;
    child ?: any;
    sibling ?: any;
    alternate : Fiber;
    effectTag : String;
    hooks ?: any;
}
import { updateHostComponent } from './isFunctionComponnets'
import {commitDeletion} from './commitDeletion'
// 下一个工作节点
let nextUnitOfWork : any = null;
// 用于跟踪 fiberRoot
let wipRoot : any = null;
// 保存对最后一个 fiebrTree 的引用。
let currentRoot : Fiber | null = null;
let deletetions = []
let wipFiber : Fiber = null;
let hookIndex : number = null;
// function workLoop (deadline) {
//     // 用来表示是否结束，进行浏览器绘制
//     let shoulYield : boolean = false;
//     while(nextUnitOfWork && !shoulYield) {
//         nextUnitOfWork = preformUnitOfWork(nextUnitOfWork);
//         shoulYield = deadline.timeRemaining() < 1;
//     }
//     // 浏览器空闲指向该函数
//     requestIdleCallback(workLoop)
// }
// 用来指向当前工作并返回下一个工作，并为fiber添加三件事：将 fiber添加到 dom中，为元素的子元素创建 fiber，并返选择下一个工作单位。
// 使用三个指针 return 指向父元素，children指向子元素，sibling指向兄弟元素
// 当child指针没有child元素的时候，我们会将sibling作为下一个工作单位
function preformUnitOfWork(fiber: Fiber) {
    // if(!fiber.dom) {
    //     fiber.dom = createDom(fiber)
    // }
    // // 浏览器可能会在我们完成渲染树之前中断我们的工作，这种情况用户看不到完整的UI，所以不需要改变dom
    // // if(fiber.parent) {
    // //     fiber.parent.dom.appendChild(fiber.dom)
    // // }
    // const elements : any = fiber.props.children;
    // reconcileChildren(fiber,elements)
    const isFunctionComponent =
        fiber.type instanceof Function;
    if(isFunctionComponent) {
        updateFunctionComponent(fiber)
    }else {
        updateHostComponent(fiber)
    }
    // 寻找下一个工作单位
    if(fiber.child) {
        return fiber.child;
    }
    let nextFiber = fiber;
    // 当没有子节点的时候且还有下一个节点，返回兄弟节点
    while(nextFiber) {
        if(nextFiber.sibling) {
            return nextFiber.sibling;
        }
        // 然后是兄弟节点的祖先节点
        nextFiber = nextFiber.parent;
    }
}
function reconcileChildren (wipFiber : Fiber,elements) {
    let index = 0;
    // 旧的 fiber 节点，保存的上一个的 fiber 且 上一个的 fiber 有 child
    let oldFiber : Fiber = 
    wipFiber.alternate && wipFiber.alternate.child
    let prevSibling = null;
    while(index < elements.length || oldFiber !== null) {
        const element = elements[index];
        // 创建 新的 fiber
        // const newFiber = {
        //     type : element.type,
        //     props : element.props,
        //     parent : wipFiber,
        //     dom : null,
        // }
        let newFiber : Fiber = null;

        // TODO compare oldFiber to element;
        // 旧的Fiber 与新的有相同的类型，也就是没改变元素，保留节点，使用新的 props 来进行更新。旧的 fiber 存在 且 元素存在，且类型相等。
        const sameType = 
        oldFiber && 
        element &&
        element.type == oldFiber.type;
        // 元素不变更新 props
        if(sameType) {
            // TODO 更新 props
            newFiber = {
                type : oldFiber.type,
                props : element.props,
                dom : oldFiber.dom,
                parent : wipFiber,
                alternate : oldFiber,
                effectTag : "UPDATE"
            }
        }
        // 元素 变化
        if(!sameType && element) {
            // TODO 添加节点，创建新节点
            newFiber = {
                type : element.type,
                props : element.props,
                dom : null,
                parent : wipFiber,
                alternate : null,
                effectTag : "PLACEMENT",
            }
        }
        // 有旧 的  fiber 则删除旧的节点
        if(oldFiber && !sameType) {
            oldFiber.effectTag = "DELETION",
            deletetions.push(oldFiber)
        }
        // 将其添加到fiberTree中将其设置为子节点或兄弟节点，取决于是否是第一个子节点。
        if(index ===  0) { // 表示为第一个子节点
            wipFiber.child = newFiber;
        }else {
            prevSibling.sibling = newFiber;
        }
        prevSibling = newFiber;
        index++
    }
}
// 创建元素
function createDom (fiber) {
    const dom = 
    fiber.type === "TEXT_ELEMENT" 
    ? document.createTextNode("")
    : document.createElement(fiber.type)
    const isProperty = key => key !== "children"
    Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
        dom[name] = fiber.props[name];
    })
    return dom;
}
function render(element:any,container) {
    // 跟踪fiberRoot,称为进行的 root 或 wipRoot
     wipRoot = {
        dom : container,
        props : {
            children : [element],
        },
        // 旧的的 fiber 的链表。
        alternate : currentRoot,
    }
    deletetions = []
    nextUnitOfWork =  wipRoot;
}
function workLoop (deadline) {
    let shoulYield = false;
    while(nextUnitOfWork && !shoulYield) {
        nextUnitOfWork = preformUnitOfWork(nextUnitOfWork);
        shoulYield = deadline.timeRemaining() < 1;
    }
    if(!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
    requestIdleCallback(workLoop)
}
// 将整个Fiber提交给DOM
function commitRoot () {
    deletetions.forEach(commitWork)
    // 将所有节点添加到dom上
    commitWork(wipRoot.child);
    currentRoot = wipRoot; // 保存上一个节点的引用
    wipRoot = null;
  
}
// 递归将节点添加到 dom上
function commitWork (fiber) {
    if(!fiber) {
        return;
    }
    // 查找 dom的 父节点
    let domParentFiber = fiber.parent
    while(!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent
    }
    const domParent = fiber.parent.dom
    // domParent.appendChild(fiber.dom);
    if(
        fiber.effectTag === "PLACEMENT" &&
        fiber.dom !== null
    ) {
        // 判断是否要更新dom节点
        domParent.appendChild(fiber.dom)
    }else if(fiber.effectTag === "DELETION") {
        // 删除节点，在旧的 fiber上操作
        // domParent.removeChild(fiber.dom)
        commitDeletion(fiber,domParent)
    } else if(
        fiber.effectTag === "UPDATE" &&
        fiber.dom !== null
        ) {
            updateDom(
                fiber.dom,
                fiber.alternate.props,
                fiber.props
            )
        }
    commitWork(fiber.child);
    commitWork(fiber.sibling)
}





// 判断 监听事件, startsWith查看字符串开头
const isEvent = key => key.startsWith("on")
// 判断当前传入的 属性不为 children 属性 , 且不为监听事件
const isProperty = key => key !== "children" && !isEvent(key);
// 传入两个 对象，传入属性值，判断当两个属性 值不相等的时候表示 要创建一个新的
const isNew = (prev,next) => key => prev[key] !== next[key];
// 判断 传入的key 值是否存在下一个 对象中。
const isGone = (prev,next) => key => !(key in next)
function updateDom (dom,prevProps,nextProps) {
    // TODO 更新，当节点没有变化，则引用旧的dom，使用新的props

    // 删除旧的监听事件
    Object.keys(prevProps)
    .filter(isEvent)
    .filter(
        key => 
        !(key in nextProps) ||
        isNew(prevProps,nextProps)(key)
    )
    .forEach(name => {
        const eventType = name
        .toLowerCase()
        .substring(2)
        dom.removeEventListener(
            eventType,
            prevProps[name]
        )
    })
    // 添加新的 event 监听事件
    Object.keys(nextProps)
    .filter(isEvent)
    .filter(prevProps,nextProps)
    .forEach(name => {
        const eventType = name
        .toLowerCase()
        .substring(2)
        dom.addEventListener(
            eventType,
            nextProps[name]
        )
    })

    // 删除旧的 fiber 上的 props
        Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps,nextProps))
        .forEach(name => {
            dom[name] = ""
        })
    // 设置新的 props
    Object.keys(nextProps)
    .filter(isNew(prevProps,nextProps))
    .forEach(name => {
        dom[name] = nextProps[name]
    }) 
}

function useState (initial) {
    // TODO 
    const oldHook = wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex]
    const hook = {
        // 用来初始化
        state : oldHook ? oldHook.state : initial,
        queue : [],
    }
    // 判断是否有旧的 oldHook 是否为空 如果为空 则为 [] ,不为空则是将旧的 oldHook中存储的 queue 赋值给 actions 
    const actions = oldHook ? oldHook.queue : [];
    // action 表示 传入的状态
    actions.forEach(action => {
        hook.state = action(hook.state)
    })
    // 通过 action 表 setState 传入的 数据
    const setState = action => {
        hook.queue.push(action);
        wipRoot = {
            dom : currentRoot.dom,
            props: currentRoot.props,
            alternate : currentRoot,
        }
        nextUnitOfWork = wipRoot
        deletetions = []
    }
    wipFiber.hooks.push(hook);
    hookIndex++;
    return [hook.state,setState]
}

function updateFunctionComponent (fiber) {
    // TODO
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []
    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber,children)
} 

export {
    reconcileChildren,
    createDom,
}