import { Game } from '../modules/Game'

describe('Game States', () => {

    describe('switch morning', () => {    
        describe('Morning to evening', () => {    
            let game = new Game()
            let initialfoodStockSize = game.player.foodStock.stockSize
            game.switchMorning()
            
            test('nourrish the player', () => {
                expect(game.player.foodStock.stockSize).toEqual(initialfoodStockSize - 1);
            })
            test('switch morning token/boolean', () => {
                expect(game.morning).toEqual(false);
            })
        })

        describe('Evening to morning', () => {    
            let game = new Game()
            game.morning = false
            let initialfoodStockSize = game.player.foodStock.stockSize
            game.switchMorning()
            
            test('nourrish the player', () => {
                expect(game.player.foodStock.stockSize).toEqual(initialfoodStockSize - 1);
            })
            test('switch morning token/boolean', () => {
                expect(game.morning).toEqual(true);
            })
        })
    })
})