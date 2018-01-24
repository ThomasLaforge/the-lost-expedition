import { Game } from '../modules/Game'
import { MonoAction } from '../modules/MonoAction'
import { ResourceEnum } from '../modules/TheLostExpedition';

let g = new Game()

describe('mono actions', () => {
  describe('can be auto resolve', () => {
    test('pv lose', () => {
        let mono = new MonoAction(ResourceEnum.PV, true)
        expect(g.monoActionHasManyOptions(mono)).toEqual(true);
    })
    // test('food lose', () => {
    //     let mono = new MonoAction(ResourceEnum.PV, false)
    //     expect(g.monoActionHasManyOptions(mono)).toEqual(true);
    // })
    test('food win', () => {
        let mono = new MonoAction(ResourceEnum.Food, false)
        expect(g.monoActionHasManyOptions(mono)).toEqual(false);
    })
    test('food lose', () => {
        let mono = new MonoAction(ResourceEnum.Food, true)
        expect(g.monoActionHasManyOptions(mono)).toEqual(false);
    })
    test('add', () => {
        let mono = new MonoAction(ResourceEnum.Add)
        expect(g.monoActionHasManyOptions(mono)).toEqual(false);
    })
    test('skip', () => {
        let mono = new MonoAction(ResourceEnum.Skip)
        expect(g.monoActionHasManyOptions(mono)).toEqual(false);
    })
    test('drop bullet', () => {
        let mono = new MonoAction(ResourceEnum.Bullet, true)
        expect(g.monoActionHasManyOptions(mono)).toEqual(false);
    })
    test('win bullet', () => {
        let mono = new MonoAction(ResourceEnum.Bullet, false)
        expect(g.monoActionHasManyOptions(mono)).toEqual(false);
    })
    test('win camp', () => {
        let mono = new MonoAction(ResourceEnum.Camp, false)
        expect(g.monoActionHasManyOptions(mono)).toEqual(false);
    })
    test('drop camp', () => {
        let mono = new MonoAction(ResourceEnum.Camp, true)
        expect(g.monoActionHasManyOptions(mono)).toEqual(false);
    })
    test('drop compass', () => {
        let mono = new MonoAction(ResourceEnum.Compass, true)
        expect(g.monoActionHasManyOptions(mono)).toEqual(false);
    })
    test('win compass', () => {
        let mono = new MonoAction(ResourceEnum.Compass, false)
        expect(g.monoActionHasManyOptions(mono)).toEqual(false);
    })
    test('skip', () => {
        let mono = new MonoAction(ResourceEnum.Skip)
        expect(g.monoActionHasManyOptions(mono)).toEqual(false);
    })
  })
});