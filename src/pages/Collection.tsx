import { Environment } from "@react-three/drei";
import NFT from "../components/NFT";
import { Suspense } from "react";
import Player from "../components/Player";
import Gallery from "../models/Nft_gallery";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
const marketplaceAddress = import.meta.env.VITE_AMOY_ADDRESS;

export function Component() {
  const [nfts, setNfts] = useState<any[]>([]);

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    const data = await marketplaceContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i: any) => {
        const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenURI);
        const nftData = JSON.parse(Object.keys(meta.data)[0]);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: nftData.image,
          tokenURI,
          name: nftData.name,
          description: nftData.description,
        };
        return item;
      })
    );
    setNfts(items);
  }

  // function listNFT(nft: any) {
  //   console.log("nft:", nft);
  //   navigate(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`);
  // }

  const nftPositionHandler = (i: number): [number, number, number] => {
    const x = -6 + 4 * Math.floor(i / 2);
    const y = 1.5;
    const z = i % 2 === 0 ? -3.94 : 3.94;
    return [x, y, z];
  };

  return (
    <>
      <ambientLight intensity={1} color="#BBBBBB" />
      <directionalLight
        position={[-0.5, 1, 1]}
        color="#FFFFFF"
        intensity={0.6}
        castShadow
      />
      <Environment preset="apartment" />

      {nfts.map((nft, i) => (
        <NFT
          key={i}
          information={{
            name: nft.name,
            description: nft.description,
            url: nft.image,
            price: nft.price,
          }}
          position={nftPositionHandler(i)}
          scale={1.2}
          tokenId={nft.tokenId}
          tokenURI={nft.tokenURI}
          rotation={i % 2 == 1 ? [0, Math.PI, 0] : [0, 0, 0]}
        />
      ))}

      <Suspense fallback={null}>
        <Gallery numGallery={Math.floor(nfts.length / 6) + 1} />
      </Suspense>
      <Player initial={[0, 4, 1]} />
    </>
  );
}
