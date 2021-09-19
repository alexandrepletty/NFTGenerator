// --- Dependency
const fs	= require('fs')
const path	= require('path')

// --- File configuration
let {readNFTConfig, getDirectories} = require('./functions')

// --- Get NFT config
const getReadNFTConfig = config => {
	let getConfig = readNFTConfig()
	if(getConfig !== undefined) {
		return getConfig[config]
	}
}

// --- Description NFT
const description = async () => {
	return await getReadNFTConfig('description')
}

// --- URL website for NFT
const baseURI = async () => {
	return await getReadNFTConfig('baseURI')
}

// --- Number generate
const countNFTGenerate = () => {
	return (async () => {
		return await getReadNFTConfig('numberNFT')
	})()
}

// --- NFT generation size
const format = () => {
	return {
		width: getReadNFTConfig('format'),
		height: getReadNFTConfig('format')
	}
}

// --- All folder
const folderLayer =  async () => {
	return getDirectories(`${path.dirname(__dirname)}/input`)
}

// --- Clean extension
const cleanExtension = _str => {
	return _str.slice(0, -4)
}

// --- Element NFT
const getNFTElement = (path) => {
	return fs
		.readdirSync(path)
		.filter(item => !/(^|\/)\.[^\/\.]/g.test(item))
		.map((value, index) => {
			return {
				name: cleanExtension(value),
				path: `${path}/${value}`,
			}
		})
}

// --- Layers
const layers = async () => {
	let layers = []

	for(let i = 0; i <= (await folderLayer()).length; i++) {
		if((await folderLayer())[i] !== undefined) {
			layers.push(
				{
					elements: {
						'original': getNFTElement(`${path.dirname(__dirname)}/input/${(await folderLayer())[i]}/original`),
						'rare': getNFTElement(`${path.dirname(__dirname)}/input/${(await folderLayer())[i]}/rare`),
						'super_rare': getNFTElement(`${path.dirname(__dirname)}/input/${(await folderLayer())[i]}/super_rare`)
					},
					position: {x:0, y:0},
					size: {width: (await format()).width, height: (await format()).height}
				}
			)
		}
	}

	return layers
}

// --- Generates background
const background = async () => {
	return {
		generate: await getReadNFTConfig('background'),
		brightness: '80%'
	}
}

module.exports = {layers, description, baseURI, format, background, countNFTGenerate}