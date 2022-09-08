const program = require('commander');
const path = require('path')
const chalk = require('chalk')

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

// for (let item in commandLists) {
//     let actions = require(path.resolve(__dirname, `./actions/${commandLists[item].name}`))
//     program.command(commandLists[item].name)
//         .argument(commandLists[item].type)
//         .alias(commandLists[item].alias)
//         .action(
//             actions
//         )
//         .description(commandLists[item].description)
// }
program.command('create <ProjectName>')
    .description('创建一个新项目')
    .option('-f, --force','覆盖当前目论存在的同名项目')
    .alias('c')
    .action((name,cmd) =>
      require('./actions/create')(name,cmd)
    )


program.command('config [value]')
        .description('the config')
        .option('-g, --get <path>','get value from option')
        .option('-s, --set <path> <value>')
        .option('-d, --delete <path>','delete option from config')
        .action((value,cmd) => {
            console.log(value,cmd);
        })

 program.on('--help',function() {
    console.log();
    console.log(`Run ${chalk.cyan('bint-cil <commond> --help')} show details`);
    console.log();
 })

program.parse(process.argv)
