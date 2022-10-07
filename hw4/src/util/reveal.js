/****************************************************************************
 FileName      [ reveal.js ]
 PackageName   [ src/util ]
 Author        [ Cheng-Hua Lu ]
 Synopsis      [ This file states the reaction when left clicking a cell. ]
 Copyright     [ 2022 10 ]
 ****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount, boardSize) =>
{
    function rec(x, y)
    {
        board[x][y].revealed = true;
        newNonMinesCount--;
        if (!board[x][y].value)
        {
            const dx = [0, 1, 0, -1];
            const dy = [1, 0, -1, 0];
            for (let i = 0; i < 4; i++)
            {
                const newX = x + dx[i];
                const newY = y + dy[i];
                if (0 <= newX && newX < boardSize && 0 <= newY && newY < boardSize && !board[newX][newY].flagged && !board[newX][newY].revealed)
                    rec(newX, newY)
            }
        }
    }

    rec(x, y)
    return {board, newNonMinesCount};
};
