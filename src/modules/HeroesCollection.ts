import { Hero } from './Hero'
import { HeroJSON } from './TheLostExpedition'
const json_heroes = require('../datas/heroes.json')

export class HeroesCollection {

    private _heroes: Hero[];

	constructor(heroes?: Hero[]) {
        if(heroes){
            this.heroes = heroes
        }
        else {
            // import from json
            this.loadHeroes()
        }
    }

    loadHeroes(){
        let heroes: Hero[] = []
        json_heroes.forEach( (hero: HeroJSON) => {
            if(hero.hasOwnProperty('name') && hero.hasOwnProperty('resource')){
                heroes.push( new Hero(hero.name, hero.resource) );
            }
            else {
                console.log('hero not valid', hero)
                throw new Error('hero json is not valid')
            }
        });
        this.heroes = heroes
        this.shuffle()
    }
    resetHeroes(){
        this.loadHeroes()
    }
    
    getSomeHeroes(nb = 1){
        return this.heroes.splice(0, nb)
    }

    shuffle(){
        this.heroes = this.heroes.sort(() => Math.random() - 0.5)
        
    }
    
    // Getters / Setters
	public get heroes(): Hero[] {
		return this._heroes;
	}
	public set heroes(value: Hero[]) {
		this._heroes = value;
	}

}