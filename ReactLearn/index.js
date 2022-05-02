//使用 React 来实现元素的创建
// let element = <h1 title="foo">Hello</h1>
// 获取 容器 也就是根节点
const container = document.getElementById("root");
// 使用 render 函数 创建节点，将元素放入 根节点中 
ReactDOM.render(element,container)

// 将 element = <h1 title="foo">Hello</h1> 使用原生js来实现
// let element = React.createElement(
//     'h1', // 元素类型
//     {title:'foo'}, // 属性
//     "Hello" // 文本节点
// )

// 将 jsx 元素 使用 React.createElement 将元素创建为一下元素对象 也就是虚拟 DOM ,children 是一个数组，主要用来表示层级关系
// 主要关注 type 和 props
let element = {
    type : 'h1',
    props : {
        title : 'foo',
        children : "Hello"
    }
}
// 创建的DOM元素类
let DOM = document.createElement(element.type);
// 添加属性
DOM['title'] = element.props.title;
// 添加字符子节点,先创建一共文字节点，在将文字节点添加到，nodeValue表示 text 节点的属性。
let text = document.createTextNode('')
// 向文本节点的 值属性添加 数据
text["nodeValue"] = element.props.children;

// 在elemet元素中添加值节点
DOM.appendChild(text)
container.appendChild(DOM)