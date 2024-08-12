import { Fragment, useEffect, useState } from 'react';
import './App.css';

const TURNS = [
  'X',
  'O'
]

const WINNERS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const App = () => {
  const [turn, setTurn] = useState(TURNS[0])
  const [positions, setPositions] = useState([
    null, null, null,
    null, null, null,
    null, null, null
  ])
  const [endgame, setEndgame] = useState(null)

  const seleccionar = (evento) => {
    const buttonId = evento.target.id
    const boton = document.getElementById(buttonId)
    boton.innerHTML = turn
    boton.setAttribute('disabled', true)
    const turnIndex = TURNS.findIndex((value) => (value === turn))
    if (turnIndex === 0) {
      setTurn(TURNS[1])
    } else {
      setTurn(TURNS[0])
    }
    const indice = parseInt(buttonId.replace('cuadrante', ''))
    positions[indice] = turn
    setPositions(positions)
  }

  useEffect(() =>{
    WINNERS.forEach(line => {
      const [pos1, pos2, pos3] = line
      if (positions[pos1] && positions[pos1] === positions[pos2] && positions[pos2] === positions[pos3]){
        finDelJuego(positions[pos1])
      }
    })
  }, [JSON.stringify(positions)])

  const finDelJuego = (who) => {
    [...Array(9).keys()].forEach((indice) => {
      const button = document.getElementById(`cuadrante${indice}`)
      button.setAttribute('disabled', true)
    })
    setEndgame(who)
  }

  const reiniciar = () => {
    [...Array(9).keys()].forEach((indice) => {
      const button = document.getElementById(`cuadrante${indice}`)
      button.removeAttribute('disabled')
      button.innerHTML  = ''
    })
    setPositions(Array(9).fill(null))
    setTurn(TURNS[0])
    setEndgame(null)
  }

  return(
    <Fragment>
      <h1 className='title' id='titulo'>tictactoe</h1>
      <section id='tablero'>
        <div className="row">
          <button onClick={(evento) => seleccionar(evento)} id='cuadrante0' className='cuadrante'></button>
          <button onClick={(evento) => seleccionar(evento)} id='cuadrante1' className='cuadrante'></button>
          <button onClick={(evento) => seleccionar(evento)} id='cuadrante2' className='cuadrante'></button>
        </div>
        <div className="row">
          <button onClick={(evento) => seleccionar(evento)} id='cuadrante3' className='cuadrante'></button>
          <button onClick={(evento) => seleccionar(evento)} id='cuadrante4' className='cuadrante'></button>
          <button onClick={(evento) => seleccionar(evento)} id='cuadrante5' className='cuadrante'></button>
        </div>
        <div className="row">
          <button onClick={(evento) => seleccionar(evento)} id='cuadrante6' className='cuadrante'></button>
          <button onClick={(evento) => seleccionar(evento)} id='cuadrante7' className='cuadrante'></button>
          <button onClick={(evento) => seleccionar(evento)} id='cuadrante8' className='cuadrante'></button>
        </div>
      </section>
      {
        endgame &&
        (
          <div className='endsection' id="findeljuego">
            <h2 className='winner'>
              Ganaron { (endgame === 'X') ? 'las X' : 'los círculos' }
            </h2>
            <h3 className='endgame'>Reinicia para volver a jugar</h3>
            <button className='restart' onClick={() => reiniciar()}>Reiniciar</button>
          </div>
        )
      }
    </Fragment>
  )
}

export default App;