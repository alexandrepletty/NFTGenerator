// --- Dependency
const fs	= require('fs')
const path	= require('path')
const ora	= require('ora')
const chalk	= require('chalk')

// --- Variable
const configName	= 'config.json'
const basePath		= `${path.dirname(__dirname)}/input`
const pathConfig	= `${basePath}/${configName}`
const tracker		= ora()

// --- Stop script timeout
const sleep = (seconds = 2) => {
	return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

// --- Check exist NFT config
const isNFTConfig = () => {
	// --- Check folder
	let folder = fs.readdirSync(basePath)

	// --- Return bool
	return folder.find(file => file === configName)
}

// --- Create NFT config
const createNFTConfig = async () => {
	// --- Check file existe
	if(isNFTConfig() === undefined) {
		tracker.text = chalk.redBright('Creation of the configuration file')
		tracker.start()
		await sleep(1)

		// --- Create NFT config
		fs.writeFileSync(`${basePath}/${configName}`, JSON.stringify({}))
		tracker.succeed(chalk.greenBright('config.json is create'))

		await sleep(0.5)
	}else {
		tracker.info(chalk.blueBright('config.json is already created'))
		await sleep(0.5)
		return true
	}
}

// --- Read NFT config
const readNFTConfig = ()  => {
	// --- Return NFT config
	if(isNFTConfig() !== undefined) {
		return JSON.parse(fs.readFileSync(pathConfig, 'utf-8'))
	}
}

// --- Update NFT config
const updateNFTConfig = (data) => {
	fs.writeFileSync(pathConfig, JSON.stringify(data))
}

// --- Loop folders
const getDirectories = (source) => {
	return fs.readdirSync(source, {withFileTypes:true})
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)
}

// --- Generate color
const generatedColor = (brightness) => {
	let hue = Math.floor(Math.random() * 360)
	return `hsl(${hue}, 100%, ${brightness})`
}

module.exports = {sleep, isNFTConfig, createNFTConfig, readNFTConfig, updateNFTConfig, getDirectories, generatedColor}