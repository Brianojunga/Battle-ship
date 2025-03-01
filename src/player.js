import { Gameboard } from "./gameboard";

export class Player{
    constructor(type){
        this.type = type
        this.gameboard = new Gameboard()
    }

    attack(opponent,x,y){
        return opponent.gameboard.receiveAttack(x,y)
    }

    computerAttack(opponent){
        let x = ~~(Math.random() * 10)
        let y = ~~(Math.random() * 10)
        return opponent.gameboard.receiveAttack(x,y)
    }
}