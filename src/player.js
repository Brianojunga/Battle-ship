import { Gameboard } from "./gameboard";

export class Player{
    constructor(type = 'player'){
        this.type = type
        this.gameboard = new Gameboard()
    }

    attack(opponent,x,y){
        return opponent.gameboard.receiveAttack(x,y)
    }

    computerAttack(opponent) {
        let x, y, key;
    
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            key = `${x},${y}`;
        } while (opponent.gameboard.missedAttacks.has(key) || opponent.gameboard.successfulAttacks.has(key));
    
        return opponent.gameboard.receiveAttack(x, y);
    }
}