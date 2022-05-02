// 2022 4-23
// 1、 斐波那契数列 例如：0 1 1 2 3 5 8 13 ...
// 按照动态规划5步取来完成
// 1、确定下标及意义 : dp[i] 表示 第 i 个 斐波那契的值
// 2、确认递推公式： 斐波那契数组的第 dp[i] = dp[i-1] + dp[i-2]的值
// 3、初始化dp数组：dp[0] = 0, dp[1] = 1;
// 4、确认遍历顺序：因为要得到 由递推公式得到 dp[i]的值需要得到 dp[i-1] 和 dp[i-2] 的值,所以是顺序遍历。
// 5、举例推到递推公式，当出现与预期结果不同可将dp数组打印出来
function fiber (n) {
    let dp = [0,1]; // 初始化dp数组
    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2]; // 循环递推
    }
    return dp[n]
}
fiber(5)

//2、 爬楼梯  1 1 2 3 5 8 13 21 ...
// 1、dp[i]的定义：上到第 i 阶台阶的 有 dp[i] 种方法
// 2、递推公式 ： dp[i] = dp[i-1] + dp[i-2] 
// 3、初始化数组： dp[0] = 1,dp[1] = 1; 上第 0 阶台阶 有1种方法，上 1 阶台阶有 1 种方法。
// 4、确定顺序：因为要从楼下开始爬，所以需要从前到后遍历
// 5、举例推到递推公式： 1 1 2 3 5 8 13
function mountStairs (n){
    let dp = [1,1];
    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
}
mountStairs(6)
// 3、使用最小花费爬楼梯
// 1、dp[i] : 表示上到 第 i 阶台阶需要花费最少的体力 dp[i]；
// 2、递推公式：dp[i] = Math.min(dp[i-1],dp[i-2]) + cost[i]; 第i项表示到 前面的最小值 + 上当前值位上到  i 阶台阶花费的最小体力
// 3 初始化dp数组：dp[0] = cost[0],dp[1] = cost[1],由题目可知，可以从 0 或者 1 开始消耗体力
// 4、遍历顺序：上到第 i 阶台阶 一共花的体力最小，所以从头到尾
// 5、推到递推公式： 
let cost = [10,15,30]
function minMountStair (cost) {
    let dp = [];
    let len = cost.length;
    dp[0] = cost[0];
    dp[1] = cost[1];
    for(let i = 2; i < len; i++) {
        dp[i] = Math.min(dp[i-1],dp[i-1]) + cost[i]
    }
    //  上到了最顶层后不在需要花费体力，所以 cost[len] = 0
    return Math.min(dp[len-1],dp[len-2]) + 0;
}
minMountStair(cost)

// 4、不同路径
// 1、dp[i][j] : 从(0,0)走到 (i,j) 这个位置 得到的路径数。
// 2、递推公式：dp[i][j] = dp[i][j-1] + dp[i-1][j]
// 3、初始化：将整个二维数组变为 [[1,1],[1,1]] 类似于
// 4、遍历顺序：顺序遍历，因为dp[i][j] 依赖前面获得的值
// 5、推到递推公式：(0,0) => (1,1) 有 2 种方法， 当 dp[1][1] = dp[0][1] + dp[1][0]
let n = 7,m = 4;
function uniquePaths(m,n) {
    let dp = Array(m).fill().map(itme => Array(n).fill(1))
    for(let i = 0; i < m; i++) {
        dp[i][0] = 1
    }
    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
        }
    }
    return dp[m-1][n-1]
}   
uniquePaths(m,n)
// 不同路径 ||
// 1、dp[i][j] : 从(0,0) 到 (i,j) 一共有几条可走通的路径
// 2、递推公式：dp[i][j] = dp[i][j-1] + dp[i-1][j]
// 3、初始化：将不为障碍的都初始化为  1 
// 4、遍历顺序：dp[i][j] 的值依赖前面的 dp[i-1][j] 和 dp[i][j-1];
// 5、推到递推公式：(0,0) => (1,1) 可得。
let startArray = [[0,0,0],[0,1,0],[0,0,0]]
function uniquePathsTow (startArray){
    let m = startArray.length,n = startArray[0].length;
    let dp = Array(m).fill().map(itme => Array(n).fill(0));
    // 初始化数组
    for(let i = 0; i < m && startArray[i][0] == 0; i++) {
        dp[i][0] = 1
    }
    for(let j = 0; j < n && startArray[0][j] == 0; j++) {
        dp[0][j] = 1
    }
    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            if(startArray[i][j] == 0) {
                dp[i][j] = dp[i][j-1] + dp[i-1][j];
            }
        }
    }
    return dp[m-1][n-1]
}
uniquePathsTow(startArray)