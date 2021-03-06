import {observable} from 'mobx'

import {Road} from './Road';
import {Card} from './Card';
import {Player} from './Player';
import {Deck} from './Deck';
import {Stack} from './Stack';
import {KeptCards, KeptCard} from './KeptCards';
import {HeroesCollection} from './HeroesCollection';
import {Difficulty, Side, ResourceEnum, ResolvedActionOptions, ResolvedMonoActionOptions} from './TheLostExpedition'
import { ActionSelection } from './ActionSelection';
import { ResolvedAction } from './ResolvedAction';
import { MonoAction } from './MonoAction';
import { Action } from './Action';
import { Logger } from './Logger'
import { PlayedCards } from './PlayedCards';
import { ActionCollection } from './ActionCollection';
import { ResolvedActionSelection } from './ResolvedActionSelection';
import { ResolvedMonoAction } from './ResolvedMonoAction';
import { chmodSync } from 'fs';

export class Game {

    @observable private _morning: boolean;
    @observable private _player: Player;
    @observable private _road: Road;
    @observable private _deck: Deck;
    @observable private _playedCards: PlayedCards;
    @observable private _keptCards: KeptCards;
    @observable private _heroesCollection: HeroesCollection;
    @observable private _cardToPlace: Card;
    @observable private _historyMonoAction: MonoAction[];
    @observable private _UI_Logger: Logger;
    @observable private _difficulty: Difficulty;

    constructor(difficulty = Difficulty.Hard, player?: Player, morning = true, road = new Road(difficulty), deck = new Deck(), playedCards = new PlayedCards(6), heroesCollection = new HeroesCollection(difficulty), nbHeroes = 3, keptCards = new KeptCards(), cardToPlace: Card = null, UI_Logger = new Logger(), autoStart = true ){
        this.difficulty = difficulty
        this.heroesCollection = heroesCollection
        let playerHeroesCollection = new HeroesCollection(difficulty, this.heroesCollection.getHeroesWithDistinctsResources())
        this.player = player || new Player(difficulty, playerHeroesCollection)
        this.morning = morning
        this.road = road
        this.deck = deck
        this.cardToPlace = cardToPlace
        this.playedCards = playedCards
        this.keptCards = keptCards
        this.UI_Logger = UI_Logger
        autoStart && this.startTurn()
    }

/**
 * States
 */
    isWon(){
        return this.road.isComplete() && !this.isGameOver()
    }
    
