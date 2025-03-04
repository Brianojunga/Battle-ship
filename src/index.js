import "./styles.css";
import { Player } from "./player";

const playerBoard = document.querySelector('.player-board');
const computerBoard = document.querySelector('.computer-board');
const updateHitMiss = document.querySelector('.update-hit-miss')
const gameWin = document.querySelector('.game-win');
const randomPlayerShip = document.querySelector('.random')
const start = document.querySelector('.start')
const bodyEl= document.querySelector('body')
const form = document.querySelector('form')
const restart = document.querySelector('.restart')

let playerName;
let gameOver = false;
const boardSize = 10;
let player1 = new Player ();
let computerPlayer = new Player ('computer');
let currentPlayer = 'player'

gameWin.textContent = `${player1.type}'s turn`
function setUpShips(player) {

        for (let shipLength = 1; shipLength < 6; shipLength++) {
            let shipNotPlaced = true;

            while (shipNotPlaced) {  
                let isHorizontal = Math.random() < 0.5;
                let orientation = isHorizontal ? 'horizontal' : 'vertical';
                let x = isHorizontal ? ~~(Math.random() * (10 - shipLength)) : ~~(Math.random() * 10);
                let y = isHorizontal ? ~~(Math.random() * 10) : ~~(Math.random() * (10 - shipLength));

                let isValid = true;

                for (let i = 0; i < shipLength; i++) {
                    let newX = isHorizontal ? x + i : x;
                    let newY = isHorizontal ? y : y + i;

                    if (player.gameboard.board.has(`${newX},${newY}`)) {
                        isValid = false;
                        break
                    }
                }

                if (isValid) {
                    player.gameboard.placeShip(x, y, shipLength, orientation);
                    shipNotPlaced = false; 
                }
            }
        }
        return
    }



function createPlayerBoards(player, playerDiv){
    for(let row = 0; row < boardSize; row++){
        for(let col = 0; col < boardSize; col++){
            let key = `${row},${col}`
            const playerCell = document.createElement('div');
            playerCell.dataset.id = key
            playerCell.classList.add('cell');
            if(player.gameboard.board.has(key) && player.type !== "computer") playerCell.classList.add('ship');
            playerDiv.appendChild(playerCell)
        }
    }
    const para = document.createElement('para')
    para.classList.add('player-board-details');
    para.textContent = `${player.type} game board`
    playerDiv.append(para)
}

function getShipName(length){
    switch(length){
        case 5 : 
         return 'Carrier'
        case 4 : 
         return 'Battleship'
        case 3 : 
         return 'Cruiser'
        case 2 : 
         return 'Destroyer'
        case 1 : 
         return 'Patrol ship'  
    }
}

function checkWin(shipSunk, key, player, opponent){
    const shipSunkLength = (opponent.gameboard.board.get(key).length)
    const shipName = getShipName(shipSunkLength)

    updateHitMiss.textContent = shipSunk ?  `${opponent.type}'s ${shipName} was sunk by ${player.type}` : `${opponent.type}'s ${shipName} was hit by ${player.type}`

    if(shipSunk && (opponent.gameboard.allShipsSunk()) ){
            gameWin.textContent = `${player.type} wins the game`
            gameOver = true
            restart.style.display = 'flex'
}}


function attack(x, y, cellClick){
    if(gameOver) return
 
    if(currentPlayer === 'player'){
        gameWin.textContent = `Its ${computerPlayer.type}'s turn`
       const [computerAttacked, shipSunk] = player1.attack(computerPlayer, x, y)
     
       if(computerAttacked){
            let key = `${x},${y}`
            cellClick.classList.add('hit')
            checkWin(shipSunk, key, player1, computerPlayer)
       }else{
            cellClick.classList.add('miss');
            updateHitMiss.textContent = `${player1.type} Missed ${computerPlayer.type} ships`
       }
    }

    currentPlayer = 'computer'
    

    setTimeout(computerAttack, 1000)
}

function computerAttack(){
    if(gameOver) return

    if(currentPlayer !== 'computer') return
        gameWin.textContent = `Its ${player1.type}'s turn`
        const [playerAttacked, shipSunk] = computerPlayer.computerAttack(player1);
        if(playerAttacked){
            const successAttacks = [...player1.gameboard.successfulAttacks]
            successAttacks.forEach((key)=>{
            const cell = document.querySelector(`.player-board .cell[data-id="${key}"]`)
            cell.replaceChildren()
            cell.classList.remove('ship')
            cell.classList.add('hit') 
            checkWin(shipSunk, key, computerPlayer, player1) 
        }
        ) 
        }else{
            const missAttacks = [...player1.gameboard.missedAttacks]
            missAttacks.forEach(key =>{
            const cell = document.querySelector(`.player-board .cell[data-id="${key}"]`)
            cell.replaceChildren()
            cell.classList.add('miss') 
            updateHitMiss.textContent = `${computerPlayer.type} Missed ${player1.type} ships`
            })
        }

    currentPlayer = 'player'
}

setUpShips(player1);
setUpShips(computerPlayer);
createPlayerBoards(player1, playerBoard)
createPlayerBoards(computerPlayer, computerBoard)

computerBoard.addEventListener('click', e =>{
    const cellClick = e.target.closest('[data-id]')
    const coordinate = cellClick.dataset.id
    const [x, y] = coordinate.split(',').map(Number)
    attack(x, y,cellClick)
    
})

randomPlayerShip.addEventListener('click', () =>{
    player1.gameboard.board.clear()
    playerBoard.replaceChildren()
    setUpShips(player1)
    createPlayerBoards(player1, playerBoard)
})

start.addEventListener('click', () =>{
    bodyEl.classList.toggle('playGame')
    
})

form.addEventListener('submit', e => {
    e.preventDefault()
     playerName = `${document.querySelector('input').value}`

     player1.gameboard.board.clear()
     playerBoard.replaceChildren()

     player1 = new Player (playerName ? playerName : 'player');
     setUpShips(player1);
     createPlayerBoards(player1, playerBoard)
     
})

restart.addEventListener('click', () =>{
    location.reload()
})

