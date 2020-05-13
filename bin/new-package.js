#!/usr/bin/env node

const fs = require('fs-extra')
const minimist = require('minimist')
const chalk = require('chalk')
const { spawnSync } = require('child_process')

const { _: [name] } = minimist(process.argv.slice(2))

if (!name || !name.trim()) {
  process.stderr.write(chalk.red('\nThe missing package name parameter is required.\n\n'))
  process.exit(9)
}

const cwd = process.cwd()
const packagesPath = `${cwd}/packages`
const modulePath = `${packagesPath}/${name}`

// creating module folder
fs.ensureDir(modulePath, err => {
  // exiting on error
  if (err) {
    process.stderr.write(chalk.red(err))
    process.exit(1)
  }
  // eventually removing .gitkeep file
  if (fs.existsSync(`${packagesPath}/.gitkeep`)) {
    fs.unlinkSync(`${packagesPath}/.gitkeep`)
  }
  // entering module directory
  process.chdir(modulePath)
  // adding readme file
  fs.writeFileSync('README.md', `# ${name} \n`)
  // adding license file
  fs.writeFileSync('LICENSE', '')
  // adding index file
  fs.writeFileSync('index.js', '')
  // adding test file
  fs.writeFileSync(`${name}.test.js`, '')
  // initializing module
  spawnSync('npm init', ['-y'], { shell: true })
  // restoring initial cwd
  process.chdir(cwd)
  // exiting
  process.exit(0)
})


