import {observable} from 'mobx'

import {Road} from './Road';
import {Card} from './Card';
import {Player} from './Player';
import {Deck} from './Deck';
import {Stack} from './Stack';
import {KeptCards} from './KeptCards';
import {HeroesCollection} from './HeroesCollection';
import {Side, ResourceEnum, ResolvedActionOptions} from './TheLostExpedition'
import { ActionSelection } from './ActionSelection';
import { ResolvedAction } from './ResolvedAction';
import { MonoAction } from './MonoAction';
import { Action } from './Action';

export class Game {

    @observable private _morning: boolean;
    @observable private _player: Player;
    @observable private _road: Road;
    @observable private _deck: Deck;
    @observable private _playedCards: Stack;
    @observable private _keptCards: KeptCards;
    @observable private _heroesCollection: HeroesCollection;
    @observable private _cardToPlace: Card;
    @observable private _historyMonoAction: MonoAction[];
    
    constructor(player?: Player, morning = true, road = new Road(), deck = new Deck(), playedCards = new Stack([], 6), heroesCollection = new HeroesCollection(), nbHeroes = 3, keptCards = new KeptCards(), cardToPlace: Card = null, autoStart = true ){
        this.heroesCollection = heroesCollection
        let playerHeroesCollection = new HeroesCollection(this.heroesCollection.getHeroesWithDistinctsResources())
        this.player = player || new Player(playerHeroesCollection)
        this.morning = morning
        this.road = road
        this.deck = deck
        this.cardToPlace = cardToPlace
        this.playedCards = playedCards
        this.keptCards = keptCards
        autoStart && this.startTurn()
    }

    startTurn(){
        this.drawCardsForPlayerHand(6)
        this.drawCardsForPlayedCards(2)
        if(this.morning){
            this.orderPlayedCards()
        }
    }

    isWon(){
        return this.road.isComplete() && !this.isGameOver()
    }
    
    isGameOver(){
        return this.player.heroesCollection.heroes.filter(h => h.isDead()).length > 0 || this.player.foodStock.stockSize < 0;
    }
    
    switchMorning(){
        if( this.player.nourrish() ){
            this.morning = !this.morning
        }
        if( this.morning ){
            this.startTurn()
        }
    }
    orderPlayedCards(){
        this.playedCards.order()
    }

    drawCardForCarToPlace(){
        this.cardToPlace = this.deck.pick(1)[0]
    }

    playerPlayCardForCardToPlace(card: Card){
        this.player.hand.remove(card)
        this.cardToPlace = card
    }

    drawCardsForPlayedCards(nb = 1, order = true){
        let cards = this.deck.pick(nb)
        cards.forEach(c => {
            this.playedCards.addAndOrder(c, order && this.morning)
        })
    }
    
    drawCardsForPlayerHand(nb = 6){
        let cards = this.deck.pick(nb)
        cards.forEach(c => {
            this.player.hand.add(c)
        })
        this.player.hand.order()
    }

    playerPlayCard(c: Card, side?: Side){
        // console.log('side to play', side
        this.player.hand.remove(c);
        this.playedCards.add(c, side);
        if(this.morning && this.playedCards.length === 4){
            this.drawCardsForPlayedCards()
        }
    }

    resolveCard(c:Card, choices: ActionSelection){
        // Check if cards is the first card not played
        if(this.playedCards.indexOf(c) === 0){
            // Check if all forced choices are done
            if(choices){
                let toKeep = false
                // Complete differents actions
                choices.actions.forEach(action => {
                    toKeep = toKeep || this.resolveAction(c, action)
                })
                // Mark card as completed -> go to next card
                if(toKeep){
                    this.keptCards.add(c)
                }
                this.playedCards.remove(c)
                if(!this.playedCards.isLock()){
                    this.switchMorning()
                }
            }
            else {
                throw new Error("can't resolbe cause all forced choices are not done")
            }
        }
        else {
            throw new Error("resolve a card who is not the first one")
        }
    }

