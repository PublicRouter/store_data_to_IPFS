
const { NFTStorage, File } = require('nft.storage') ;
require('dotenv').config();

//nft.storage generated API Key
const client = new NFTStorage({ token: process.env.API_KEY });

// The 'mime' npm package helps us set the correct file type on our File objects
const mime = require('mime') 

// The 'fs' builtin module on Node.js provides access to the file system
const fs = require('fs') 

// The 'path' module provides helpers for manipulating filesystem paths
const path = require('path')



async function main(data) {
  const metadata = await client.store(data);
  return metadata.url
};

async function fileFromPath(filePath) {   
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    console.log("INISDE FILEFROMPATH")
    return new File([content], path.basename(filePath), { type })
};

async function createFinal(imagePathString) {
    const imageFile = await fileFromPath(imagePathString);
    console.log("Image File: ",imageFile);
    const finalNftMeta =
    {
        "schema": "ipfs://QmNpi8rcXEkohca8iXu7zysKKSJYqCvBJn3xJwga8jXqWU",
        "nftType": "Collection.v0",
        "name": "Nft Name",
        "description": "About this NFT Colllection.",
        "image": imageFile,
        "collection": {
            "name": "Colllection Name",
            "family": "Collection Family"
        },
        "attributes": [
            {
                "trait_type": "Hat",
                "description": "Red Shiny Hat"
            },
           
        ]
    };

    const finalNft = JSON.stringify(finalNftMeta);
    const jsonPretty = JSON.stringify(JSON.parse(finalNft), null, 2);
    console.log(jsonPretty)

    //uncomment below to enable actual minting to ipfs
    main(finalNftMeta);
};

//createFinal(@ImagePathUrlString)