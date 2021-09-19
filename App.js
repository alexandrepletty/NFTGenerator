// --- Dependency
const {createInterface}	= require('readline')
const rimraf			= require('rimraf')
const ora				= require('ora')
const chalk				= require('chalk')
const boxen				= require('boxen')

// --- bin
const {initNFT} = require('./bin/nft')
const {createNFTConfig, readNFTConfig, sleep, updateNFTConfig} = require('./bin/functions')

// --- Variables
const tracker = ora()

// --- Init readline
let rl = createInterface({
	input: process.stdin,
	output: process.stdout
})

const questions = (question) => {
	return new Promise(((resolve, reject) => {
		rl.question(question, answer => {
			resolve(answer)
		})
	}))
}

(async () => {
	tracker.text = chalk.blueBright('Preparation for the creation of NFTs')
	tracker.start()
	// --- Reset folder output
	rimraf('./output/*', () => {})
	await sleep(1)
	tracker.succeed(chalk.greenBright('NFTGenerator is running'))

	// --- Create config file
	let createNFTConf = await createNFTConfig()

	console.log(' ')
	console.log(boxen(chalk.blueBright.white('To generate your NFTs please\nanswer the following questions'), {title: 'Question', padding: 1, textAlignment: 'center', titleAlignment: 'center'}))

	if(createNFTConf === undefined) {
		// --- Question
		let description = await questions(`${chalk.redBright('What is the description of your NFTs ?')} ${chalk.white('(Not required)')}\n`)
		if(description.length === 0) tracker.info(chalk.blueBright('No answer'))
		await sleep(0.5)

		// ---------

		let baseURI = await questions(`${chalk.redBright('What is the URL of your site where your NFTs are displayed ?')} ${chalk.white('(Not required)')}\n`)
		if(baseURI.length === 0) tracker.info(chalk.blueBright('No answer'))
		await sleep(0.5)

		// ---------

		let size = await questions(`${chalk.redBright('What size do you want to generate your NFTs (default: 1000px) ?')} ${chalk.white('(Not required)')}\n`)

		if(isNaN(parseInt(size)) && size.length > 0) {
			while (isNaN(parseInt(size))) {
				tracker.fail(chalk.greenBright('You need to add a number to define the size !'))
				size = await questions(`${chalk.redBright('What size do you want to generate your NFTs (default: 1000px) ?')} ${chalk.white('(Not required)')}\n`)
				if(size.length === 0) break
			}
		}else {
			if(size.length === 0) tracker.info(chalk.blueBright('No answer'))
		}
		await sleep(0.5)

		// ---------

		// --- Update config
		await updateNFTConfig({
			description,
			baseURI,
			format: size.length === 0 ? 1000 : parseInt(size),
			background: true
		})

		console.log(' ')
		tracker.succeed(chalk.greenBright('Backup completed'))
		tracker.warn(chalk.yellow('Please restart the NFTGenerator script'))
		await sleep(1)

		// --- Close question
		process.exit()
		rl.close()
	}

	// --- Select NFT config
	let readNFTConf = await readNFTConfig()

	let numberNFT = await questions(`${chalk.redBright('How many NFTs do you want to generate ?')} ${chalk.white('(Required)')}\n`)

	if(isNaN(parseInt(numberNFT)) && numberNFT.length >= 0) {
		while (isNaN(parseInt(numberNFT))) {
			tracker.fail(chalk.greenBright('You need to add a number to generate the number of NFT !'))
			numberNFT = await questions(`${chalk.redBright('How many NFTs do you want to generate ?')} ${chalk.white('(Required)')}\n`)
		}
	}else {
		// --- Update config
		updateNFTConfig({...readNFTConf, numberNFT: parseInt(numberNFT)})
		await sleep(1)
		console.log(' ')
		tracker.succeed(chalk.greenBright('Backup completed'))

		// --- Init NFT
		await initNFT(numberNFT)
	}

	// --- Close question
	rl.close()
})()