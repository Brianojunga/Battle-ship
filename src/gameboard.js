import { Ship } from "./battleship"
export class Gameboard{
    constructor (){
        this.board = new Map()
        this.missedAttacks = new Set ()
        this.successfulAttacks = new Set()
    }

    placeShip(x,y, length, orientation = 'horizontal'){
        const ship = new Ship(length)
        for(let i = 0 ; i < ship.length; i++){
            let newX = orientation === 'horizontal' ? x + i : x
            let newY = orientation === 'horizontal' ? y : y + i
            this.board.set(`${newX},${newY}`, ship)
        }
    }

    receiveAttack(x,y){
        let key = `${x},${y}`
        if(this.board.has(key)){
            this.board.get(key).hit()
            const shipSunk = this.board.get(key).isSunk()
            this.successfulAttacks.add(key)
            return [true, shipSunk]
        }else{
            this.missedAttacks.add(key)
            return [false, false]
        }
    }

    allShipsSunk(){
        return [...this.board.values()].every(ship => ship.isSunk())
    }
}
