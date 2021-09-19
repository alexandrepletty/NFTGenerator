#NFTGenerator
![](https://img.shields.io/badge/build-passing-brightgreen)
![](https://img.shields.io/badge/Version-1.0.0-blueviolet)

💻 [Website](https://alexandrepletty.com/portfolio/f3d1/nft-generateur)
###🛠️ Installation
To set up the project run the following command
```
git clone https://github.com/alexandrepletty/NFTGenerator.git
```
Go to the root of your folder and run this command to install the packages
```javascript
yarn install
```
You can also run with npm.
```javascript
npm install
```
###📰 Usage
In the root of the folder run the command then follow the instructions
```javascript
node App.js
```
or
```javascript
yarn build
```
###🖼 Import image
In the input folder, add the different parts to make up your NFT (example folder: 1-background, 2-eye, 3-hair, etc.)
> Please note the order of the files is important add a number in the name of your file.
In the folders you created add 3 additional folders to define the rarity of the NFT:
- original
- rare
- super_rare  

You can then separate the items based on their rarity.
> For the moment the script generates 2 super rare NFTs, 4 rare NFTs and the rest will be original NFTs

###📑 Metadata
When the NFTs are generated, they will be saved in the output folder in PNG format.
A metadata.json file will also be created in the same folder with all the information for each NFT.

###🎫 DNA
If you see in the console‼ DNA exists, it means he tried to create an NFT that exists.
You just have to let the script run until it stops.
>It is not possible to create identical NFTs.  
>If you have‼ DNA exists several times in a row, it means that it cannot create more NFTs. You will be able to close the console.
 
###🦺 Update
**NFTGenerator**, is a script to simply and easily generate NFTs, some functionality is still missing to improve this service.  

Subsequently, during the next update, I will set up a system to generate NFTs by type for example, NFTs of dog type with different breed of different color.  

I will also update the rarity system to set a rarity percentage.
And lots of little additional improvement if this script pleases.