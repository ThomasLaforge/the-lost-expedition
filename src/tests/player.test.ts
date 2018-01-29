import { Player } from '../modules/Player'
import { Difficulty } from '../modules/TheLostExpedition'

let player = new Player()

describe('Player', () => {
  describe('food stock', () => {      
    test('win food', () => {
      player.foodStock.stockSize = 2    
      player.getFood()
      expect(player.foodStock.stockSize).toEqual(3);
    })
    test('eat food', () => {
      player.foodStock.stockSize = 2    
      player.eat()
      expect(player.foodStock.stockSize).toEqual(1);
    })
  })
})