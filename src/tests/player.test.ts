import { Player } from '../modules/Player'

let autoPlayer = new Player()
describe('player atributes', () => {
  describe('food stock', () => {
    test('food stock initial', () => {
      expect(autoPlayer.foodStock.stockSize).toEqual(3);
    })
    test('eat', () => {      
      autoPlayer.eat();
      expect(autoPlayer.foodStock.stockSize).toEqual(2);
    })
    test('get food', () => {      
      autoPlayer.getFood();
      expect(autoPlayer.foodStock.stockSize).toEqual(3);
    })
  })
  
  describe('bullet stock', () => {
    test('initial stock', () => {
      expect(autoPlayer.bulletStock.stockSize).toEqual(3);
    })
    test('shot', () => {
      autoPlayer.shot();
      expect(autoPlayer.bulletStock.stockSize).toEqual(2);
    })
    test('get a bullet', () => {      
      autoPlayer.getBullet();
      expect(autoPlayer.bulletStock.stockSize).toEqual(3);
    })
  })
});