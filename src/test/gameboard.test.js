import Gameboard from '../script/class/gameboard';
import Ship from '../script/class/ship';
import Player from '../script/class/player';

test('shipPlacement', () => {
  const ship1 = new Ship((3)[([3, 4], [1, 2])]);
  const gameboard1 = new Gameboard();
  gameboard1.placeShip(ship1);
  expect(gameboard1.ships).toContain(ship1);

});



test('shipsSunk', () => {
  const gameboard2 = new Gameboard();
  const ship2 = new Ship(2, [[2, 3][(3, 4)]]);
  const ship3 = new Ship(1, [[1, 2]]);
  gameboard2.placeShip(ship2);
  gameboard2.placeShip(ship3);
  ship2.hit();
  expect(gameboard2.shipsSunk()).toBe(false);

  ship3.hit();
  expect(gameboard2.shipsSunk()).toBe(false);
  ship2.hit();
  expect(gameboard2.shipsSunk()).toBe(true);
});

test('missedAttacks', () => {
  const gameboard3 = new Gameboard();
  gameboard3.missedAttacks.push([3, 4]);
  gameboard3.missedAttacks.push([1, 3]);
  expect(gameboard3.missedAttacks).toContainEqual([3, 4]);
  expect(gameboard3.missedAttacks).toContainEqual([1, 3]);
});

test('playerHit', () => {
  const player1 = new Player('neko');
  const player2 = new Player('chaos');
  player1.setOpponent(player2);
  player2.setOpponent(player1);
  player2.gameboard.placeShip(
    new Ship(2, [
      [3, 4],
      [2, 4],
    ]),
  );
  expect((player1.hitBoard([3, 4])).isSunk()).toBe(false);
  expect(player1.hitBoard([2, 4]).isSunk()).toBe(true);
  expect(player2.gameboard.shipsSunk()).toBe(true);
});

test('missedHit', () => {
  const player1 = new Player('arc');
  const player2 = new Player('roose');
  const ship1 = new Ship(2,[[3,5],[4,7]])
  player2.gameboard.placeShip(ship1)
  player1.setOpponent(player2);
  player2.setOpponent(player1);
  player1.hitBoard([3, 5]);
  player1.hitBoard([5, 5]);
  player1.hitBoard([6,7])
  expect(player1.gameboard.missedAttacks).toEqual([[5,5], [6,7  ]]);
  expect(player1.checkHitValidity([3,5])).toBe(false)
  player1.hitBoard([4,5])
  expect(player1.checkHitValidity([4,5])).toBe(false)
});


test ('checkValidity', ()=>{
  const gameboard1 = new Gameboard()
  const ship1 = new Ship(3,[[1,1],[2,0],[4,9]])
  gameboard1.placeShip(ship1)
  gameboard1.placeShip(new Ship(1,[[2,3]]))

  expect(gameboard1.checkValidity([[2,3]])).toBe(false)
  expect(gameboard1.checkValidity([[4,9]])).toBe(false)
})


