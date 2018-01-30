import { Player } from '../modules/Player'
import { Game } from '../modules/Game'
import { Difficulty } from '../modules/TheLostExpedition'

describe('Difficulty', () => {

    // Facile : utilisez sept cartes d'expédition. Placez quatre jetons de santé sur chaque explorateur.
    // Normal : utilisez neuf cartes d'expédition. Placez quatre jetons de santé sur chaque explorateur.
    // Difficile : utilisez neuf cartes d'expédition. Placez trois jetons de santé sur chaque explorateur et prenez un jeton de nourriture supplémentaire. 

    describe('Hard', () => {    
        let game = new Game(Difficulty.Hard)
        
        test('food', () => {
            expect(game.player.foodStock.stockSize).toEqual(4);
        })
        test('bullet', () => {
            expect(game.player.bulletStock.stockSize).toEqual(3);
        })
        test('pv', () => {
            expect(game.player.heroesCollection.heroes[0].pvStock.stockSize).toEqual(3);
        })
        test('road length', () => {
            expect(game.road.length).toEqual(9);
        })
    })

    describe('Normal', () => {    
        let game = new Game(Difficulty.Normal)
        
        test('food', () => {
            expect(game.player.foodStock.stockSize).toEqual(3);
        })
        test('bullet', () => {
            expect(game.player.bulletStock.stockSize).toEqual(3);
        })
        test('pv', () => {
            expect(game.player.heroesCollection.heroes[0].pvStock.stockSize).toEqual(4);
        })
        test('road length', () => {
            expect(game.road.length).toEqual(9);
        })
    })

    describe('Easy', () => {    

        let game = new Game(Difficulty.Easy)
        
        test('food', () => {
            expect(game.player.foodStock.stockSize).toEqual(3);
        })
        test('bullet', () => {
            expect(game.player.bulletStock.stockSize).toEqual(3);
        })
        test('pv', () => {
            expect(game.player.heroesCollection.heroes[0].pvStock.stockSize).toEqual(4);
        })
        test('road length', () => {
            expect(game.road.length).toEqual(7);
        })
    })
})