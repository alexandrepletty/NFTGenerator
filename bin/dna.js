// --- Variables
let DNAList = []

// --- Check if DNA is unique
const isDNAUnique = _dna => {
	let foundDNA = DNAList.find(d => d.join('') === _dna.join(''))
	return foundDNA === undefined
}

// --- Create DNA
const createDNA = (_layers, _rarity) => {
	let DNARandom = []
	_layers.forEach(layer => {
		DNARandom.push(Math.floor(Math.random() * layer.elements[_rarity].length))
	})
	return DNARandom
}

// --- Push to DNA list
const pushDNA = _dna => {
	DNAList.push(_dna)
}

// --- Export module
module.exports = {isDNAUnique, createDNA, pushDNA}