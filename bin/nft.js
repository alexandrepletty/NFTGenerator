// --- Dependency
const fs							= require('fs')
const { createCanvas, loadImage }	= require('canvas')
const ora							= require('ora')
const chalk							= require('chalk')

// --- Configuration NFT
const {sleep, generatedColor} = require('./functions')
const {layers, background, format} = require('./config')
const {createNFTAttributes, createNFTMetadata, writeNFTMetadata} = require('./metadata')
const {createDNA, isDNAUnique, pushDNA} = require('./dna')
const {getNFTRarity} = require('./rarity')

// --- Variables
const canvas		= createCanvas(format().width, format().height)
const ctx			= canvas.getContext('2d')
let tracker			= ora()

// --- Save NFT
const saveNFTImage = (_NFTCount) => {
	// --- Save image to folder
	fs.writeFileSync(`./output/${_NFTCount}.png`, canvas.toBuffer('image/png'))
}

// --- Draw background
const backgroundNFT = async () => {
	ctx.fillStyle = generatedColor((await background()).brightness)
	ctx.fillRect(0, 0, format().width, format().height)
}

// --- Load NFT
const loadedNFT = async (_layer) => {
	// --- Promise
	return new Promise(async (resolve) => {
		// --- Load image
		const image = await loadImage(`${_layer.selectElement.path}`)

		// --- Resolve
		resolve({layer: _layer, image})
	})
}

// --- Draw NFT
const drawNFT = async (_element) => {
	// --- Create NFT
	ctx.drawImage(
		_element.image,
		_element.layer.position.x,
		_element.layer.position.y,
		_element.layer.size.width,
		_element.layer.size.height
	)

	// --- Create attribute
	await createNFTAttributes(_element)
}

// --- DNA Constructor
const constructorNFTToDNA = (_dna = [], _layer= [], _rarity) => {
	return _layer.map((layer, index) => {
		let selectElement = layer.elements[_rarity][_dna[index]]

		return {
			location: layer.location,
			position: layer.position,
			size: layer.size,
			selectElement: selectElement
		}
	})
}

// --- Init NFT
const initNFT = async NFTCount => {
	tracker.text = chalk.blueBright('Starting NFTGenerator')
	tracker.start()
	await sleep(1)
	tracker.succeed(chalk.greenBright('NFTGenerator is running'))
	await sleep(0.5)

	// --- Started
	let NFTStart = 1

	// --- Loop to number NFT
	while(NFTStart <= NFTCount) {
		let rarity = getNFTRarity(NFTStart)
		let newDNA = createDNA((await layers()), rarity)

		// --- Check DNA
		if(isDNAUnique(newDNA)) {
			// --- Constructor
			let result = constructorNFTToDNA(newDNA, (await layers()), rarity)
			let loadedElements = []

			// --- Loop result constructor
			result.forEach(layer => {
				loadedElements.push(loadedNFT(layer))
			})

			await Promise.all(loadedElements).then(async elementArray => {

				// --- Create Background
				if((await background()).generate) {
					// --- Clear background
					ctx.clearRect(0, 0, format().width, format().height)
					await backgroundNFT()
				}

				// --- Draw NFT
				elementArray.forEach(element => {
					drawNFT(element)
				})

				saveNFTImage(NFTStart)

				tracker.info(chalk.blueBright(`NFT ${chalk.redBright(`#${NFTStart}`)} generate [${chalk.redBright(rarity)}]`))

				// --- Create Metadata
				await createNFTMetadata(newDNA, NFTStart)
			})

			// --- Push new DNA
			pushDNA(newDNA)

			NFTStart++
		}else {
			tracker.warn(chalk.yellow(`DNA exists`))
		}
	}

	console.log(' ')
	await sleep(0.5)
	// --- Save Meta data
	await writeNFTMetadata()
	await sleep(0.5)
	tracker.succeed(chalk.greenBright(`${NFTCount} NFTs were successfully generated`))
}

// --- Export module
module.exports = {initNFT}