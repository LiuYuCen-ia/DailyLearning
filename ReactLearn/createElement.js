// 将 jsx 转化为 js

// const element = (
//     <div id="foo">
//         <a>bar</a>
//         <b />
//     </div>
// )
// const element = React.createElement(
//     "div",
//     {id:'foo'},
//     React.createElement(
//         'a',
//         null,
//         'bar'
//     ),
//     React.createElement("b")
// )
// createElement 主要用用于构建元素,只考虑两种情况，一个是子节点为数组，和子节点为 文字的情况
function createElement (type,props,...children) {
    return {
        type,
        props : {
            ...props,
            children : children.map(child => {
               return typeof child === 'object' 
                ? child
                : createTextElement(child)
            }),
        },
    }
}
function createTextElement (text) {
    return {
        type : 'TEXT_ELEMENT',
        props : {
            nodeValue : text,
            children : [],
        }
    }
}
function render (element,container) {
    const dom = element.type == "TEXT_ELEMENT" 
    ? document.createTextNode("")
    : document.createElement(element.type)

    // 过滤掉children属性
    const isProperty = (key) => key !== 'children';
    // 将不上children属性的其余属性全都添加的到 dom 节点上
    Object.keys(element.props)
    //过滤 children 的属性
    .filter(isProperty)
    // 遍历将 props上的属性添加的到dom上
    .forEach(name =>{
        dom[name] = element.props[name]; // 将props上的属性赋值到当前的dom元素上
    })

    // 递归遍历并渲染子节点
    element.props.children.forEach(child => render(child,dom));
    container.appendChild(dom)
}
const Didact = {
    createElement,
    render,
    useState,
}
const container = document.getElementById('root')
/** @jsx Didact.createElement */
const element = (
    <div style="background:red">
        <h1>HELLO</h1>
        <h2 style="text-align:right">
            LucasCen
        </h2>
    </div>
)
Didact.render(element,container)