import React, {useEffect, useState} from "react";
import '../Game.css';
import Header from "./Header";
import GameCircle from "./GameCircle";
import Footer from "./Footer";
import { isDraw,isWinner,getComputerMove } from "../helper";
import { GAME_STATE_DRAW, GAME_STATE_PLAYING,
    GAME_STATE_WIN,
    No_PLAYER,
    PLAYER_1,
    PLAYER_2, 
    num_circle } from "../constants";

const GameBoard =()=>{
    const [gameBoard,setGameBoard]=useState(Array(num_circle).fill(No_PLAYER));
    const[currentPlayer, setCurrentPlayer]=useState(PLAYER_1);
    const [gameState, setGameState]=useState(GAME_STATE_PLAYING);
    const [winPlayer,setWinPlayer]=useState(No_PLAYER);
    //console.log(gameBoard);

    useEffect(()=>{
        initGame();
    },[]);
    const initGame=()=>{
        console.log('init game');
        setGameBoard(Array(num_circle).fill(No_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
    }
    const initboard=()=>{
        const circle=[];
        for(let i=0;i<num_circle;i++)
        {
            circle.push(renderCircle(i));
        }
        return  circle;
    }

    const suggestmove=()=>{
        circleClicked(getComputerMove(gameBoard));
    }

    const circleClicked=(id)=>{
        if(gameBoard[id]!==No_PLAYER) return;
        if(gameState!==GAME_STATE_PLAYING) return;

        if(isWinner(gameBoard,id,currentPlayer))
        {
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
        }

        if(isDraw(gameBoard,id,currentPlayer))
        {
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(No_PLAYER);
        }

        
        setGameBoard(prev=>{
            return prev.map((circle,pos)=>{
                if(pos===id) return currentPlayer;
                return circle;
            })

        })
        setCurrentPlayer(currentPlayer===PLAYER_1? PLAYER_2:PLAYER_1);
        console.log(currentPlayer);
    }

    const renderCircle=id=>{
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}/>

    }
    return(
        <>
        <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}/>
        <div className='gameBoard'>{initboard()}</div>
        <Footer onClickNew={initGame} onClickSuggest={suggestmove} gameState={gameState}/>
        </>
    );
};

export default GameBoard;