import Gameboard from '../script/gameboard'
import Ship from '../script/ship'
import Player from '../script/player'

test('shipPlacement',()=>{
  const ship1 = new Ship(3[[3,4],[1,2]])
  const gameboard1 = new Gameboard()
  gameboard1.placeShip(ship1)
  expect(gameboard1.ships).toContain(ship1)
})

test('shipsSunk',()=>{
  const gameboard2 = new Gameboard()
  const ship2 = new Ship(2,[[2,3][3,4]])
  const ship3 = new Ship(1,[[1,2]])
  gameboard2.placeShip(ship2)
  gameboard2.placeShip(ship3)
  ship2.hit()
  expect(gameboard2.shipsSunk()).toBe(false)

  ship3.hit()
  expect(gameboard2.shipsSunk()).toBe(false)
  ship2.hit()
  expect(gameboard2.shipsSunk()).toBe(true)
})


test('missedAttacks',()=>{
  const gameboard3 = new Gameboard()
  gameboard3.missedAttacks.push([3,4])
  gameboard3.missedAttacks.push([1,3])
  expect(gameboard3.missedAttacks).toContainEqual([3,4])
  expect(gameboard3.missedAttacks).toContainEqual([1,3])
})

test('playerHit',()=>{
  const player1 = new Player('neko')
  const player2 = new Player('chaos')
  player1.setOpponent(player2)
  player2.setOpponent(player1)
  player2.gameboard.placeShip(new Ship(2,[[3,4],[2,4]]))
  player1.hitBoard([3,4])
  player1.hitBoard([2,4])
  expect(player2.gameboard.shipsSunk()).toBe(true)
})

test('missedHit',()=>{
  const player1 = new Player('arc')
  const player2 = new Player('roose')
  player1.setOpponent(player2)
  player2.setOpponent(player1)
  player1.hitBoard([3,5])
  player1.hitBoard([5,5])
  expect(player1.gameboard.missedAttacks).toContainEqual([3,5],[5,5])
})