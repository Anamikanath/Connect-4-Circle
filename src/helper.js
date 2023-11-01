export const isWinner =(gameBoard,currentMove,currentPlayer)=>{
let board =[...gameBoard];
board[currentMove]=currentPlayer;
const winlines=[
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
    [0,5,10,15],
    [3,6,9,12]
];
for(let i=0;i<winlines.length;i++)
{
    const [c1,c2,c3,c4]=winlines[i];
    if(board[c1]>0 &&
        board[c1]===board[c2] &&
        board[c2]===board[c3] &&
        board[c3]===board[c4])
        {
            return true;
        }
}
        return false;
}
export const isDraw=(gameBoard,currentMove,currentPlayer)=>{
    let board =[...gameBoard];
    board[currentMove]=currentPlayer;

    let count=board.reduce((n,x)=>n+(x===0),0);
    console.log(`count ${count}`);
    return count===0;

}
const getRandomComputerMove =(gameBoard)=>{
    let validmoves=[];
    for(let i=0;i<gameBoard.length;i++)
    {
        if(gameBoard[i]===0)
        {
            validmoves.push(i);
        }
    }
    let rndmove=Math.floor(Math.random()*validmoves.length);
    return validmoves[rndmove];
}
const getPosition=(gameBoard,movechecks)=>
{
    for(let check=0;check<movechecks.length;check++)
    {
        for(
            let i=0;
            i<movechecks[check].max;
            i+=movechecks[check].step
        )
        {
            let series =
            gameBoard[i+movechecks[check].index[0]].toString()+
            gameBoard[i+movechecks[check].index[1]].toString()+
            gameBoard[i+movechecks[check].index[2]].toString()+
            gameBoard[i+movechecks[check].index[3]].toString();

            switch (series){
                case "1110":
                case "2220":
                    return i+movechecks[check].index[3];
                case "1101":
                case "2202":
                    return i+movechecks[check].index[2];  
                case "1011":
                case "2022":
                    return i+movechecks[check].index[1]; 
                case "0111":
                case "0222":
                    return i+movechecks[check].index[0]; 
                default:                                         

            }
        }
    
    }
    return -1;
};
export const getComputerMove=(gameBoard)=>{
    let movechecks=[
            //vertical
           {
            index:[0,4,8,12],
            max:4,
            step:1
        },
    
            //horizontal
            {
                index:[0,1,2,3],
                max:16,
                step:4
            },
            //diagonal
            {
                index:[0,5,10,15],
                max:16,
                step:16
            },
            {
                index:[3,6,9,12],
                max:16,
                step:16
            }
    ];

let postion=getPosition(gameBoard,movechecks);
if(postion>-1) return postion;

return getRandomComputerMove(gameBoard);
}