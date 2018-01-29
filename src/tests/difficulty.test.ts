import { Player } from '../modules/Player'
import { Game } from '../modules/Game'
import { Difficulty } from '../modules/TheLostExpedition'

describe('Difficulty', () => {
    describe('Difficulty: Hard', () => {    

        let game = new Game(Difficulty.Hard)
        let autoPlayer = game.player
        
        describe('player atributes', () => {
            describe('food stock', () => {
                test('food stock initial', () => {
                    expect(autoPlayer.foodStock.stockSize).toEqual(4);
                })
                test('eat', () => {      
                    autoPlayer.eat();
                    expect(autoPlayer.foodStock.stockSize).toEqual(3);
                })
                test('get food', () => {      
                    autoPlayer.getFood();
                    expect(autoPlayer.foodStock.stockSize).toEqual(4);
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
        })
    })
})