    resolveAction(c: Card, action: ResolvedAction){
        let toKeep = false;
        action.monoActions.forEach( (subAction, i) => {
            let options = action.options && action.options[i]
            console.log('mono action to resolve', subAction)
            switch (subAction.resource) {
                case ResourceEnum.Bullet:
                    if(subAction.drop){
                        this.player.bulletStock.remove()
                    }
                    else {
                        this.player.bulletStock.add()
                    }
                    break;
                case ResourceEnum.Food:
                    if(subAction.drop){
                        this.player.foodStock.remove()
                    }
                    else {
                        this.player.foodStock.add()
                    }
                    break;
                case ResourceEnum.Run:
                    this.progress()
                    break;
                case ResourceEnum.PV:
                    if(options && options.hero){
                        let playerExist = this.player.heroesCollection.getIndex(options.hero) !== -1 
                        if( playerExist ){
                            if(subAction.drop){
                                options.hero.losePV()
                            }
                            else {
                                options.hero.winPV()
                            }
                        }
                        else {
                            throw new Error('no hero found to lose pv action')
                        }
                    }
                    else {
                        throw new Error('no hero to lose pv action')
                    }
                    break;
                case ResourceEnum.Life:
                    if(options && options.hero){
                        let playerExist = this.player.heroesCollection.getIndex(options.hero) !== -1 
                        if( playerExist ){
                            options.hero.die()
                        }
                        else {
                            throw new Error('no hero found to lose pv action')
                        }
                    }
                    else {
                        throw new Error('not hero to lose life action')
                    }
                    break;
                case ResourceEnum.Leaf:
                case ResourceEnum.Camp:
                case ResourceEnum.Compass:
                    console.log('compass', subAction.drop)
                    if(subAction.drop){
                        if(options){
                            if(options.keptCard){
                                console.log('use a kept card')
                            }
                            else if(options.hero){
                                let hero = this.player.heroesCollection.getHero(options.hero)
                                if(hero){
                                    if(subAction.drop){
                                        hero.losePV(hero.resource.type === subAction.resource ? 1 : 2)
                                    }
                                }
                            }
                            else {
                                throw new Error('resource compass, leaf or camp without options not referenced')
                            }
                        }
                    }
                    else {
                        console.log('keep card')
                        toKeep = true
                    }
                    break;
                case ResourceEnum.Switch:
                    if(options && options.cardsToSwitch && options.cardsToSwitch.filter(c => this.playedCards.indexOf(c) !== 0).length === 0){
                        this.playedCards.switch(options.cardsToSwitch)
                    }
                    break;
                case ResourceEnum.Skip:
                    let nextCard = this.playedCards.getNextOne()
                    nextCard && this.playedCards.remove(nextCard)
                    break;
                case ResourceEnum.Add:
                    this.drawCardsForPlayedCards()
                    break;
                case ResourceEnum.Remove:
                    let lastCard = this.playedCards.getLastOne()
                    if(lastCard && lastCard !== c){
                        this.playedCards.remove(lastCard)
                    }
                    break;
                default:
                    break;
            }            
        })
        return toKeep;
    }

    actionNeedOptions(action: Action){
        let monoActionsWithOptions = action.monoActions.filter( ma => this.getOptionsForMonoAction(ma).length > 0 )
        return monoActionsWithOptions.length > 0
    }

    getOptionsForMonoAction(monoAction: MonoAction){
        console.log('monoAction get options', monoAction)
        let options: ResolvedActionOptions[] = [];
        switch(monoAction.resource) {
            case ResourceEnum.PV:
            case ResourceEnum.Life:
                // check if drop then alive else win then not full life
                if(monoAction.drop){
                    options = this.player.heroesCollection.getHeroesAlive().map( hero => { return { hero } })
                }
                else {
                    options = this.player.heroesCollection.getHeroesNotFullLife().map(hero => { return {hero} })
                }
                break;
            case ResourceEnum.Leaf:
            case ResourceEnum.Camp:
            case ResourceEnum.Compass:
                if(monoAction.drop){
                    let hero = this.player.heroesCollection.getHeroByResource(monoAction.resource)
                    if( hero && hero.isAlive() ) {
                        options = [{ hero }]
                    }
                    let keptCards = this.keptCards.getCardsWithResourceAccessible(monoAction.resource).map(keptCard => { return { keptCard } })
                    options = options.concat(keptCards)
                }
                break;
            case ResourceEnum.Switch:
                let nextCards = this.playedCards.getNextCards()
                nextCards.forEach( (c1, i) => {
                    nextCards.forEach( (c2, j) => {
                        if(i > j){
                            options.push({ 
                                cardsToSwitch : [c1, c2]
                            })
                        }
                    })
                })
                break;
            default:
                break;
        }
        return options
    }

    progress(){
        this.road.progress()
    }

    getScore(){
        let score = 0;
        // marquer un point pour chaque jeton de nourriture 
        score += this.player.foodStock.stockSize
        // et munition restant 
        score += this.player.bulletStock.stockSize
        // un point pour chaque carte d'expertise inutilisée 
        score += this.keptCards.length
        // TODO : cinq points si vous n'avez pas encore embarqué le deck. 
        if(true){
            score += 5
        }
        // Multipliez vos points par le nombre d'explorateurs survivants
        return score * this.player.heroesCollection.length
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
	public get heroesCollection(): HeroesCollection {
		return this._heroesCollection;
	}
	public set heroesCollection(value: HeroesCollection) {
		this._heroesCollection = value;
    }
	public get keptCards(): KeptCards {
		return this._keptCards;
	}
	public set keptCards(value: KeptCards) {
		this._keptCards = value;
	}
	public get cardToPlace(): Card {
		return this._cardToPlace;
	}
	public set cardToPlace(value: Card) {
		this._cardToPlace = value;
    }
	public get historyMonoAction(): MonoAction[] {
		return this._historyMonoAction;
	}
	public set historyMonoAction(value: MonoAction[]) {
		this._historyMonoAction = value;
	}
    
        
}