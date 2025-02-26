import { Ship } from "./battleship.js"

test('Ship length and hits', ()=>{
    const battleShip = new Ship(4)
    battleShip.hit()
    expect(battleShip.hits).toBe(1)
    expect(battleShip.length).toBe(4)
})

test('Ship is not sunk', ()=>{
    const battleShip = new Ship(4)
    battleShip.hit()
    expect(battleShip.isSunk()).toBeFalsy()
})

test('ship is sunk', () =>{
    const battleShip = new Ship(3)
    battleShip.hit()
    battleShip.hit()
    battleShip.hit()
    expect(battleShip.isSunk()).toBeTruthy()
})

