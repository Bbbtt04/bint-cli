const program = require('commander');
const path = require('path')

const commandLists = [{
    name: 'create',
    type: '<ProjectName>',
    alias: 'c',
    description: '创建一个新项目'
},
{
    name: 'hello',
    alias: 'h',
    type: '<YourName>',
    description: 'say hello'
}
]

for (let item in commandLists) {
    let actions = require(path.resolve(__dirname, `./actions/${commandLists[item].name}`))
    program.command(commandLists[item].name)
        .argument(commandLists[item].type)
        .alias(commandLists[item].alias)
        .action(
            actions
        )
        .description(commandLists[item].description)
}

program.parse(process.argv)
