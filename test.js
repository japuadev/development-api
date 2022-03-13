const { deepEqual, ok } = require('assert')
const database = require('./database')
const DEFAULT_ITEM_REGISTER = {
    name: 'Flash',
    power: 'Speed',
    id: 1 
}

const DEFAULT_ITEM_UPDATE = {
    name: 'Lanterna Verde',
    power: 'Energia do Anel',
    id: 2
}

describe('Suite de manipulação de heróis', () => {
    before(async() => {
        await database.registerHeroe(DEFAULT_ITEM_REGISTER)
        await database.registerHeroe(DEFAULT_ITEM_UPDATE)
    })
    
    it('Deve pesquisar um herói usando arquivos', async () => {
        const expected = DEFAULT_ITEM_REGISTER
        const [result] = await database.list(expected.id)
        
        deepEqual(result, expected)
    })

    it('Deve cadastrar um herói, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_REGISTER
        const result = await database.registerHeroe(DEFAULT_ITEM_REGISTER)
        const [actual] = await database.list(DEFAULT_ITEM_REGISTER.id)
        deepEqual(actual, expected)
    })

    it('Deve remover herói por Id', async() => {
        const expected = true;
        const result = await database.remove(DEFAULT_ITEM_REGISTER.id)

        deepEqual(result, expected)
    })

    it('Deve atualizar um herói por Id', async() => {
        const expected = {
            ...DEFAULT_ITEM_UPDATE,
            name: 'Batman',
            power: 'Money'
        }
        const newData = {
            name: 'Batman',
            power: 'Money'
        }
        await database.update(DEFAULT_ITEM_UPDATE.id, newData)
        const [result] = await database.list(DEFAULT_ITEM_UPDATE.id)
        deepEqual(result, expected)
    })
})