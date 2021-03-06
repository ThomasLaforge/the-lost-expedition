import {observable} from 'mobx'

import { Hero } from './Hero'
import { Stock } from './Stock'
import { Resource } from './Resource'
import { HeroJSON, ResourceEnum, Difficulty } from './TheLostExpedition'
const json_heroes = require('../datas/heroes.json')

export class HeroesCollection {

    @observable private _heroes: Hero[];

	constructor(difficulty: Difficulty,heroes?: Hero[]) {
        if(heroes){
            this.heroes = heroes
        }
        else {
            // import from json
            this.loadHeroes(difficulty)
        }
    }

    getIndex(h: Hero){
        return this.heroes.indexOf(h)
    }

    loadHeroes(difficulty: Difficulty){
        let heroes: Hero[] = []
        json_heroes.forEach( (hero: HeroJSON, i: number) => {
            if(hero.hasOwnProperty('name') && hero.hasOwnProperty('resource')){
                heroes.push( new Hero(i + 1, hero.name, new Resource(hero.resource), new Stock(difficulty === Difficulty.Hard ? 3 : 4, 4)) );
            }
            else {
                console.log('hero not valid', hero)
                throw new Error('hero json is not valid')
            }
        });
        this.heroes = heroes
        this.shuffle()
    }

    resetHeroes(difficulty: Difficulty){
        this.loadHeroes(difficulty)
    }
    
    getSomeHeroes(nb = 1){
        return this.heroes.splice(0, nb)
    }

    getHeroesWithDistinctsResources(nb = 3){
        let basicResources = [ResourceEnum.Leaf, ResourceEnum.Camp, ResourceEnum.Compass];
        return basicResources.map( r => this.getHeroByResource(r) )       
    }

    getHeroesAlive(){
        return this.heroes.filter(h => h.isAlive())
    }

    getHeroesNotFullLife(){
        return this.heroes.filter(h => h.isFullLife() )
    }

    getHero(h: Hero){
        let index = this.getIndex(h)
        return index !== -1 && this.heroes[index]
    }

    getHeroByResource(r: ResourceEnum){
        let allHeroesWithThisResource = this.heroes.filter(h => h.resource.type === r)
        let randomIndex = Math.floor(Math.random() * allHeroesWithThisResource.length)
        return allHeroesWithThisResource[randomIndex]
    }

    shuffle(){
        this.heroes = this.heroes.sort(() => Math.random() - 0.5)
    }

    get length(){
        return this.heroes.length 
    }
    
    // Getters / Setters
	public get heroes(): Hero[] {
		return this._heroes;
	}
	public set heroes(value: Hero[]) {
		this._heroes = value;
	}

}