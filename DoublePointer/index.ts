// 创建节点
class ListNode {
    val : number;
    next : ListNode;
    constructor (val ?: number,next ?: ListNode | null) {
        this.val = (val == undefined ? 0 : val)
        this.next = (next == undefined ? null : next)
    }
}
// 82 删除排序链表中的重复元素
function deleteDuplicates (head : ListNode | null) : ListNode | null  {
    if(!head) {
        return head;
    }
    // 创建一个新的链表
    let prv = new ListNode(-1);
    // 将当前链表指向head
    prv.next = head;
    // 在将当前链表赋值给 curr
    let curr = prv;
    // 当前节点的 val 和 下一个节点的 val 如果两个值相等，在继续，将当前节点进行移动。
    while(curr.next && curr.next.next) {
        if(curr.next.val == curr.next.next.val) {
            let val = curr.next.val;
            while(curr.next && curr.next.val == val) {
                curr.next = curr.next.next;
            }
        }else {
            // 没有重复，继续移动
            curr = curr.next;
        }
    }
    return prv.next; 
}
// 15 三数之和
function threeSum (nums : number[]) : number[][]{
    let res : number[][] = [];
    // 先排序
    nums.sort((a,b) => a - b);
    // 判断特殊条件
    if(nums[0] > 0 || nums.length < 3) return res;
    // 循环遍历数组
    for(let i = 0; i < nums.length; i++) {
        // 去重
        if(i > 0 && nums[i] == nums[i-1]) continue;
        // 使用双指针，及 左指针为 i+1 项开始走，右指针 为 nums.length-1 项，使用往中间走的两个指针。
        let l : number = i + 1, r : number = nums.length - 1;
        // 循环判断 左右指针是否相等
        while(l < r) {
            // 获得三个数的和
            let sum : number = nums[l] + nums[r] + nums[i];
            // 判断和是否相等
            if(sum == 0) {
                // 进入数组
                res.push([nums[i],nums[l],nums[r]]);
                // 去除数组中的重复项 
                while(l < r && nums[l] == nums[l+1]) l++;
                while(l < r && nums[r] == nums[r-1]) r--;
                l++;
                r--;
            }else if(sum < 0) {
                // 当小于 0  的 ，表示左边的数不够大
                l++;
            }else {
                // 反之
                r--;
            }
        }
    }
    return res;
}
// 844 比较含退格的字符串
function backspaceCompare (t : string,s : string) : Boolean{
    function toStr (str:string) : string {
        let flag : number = 0;
        let resStr : string = ""
        for(let i = str.length - 1; i >= 0; i++) {
            if(str[i] === "#") {
                flag++;
            }else if(flag > 0) {
                flag--
            }else {
                resStr += str[i]
            }
        }
        return resStr;
    }
    return toStr(s) == toStr(t)
}
