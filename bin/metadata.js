// --- Dependency
const fs		= require('fs')
const ora		= require('ora')
const chalk		= require('chalk')

// --- Modules
const {sleep}					= require('./functions')
const {description, baseURI}	= require('./config')

// --- Variables
let tracker		= ora()
let metadata	= []
let attributes	= []

// --- Create Metadata
const createNFTMetadata = async (_dna, _NFTCount) => {
	// --- Push metadata to array
	metadata.push({
		dna: _dna.join(''),
		name: `#${_NFTCount}`,
		description: (await description()),
		url: `${(await baseURI())}/${_NFTCount}`,
		edition: _NFTCount,
		date: Date.now(),
		attributes: attributes
	})

	// --- Reset array
	attributes	= []
}

// --- Create attribute
const createNFTAttributes = (_element) => {
	let selectElement = _element.layer.selectElement

	// --- Push attribute, hash and decoded hash
	attributes.push({
		name: selectElement.name,
		rarity: selectElement.rarity
	})
}

// --- Save metadata
const writeNFTMetadata = async () => {
	tracker.start(chalk.blueBright('Backup to metadata file'))
	await sleep(1)
	// --- Save metadata to metadata.json
	fs.writeFileSync('./output/metadata.json', JSON.stringify(metadata))
	tracker.succeed(chalk.greenBright('The metadata file has been saved successfully'))
}

module.exports = {createNFTMetadata, createNFTAttributes, writeNFTMetadata}