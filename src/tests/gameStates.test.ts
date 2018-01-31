import { Game } from '../modules/Game'

describe('Game States', () => {
    describe('Road', () => {    
        let game = new Game()
        let initialPosition = game.road.position

        test('progress', () => {
            game.progress();
            expect(game.road.position).toEqual(initialPosition + 1);
        })
        test('dont progress', () => {
            game.road.position = game.road.length - 1;
            expect(game.road.progress()).toEqual(false);
        })
        test('is complete', () => {
            game.road.position = game.road.length - 1;
            expect(game.road.isComplete()).toEqual(true);
        })
        test('not complete', () => {
            game.road.position = 2;
            expect(game.road.isComplete()).toEqual(false);
        })
    })

    describe('Switch morning', () => {    
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