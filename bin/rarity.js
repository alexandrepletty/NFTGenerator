// --- Variables
const rarityWeights	= [
	{
		value: 'super_rare',
		from: 1,
		to: 2
	},
	{
		value: 'rare',
		from: 3,
		to: 6
	},
	{
		value: 'original',
		from: 7
	}
]

// --- Get rarity
const getNFTRarity = (_NFTCount) => {
	let rarity = ''
	rarityWeights.forEach(rarityWeight => {
		if((_NFTCount >= rarityWeight.from && _NFTCount <= rarityWeight.to) || _NFTCount >= rarityWeight.from) {
			rarity = rarityWeight.value
		}
	})
	return rarity
}

module.exports = {getNFTRarity}