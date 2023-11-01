import React from 'react'

export const Footer = ({onClickNew, onClickSuggest}) => {
  return (
    <div className='panel footer'>
        <button onClick={onClickNew}>New Game</button>
        <button onClick={onClickSuggest}>Suggest</button>
    </div>
  )
}
export default Footer;
/*
import React from 'react'
import { GAME_STATE_PLAYING } from "../constants";

export const Footer = ({onClickNew, onClickSuggest,gameState}) => {
  return (
    <div className='panel footer'>
    {
      gameState===GAME_STATE_PLAYING && 
      <button onClick={onClickSuggest}>Suggest</button>
    }
    {
      gameState!==GAME_STATE_PLAYING &&
      <button onClick={onClickNew}>New Game</button>
    }
    </div>
  )
}
export default Footer;*/