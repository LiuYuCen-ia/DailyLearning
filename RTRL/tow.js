// 最大递增子序列
// 1、dp[i] ：以 i 结尾的数组连续递增的子序列的长度 dp[i] 
// 2、动态方程：dp[i] = Math(dp[i],dp[j] + 1); 表示 第 i 项的最长子序列 和 dp[j] 表示 当 j 项 小于 i 项 的 到时候 记录长度 +1 项。
// 3、初始化dp: 子序列最少为 1 .
// 4、遍历顺序：dp[i] 是由 dp[i-1] 项以前推到得出
// 5、推到公式：[0,1,0,3,2] 可得 ,当  i > j 记录并 + 1，当再次遇到 i>j项的数据则在找到记录到的最大的数进行统计。
function  lengthOfLIS (nums) {
    let len = nums.length
    let dp = Array(len).fill(1);
    for(let i = 1; i < len; i++) {
        for(let j = 0; j < i; j++) {
            if(nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i],dp[j] + 1)
            }
        }
    }
    return Math.max(...dp)
}
