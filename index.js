const { Command } = require('commander')
const Database = require('./database')
const Heroe = require('./heroe')

async function main() {
    const program = new Command();

    program
        .version('v1')
        .option('-n, --name [value]', "Nome do herói")
        .option('-p, --power [value]', "Poder do herói")
        .option('-i, --id [value]', "Id do herói")
        .option('-r, --register', "Cadastrar um herói")
        .option('-l, --list', "Listar heróis")
        .option('-r, --remove [value]', "Remover herói pelo Id")
        .option('-u, --update [value]', "Atualiza herói pelo Id")
        
    program.parse(process.argv)
    
    const options = program.opts()
    const heroe = new Heroe(options)
    try {
        if(options.register) {
            delete heroe.id 
            const result = await Database.registerHeroe(Commander)
            if(!result) {
                console.error('Herói não foi cadastrado.')
                return;
            }
            console.log('Herói cadastrado com sucesso.')
        }

        if(options.list) {
            const result = await Database.list()
            console.log(result)
            return;
        }

        if(options.remove) {
            const result = await Database.remove(heroe.id)
            if(!result) {
                console.error("Não foi possível remover o herói.")
            }
            console.log('Herói removido com sucesso.')
        }

        if(options.update) {
            const idUpdate = parseInt(options.update)
            const data = JSON.stringify(heroe)
            const heroeUpdate = JSON.parse(data)
            const result = await Database.update(idUpdate, heroeUpdate) 
            if(!result) {
                console.error("Não foi possível atualizar o herói.")
                return;
            }          
            console.log('Herói atualizado com sucesso.')  
        }

    } catch(error) {
        console.error('DEU RUIM', error)
    }
}

main()