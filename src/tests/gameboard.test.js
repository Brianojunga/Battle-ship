import { Gameboard } from "../gameboard.js";
import { Ship } from "../battleship.js";

test("Ship placed in correct vertical coordinates", () => {
  const gameBoard = new Gameboard();
  const submarine = new Ship(2);
  gameBoard.placeShip(2, 1, submarine, "vertical");
  expect(gameBoard.board.has("2,1")).toBeTruthy();
  expect(gameBoard.board.has("2,2")).toBeTruthy();
});

test("Ship placed in correct horizontal coordinates", () => {
  const gameBoard = new Gameboard();
  const submarine = new Ship(2);
  gameBoard.placeShip(2, 1, submarine);
  expect(gameBoard.board.has("2,1")).toBeTruthy();
  expect(gameBoard.board.has("3,1")).toBeTruthy();
});

test("Ship receive Attack", () => {
  const gameBoard = new Gameboard();
  const submarine = new Ship(2);
  gameBoard.placeShip(2, 1, submarine);
  expect(gameBoard.receiveAttack(2, 1)).toBe(true);
  expect(gameBoard.receiveAttack(3, 1)).toBe(true);
});

test("Ship missed Attack", () => {
  const gameBoard = new Gameboard();
  const submarine = new Ship(2);
  gameBoard.placeShip(2, 1, submarine);
  expect(gameBoard.receiveAttack(2, 3)).toBe(false);
});

test("Ship is sunk", () => {
  const gameBoard = new Gameboard();
  const submarine = new Ship(2);
  gameBoard.placeShip(2, 1, submarine);
  gameBoard.receiveAttack(2, 1);
  gameBoard.receiveAttack(3, 1);
  expect(gameBoard.allShipsSunk()).toBe(true);
});
