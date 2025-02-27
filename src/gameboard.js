import { Ship } from "./battleship.js"

export class Gameboard{
    constructor (){
        this.board = new Map()
        this.missedAttacks = new Set ()
    }

    placeShip(coord, length){
        const battleShip = new Ship(length)
        for(let [x,y] of coord){
            let key = `${x},${y}`
            this.board.set(key, battleShip)
        }
    }

    receiveAttack(x,y){
        let key = `${x},${y}`
        if(this.board.has(key)){
            this.board.get(key).hit()
            return true
        }else{
            this.missedAttacks.add(key)
            return false
        }
    }

    allShipsSunk(){
        return [...this.board.values()].every(ship => ship.isSunk())
    }
}
