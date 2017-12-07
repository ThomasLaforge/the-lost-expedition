import {observable} from 'mobx'

import {Road} from './Road';
import {Player} from './Player';
import {Deck} from './Deck';
import {Stack} from './Stack';
import {HeroesCollection} from './HeroesCollection';
import { Hero } from './Hero';

export class Game {

    @observable private _morning: boolean;
    @observable private _player: Player;
    @observable private _road: Road;
    @observable private _deck: Deck;
    @observable private _playedCards: Stack;
    @observable private _heroesCollection: HeroesCollection;
    @observable private _heroes: Hero[];
    
    constructor(morning = true, player = new Player(), road = new Road(), deck = new Deck(), playedCards = new Stack(), heroesCollection = new HeroesCollection(), nbHeroes = 3 ){
        this.morning = morning
        this.player = player
        this.road = road
        this.deck = deck
        this.playedCards = playedCards
        this.heroesCollection = heroesCollection
        this.heroes = this.heroesCollection.getSomeHeroes(nbHeroes)
    }

    startTurn(){
        this.drawCardsToPlayerHand(6)
        this.drawCardsToPlayedCards(2)
        if(this.morning){
            this.orderPlayedCards()
        }
    }

    endTurn(){
        this.playedCards = new Stack()
        this.switchMorning()
    }

    won(){
        return this.road.isComplete() && !this.gameOver()
    }

    gameOver(){
        console.log('Game over !')
        return false;
    }

    orderPlayedCards(){
        console.log('implement order')
    }

    drawCardsToPlayedCards(nb = 1){
        let cards = this.deck.pick(nb)
        cards.forEach(c => {
            this.playedCards.addAndOrder(c, this.morning)
        })
    }
    
    drawCardsToPlayerHand(nb = 6){
        let cards = this.deck.pick(nb)
        cards.forEach(c => {
            this.player.hand.add(c)
        })
        this.player.hand.order()
    }

    switchMorning(){
        if( this.player.nourrish() ){
            this.morning = !this.morning
        }
        else {
            this.gameOver()
        }
    }

    progress(){
        this.road.progress()
    }

    // Getters / Setters
    public get morning(): boolean {
        return this._morning;
    }
    public set morning(value: boolean) {
        this._morning = value;
    }
	public get player(): Player {
		return this._player;
	}
	public set player(value: Player) {
		this._player = value;
	}
	public get road(): Road {
		return this._road;
	}
	public set road(value: Road) {
		this._road = value;
	}
	public get deck(): Deck {
		return this._deck;
	}
	public set deck(value: Deck) {
		this._deck = value;
    }
	public get playedCards(): Stack {
		return this._playedCards;
	}
	public set playedCards(value: Stack) {
		this._playedCards = value;
    }
	public get heroes(): Hero[] {
		return this._heroes;
	}
	public set heroes(value: Hero[]) {
		this._heroes = value;
    }
	public get heroesCollection(): HeroesCollection {
		return this._heroesCollection;
	}
	public set heroesCollection(value: HeroesCollection) {
		this._heroesCollection = value;
	}
    
    
    
    
}