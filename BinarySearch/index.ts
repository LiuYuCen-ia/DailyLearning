// 二分查找模板

function binarySearchTemplate (nums : number[],target : number) {
    let l : number = 0, r : number = nums.length - 1; 
    while(l <= r) {
        let mid : number = (l + r) >> 1;
        if(nums[mid]  == target) {
            // 按题意操作
        }else if(nums[mid] > target){
            r = mid - 1;
        }else {
            l = mid + 1;
        }
    }
}
// LeetCode  153  寻找旋转排序数组中的最小值
// 根据题目意思可得。一个数组旋转 1 - n 次的到旋转后的数组，在旋转后的数组查找最小值。 
function findMin (nums : number[]) {
    let l : number = 0, r : number = nums.length - 1;
    while(l < r) {
        // 取到中间值
        let mid = (l + r) >> 1;
        if(nums[mid] < nums[r]) {
            // 如果当前项比最后一项要小，则将当前项的较小的值的下标 赋值 给 r 边，继续往中间夹，当前条件不满足则跳出循环。
            r = mid;
        }else {
            l = mid + 1;
        }
    }
    return nums[l]
}
// LeetCode  162 寻找峰值
function findPeakElement (nums : number[]) : number {
    let l : number = 0, r  : number = nums.length;
    while(l < r) {
        let mid : number = l + (r - l) >> 1;  // 防止越界
        if(nums[mid] > nums[mid + 1]) {
            // 下降阶段
            r = mid;
        }else {
            // 上升阶段
            l = mid + 1; 
        }
    }
    return l;
}