    isGameOver(){
        return this.player.heroesCollection.heroes.filter(h => h.isDead()).length > 0 || this.player.foodStock.stockSize < 0;
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
    
/**
 * Actions
 */
    startTurn(){
        this.UI_Logger.push({ action: 'startTurn' })
        this.drawCardsForPlayerHand(6)
        this.drawCardsForPlayedCards(2)
        if(this.morning){
            this.orderPlayedCards()
        }
    }

    switchMorning(){
        this.UI_Logger.push({ action: 'switchMorning' })
        if(!this.playedCards.isLocked()){
            if( this.player.nourrish() ){
                this.morning = !this.morning
            }
            if( this.morning ){
                this.startTurn()
            }
        }
        else {
            throw new Error('trying to switch turn without unlock the played cards');
        }
    }

    progress(){
        this.UI_Logger.push({ action: 'roadProgress' })        
        this.road.progress()
    }

    orderPlayedCards(){
        this.playedCards.order()
    }

    drawCardForCardToPlace(){
        this.cardToPlace = this.deck.pick(1)[0]
    }

    playerPlayCardForCardToPlace(card: Card){
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
        this.player.hand.remove(c)
        this.playedCards.add(c, side)
        if(this.morning){
            this.orderPlayedCards()
        }
        if(this.morning && this.playedCards.length === 4){
            this.drawCardsForPlayedCards()
        }

    }

    resolveCard(c:Card, choices: ResolvedActionSelection){
        // Check if cards is the first card not played
        let cardIndex = this.playedCards.cards.indexOf(c)
        console.log('card index', cardIndex, c.name, this.playedCards.cards.map(c => c.name))
        if(cardIndex === 0){
            // Check if all forced choices are done
            if(choices){
                // resolve all action
                let toKeep = choices.actions.filter(action => this.resolveAction(c, action)).length > 0
                // Mark card as completed -> go to next card
                if(toKeep){
                    this.keptCards.add(new KeptCard(c))
                }
                this.playedCards.remove(c)
                if(!this.playedCards.isLocked()){
                    this.switchMorning()
                }
            }
            else {
                throw new Error("can't resolve cause all forced choices are not done")
            }
        }
        else {
            throw new Error("resolve a card who is not the first one")
        }
    }

    autoResolveCard(card: Card, actionSelection?: ActionSelection){
        let resolvedActionSelection = this.getAutoResolvedActionSelection(card, actionSelection)
        this.resolveCard(card, resolvedActionSelection)
    }

    resolveAction(c: Card, action: ResolvedAction) : boolean /* to keep */{
        let toKeep = false;
        action.monoActions.forEach( (resolvedMonoAction, i) => {
            let options = resolvedMonoAction.options
            // console.log('mono action to resolve', options)
            switch (resolvedMonoAction.resource) {
                case ResourceEnum.Bullet:
                    if(resolvedMonoAction.drop){
                        this.player.bulletStock.remove()
                    }
                    else {
                        this.player.bulletStock.add()
                    }
                    break;
                case ResourceEnum.Food:
                    if(resolvedMonoAction.drop){
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
                            if(resolvedMonoAction.drop){
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
                    if(resolvedMonoAction.drop){
                        if(options){
                            if(options.keptCard){
                                console.log('To check: use a kept card')
                                this.keptCards.remove(options.keptCard)
                            }
                            else if(options.hero){
                                let hero = this.player.heroesCollection.getHero(options.hero)
                                if(hero){
                                    if(resolvedMonoAction.drop){
                                        hero.losePV(hero.resource.type === resolvedMonoAction.resource ? 1 : 2)
                                    }
                                }
                            }
                            else {
                                throw new Error('resource compass, leaf or camp without options not referenced')
                            }
                        }
                    }
                    else {
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

/**
 * Get informations
 */
    getAutoResolvedActionSelection(card: Card, actionSelection?: ActionSelection){
        actionSelection = actionSelection || card.getAutoActionSelectionFromCard()
        let resolvedActions: ResolvedAction[] = actionSelection.actions.map(a => {
            let resolvedMonoActions = a.monoActions.map(monoAction => {
                console.log('this.getOptionsForMonoAction(monoAction)', this.getOptionsForMonoAction(monoAction))
                let option: ResolvedMonoActionOptions = this.getOptionsForMonoAction(monoAction)[0]
                return new ResolvedMonoAction(monoAction.resource, monoAction.drop, option)
            })
            return new ResolvedAction(a.type, resolvedMonoActions)
        })
        return new ResolvedActionSelection(resolvedActions);
    }

    getNextCardToResolve(){
        let firstCard = this.playedCards.getFirst();
        // while(this.cardCanBeAutoResolved(firstCard)){
        //     console.log('Look: autoResolve card', firstCard)
        //     this.autoResolveCard(firstCard)
        //     firstCard = this.playedCards.getFirst();
        // }
        return firstCard
    }

    getOptionsForMonoAction(monoAction: MonoAction){
        // console.log('monoAction get options', monoAction.resource, monoAction.drop)
        let options: ResolvedMonoActionOptions[] = [];
        switch(monoAction.resource) {
            case ResourceEnum.PV:
            case ResourceEnum.Life:
                // check if drop then alive else win then not full life
                if(monoAction.drop){
                    options = this.player.heroesCollection.getHeroesAlive().map(hero => ({ hero }))
                }
                else {
                    options = this.player.heroesCollection.getHeroesNotFullLife().map(hero => ({ hero }))
                }
                break;
            case ResourceEnum.Leaf:
            case ResourceEnum.Camp:
            case ResourceEnum.Compass:
                if(monoAction.drop){
                    let alivedHeroes = this.player.heroesCollection.getHeroesAlive()
                    let heroArray = alivedHeroes.map(hero => ({hero}))
                    options = options.concat()
                    let keptCards = this.keptCards.getCardsWithResourceAccessible(monoAction.resource).map(keptCard => ({ keptCard }))
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

/**
 * Tests / Questions
 */
    actionSelectionNeedOptions(actionSelection: ActionSelection){
        return actionSelection.actions.filter(action => this.actionNeedOptions(action)).length > 0
    }

    cardHasAutoActionSelection(card: Card){
        return card.hasAutoActionSelection()
    }

    cardCanBeAutoResolved(card: Card){
        return this.cardHasAutoActionSelection(card) && this.actionSelectionCanBeAutoResolved(card.getAutoActionSelectionFromCard())
    }
    
    actionSelectionCanBeAutoResolved(choices: ActionSelection){
        console.log('actionSelectionCanBeAutoResolved', choices, choices.actions.filter(a => this.actionNeedOptions(a)))
        return choices.actions.filter(a => this.actionNeedOptions(a)).length === 0
    }
    
    actionNeedOptions(action: Action){
        let monoActionsWithOptions = action.monoActions.filter( ma => this.monoActionHasManyOptions(ma))
        return monoActionsWithOptions.length > 0
    }
    
    getIndexFirstActionWhoNeedOptions(actions: Action[]) {
        let i = 0
        while(i < actions.length && !this.actionNeedOptions(actions[i]) ){
            i++
        }
        return i
    }
    
    monoActionHasOptions(monoAction: MonoAction){
        return this.getOptionsForMonoAction(monoAction).length > 0
    }
    
    monoActionHasManyOptions(monoAction: MonoAction){
        return this.getOptionsForMonoAction(monoAction).length > 1
    }
    
    getIndexFirstMonoActionToResolve(action: Action){
        let i = 0
        while(i < action.monoActions.length && !this.monoActionHasManyOptions(action.monoActions[i])){
            i++
        }
        return i
    }

/**
 *  Getters / Setters
 */
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
	public get playedCards(): PlayedCards {
		return this._playedCards;
	}
	public set playedCards(value: PlayedCards) {
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
	public get UI_Logger(): Logger {
		return this._UI_Logger;
    }
	public set UI_Logger(value: Logger) {
		this._UI_Logger = value;
    }
	public get difficulty(): Difficulty {
		return this._difficulty;
	}
	public set difficulty(value: Difficulty) {
		this._difficulty = value;
	}
        
}