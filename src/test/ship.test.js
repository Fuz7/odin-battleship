import Ship from '../script/ship';

test('hit',()=>{
  const ship1 = new Ship(3,[[2,3]])
  ship1.hit()
  expect(ship1.life).toBe(2)
  ship1.hit()
  ship1.hit()
  expect(ship1.life).toBe(0)
})

test('isSunk',()=>{
  const ship2 = new Ship(1,[[4,3]]  )
  expect(ship2.isSunk()).toBe(false)
  ship2.hit()
  expect(ship2.isSunk()).toBe(true)
})