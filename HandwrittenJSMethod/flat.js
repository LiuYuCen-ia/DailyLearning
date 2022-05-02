// 递归实现 flat 
function flat (array,level) {
    // 不输入默认为 1
    if(level == undefined) {
        level = 1;
    }
    if(level > 0) {
        // 使用 reduce 遍历
        return array.reduce((tota,itme) => {
            return tota.concat(Array.isArray(itme) ? flat(itme,level-1) : itme)
        },[])
    }else {
        return array
    }
}
// 使用非递归实现
function myFlat (arr,level) {
    if(level == undefined) level = 1;
    while(arr.some(itme => Array.isArray(itme) && level > 0)) {
        arr = [].concat(...arr)
        level--
    }
    return arr
}
// const flatArr = myFlat([1,2,3,[4,[5,[6]]]], 1);
// console.log(flatArr); // [1, 2, 3, 4, Array(2)]

//  对象扁平化
function flatten (obj) {
    const res = {};
    const inner = function (obj,props) {
        // 遍历对象
        for(let key in obj) {
            // 判断当前属性的值是否是对象
            if(obj[key] instanceof Object) {
                // 表示传入的
                if(props == null) {
                    inner(obj[key],key)
                }else {
                    inner(obj[key],props + '.' + key)
                }
            }
        }
    }
    inner(obj,"")
    return res;
}
