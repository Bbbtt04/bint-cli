const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Creator = require('./Creator');
module.exports = async function (ProjectName, options) {
    // 获取当前目录
    const cwd = process.cwd();
    // 目标目录
    const target = path.join(cwd, ProjectName)
    // 判断目标文件是否存在
    if(fs.existsSync(target)) {
        if (options.force) {
            await fs.remove(target)
        } else {
            //  提示用户是否覆盖
            let { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: `项目名 ${ProjectName} 在当前目录下已存在,是否要覆盖?`,
                    choices: [{ name: '确定', value: true },
                    { name: '取消', value: false }]
                }
            ])
            if(action) {
                console.log('\r\n删除中...\n');
                console.log(target);
                await fs.remove(target)
            } else {
                return
            }
        }
    }
    // 创建项目
    const creator = new Creator(ProjectName,target)
    creator.create()
}
