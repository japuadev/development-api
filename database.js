const { readFile, writeFile } = require('fs') 
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor() {
        this.NAME_FILE = 'heroes.json'
    }
    async getDataFile() {
        const file = await readFileAsync(this.NAME_FILE, 'utf-8')    
        return JSON.parse(file.toString())
    }

    async writeFile(data) {
        await writeFileAsync(this.NAME_FILE, JSON.stringify(data))
        return true
    }

    async registerHeroe(heroe) {
        const data = await this.getDataFile()
        const id = heroe.id <= 2 ? heroe.id : Date.now();
        const heroeWithId = {
            id,
            ...heroe
        }
        const dataFinal = [
            ...data, 
            heroeWithId
        ]
        const result = await this.writeFile(dataFinal)
        return result
    }

    async list(id) {
        const data = await this.getDataFile()
        const filterDatas = data.filter(item => (id ? (item.id === id) : true))
        return filterDatas
    }

    async remove(id) {
        if(!id) {
            return await this.writeFile([])
        }
        const data = await this.getDataFile()
        const i = data.findIndex(item => item.id === parseInt(id))
        if(i === -1) {
            throw Error('O herói informado não existe')
        }
        data.splice(i, 1)
        return await this.writeFile(data)
    }

    async update(id, modifications) {
        const data = await this.getDataFile()
        const i = data.findIndex(item => item.id === parseInt(id))
        if(i === -1) {
            throw Error('O herói informado não existe.')
        }
        const current = data[i]
        const objectUpdate = {
            ...current,
            ...modifications
        }
        data.splice(i, 1)
        
        return await this.writeFile([
            ...data,
            objectUpdate
        ])
    }
}

module.exports = new Database();