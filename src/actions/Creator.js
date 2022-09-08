const inquirer = require('inquirer')
const ora = require('ora');
const chalk = require('chalk');
const download = require('download-git-repo');
const fs = require('fs')
class Creator {
  constructor(name, target) {
    this.name = name
    this.target = target
  }
  async fetchTemplate () {
    let { template } = await inquirer.prompt({
      name: 'template',
      type: 'list',
      choices: [
        { name: 'vue3+ts集成pinia模板', value: 'https://github.com/Bbbtt04/template-vue3-ts.git' },
        { name: 'koa+JWT模板', value: 'https://github.com/Bbbtt04/Koa-JWT-mysql.git' }
      ]
    })
    console.log(template);
    this.cloneTemplate(this.name,template)
  }
  create () {
    // 通过github拉取模板
    this.fetchTemplate()
  }
  cloneTemplate (ProjectName, githubLink) {
    const spinner = ora(`Downloadinging....`).start();
    download(`direct:${githubLink}`, ProjectName, { clone: true }, (err) => {
      spinner.stop();
      console.log(chalk.greenBright(`项目创建成功✨✨\n`));
      console.log(chalk.greenBright(`1. cd ${ProjectName}`));
      console.log(chalk.greenBright(`2. npm install `));
      console.log(chalk.greenBright(`3. 执行项目启动命令\n`));
    })
  }
  cloneTemplateFailed (ProjectName) {
    console.log(chalk.redBright(`\n项目创建失败,请检查网络设置并重试\n`));

    inquirer.prompt({
      type: 'confirm',
      message: '是否重试？',
      name: 'isRetry',
      default: true
    })
      .then((answers) => {
        if (answers.isRetry) {
          this.fetchTemplate()
        } else {
          console.log(`\n你可以检查网络设置后手动重试\n`);
        }
      })
  }
}

module.exports = Creator
