export function getWinner(roles, grids){

    let winner = checkWinner(grids.map(item=>item.getGridContent()));
    return roles.find(role=>role.getName() === winner);
}

function checkWinner(board) {
    // 定义所有可能的胜利组合
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横向胜利组合
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 纵向胜利组合
        [0, 4, 8], [2, 4, 6] // 对角线胜利组合
    ];

    // 遍历所有胜利组合
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        // 检查是否存在相同的符号，并且不是空格
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // 返回获胜符号
        }
    }

    return null; // 没有找到获胜者，返回null
}