import { Gameboard } from "../gameboard.js";

test('Ship placed in correct coordinates', ()=>{
    const gameBoard = new Gameboard()
    gameBoard.placeShip([[2,1], [2,2]], 2)
    expect(gameBoard.board.has('2,1')).toBeTruthy()
    expect(gameBoard.board.has('2,2')).toBeTruthy()
})

test('Ship receive Attack', ()=>{
    const gameBoard = new Gameboard()
    gameBoard.placeShip([[2,1], [2,2]], 2)
    expect(gameBoard.receiveAttack(2, 1)).toBe(true)
    expect(gameBoard.receiveAttack(2, 2)).toBe(true)
})

test('Ship missed Attack', () =>{
    const gameBoard = new Gameboard()
    gameBoard.placeShip([[2,1], [2,2]], 2)
    expect(gameBoard.receiveAttack(2, 3)).toBe(false)
})

test('Ship is sunk', ()=>{
    const gameBoard = new Gameboard()
    gameBoard.placeShip([[2,1], [2,2]], 2)
    gameBoard.receiveAttack(2, 1)
    gameBoard.receiveAttack(2, 2)
    expect(gameBoard.allShipsSunk()).toBe(true)
})