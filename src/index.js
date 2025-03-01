import "./styles.css";
import { Player } from "./player";

const playerBoard = document.querySelector('.player-board');
const computerBoard = document.querySelector('.computer-board');

const boardSize = 10;
let player1 = new Player ('Ojay');
let computerPlayer = new Player ('computer');
let currentPlayer = 'player'

function setUpShips(player){
    let shipCoords = ["1,1", "4,2", "7,8", "5,5", "3,4"];
    for(let i = 0; i < shipCoords.length; i++){
        let [x, y] = shipCoords[i].split(',').map(Number);
        player.gameboard.placeShip(x,y, (i+1))
    }
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
}
function attack(x, y, cellClick){
    if(currentPlayer === 'player'){
       const computerAttacked = player1.attack(computerPlayer, x, y)
       if(computerAttacked){
            cellClick.classList.add('hit')
       }else{
            cellClick.classList.add('miss')
       }
    }

    currentPlayer = 'computer'

    setTimeout(computerAttack, 1000)
}

function computerAttack(){
    if(currentPlayer !== 'computer') return

        const playerAttacked = computerPlayer.computerAttack(player1);
        if(playerAttacked){
            const successAttacks = [...player1.gameboard.successfulAttacks]
            successAttacks.forEach((key)=>{
            const cell = document.querySelector(`.player-board .cell[data-id="${key}"]`)
            cell.replaceChildren()
            cell.classList.remove('ship')
            cell.classList.add('hit')
           }) 
        }else{
            const missAttacks = [...player1.gameboard.missedAttacks]
            missAttacks.forEach(key =>{
            const cell = document.querySelector(`.player-board .cell[data-id="${key}"]`)
            cell.replaceChildren()
            cell.classList.add('miss') 
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


