import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
const marketplaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const marketplaceAddress = "0x358d95F5EAb6Ea0D89bfadF62889c7eF542d6c41";

const MyNFTPage = () => {
  const navigate = useNavigate();
  const [nfts, setNfts] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState(true);

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
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState(false);
  }
  function listNFT(nft: any) {
    console.log("nft:", nft);
    navigate(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`);
  }

  // if (props.chainId !== 80001)
  //   return (
  //     <h1 className="text-orange-500 text-3xl text-center">
  //       Please change your network to Mumbai Testnet.
  //     </h1>
  //   );

  if (loadingState)
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-orange-500 text-3xl">Fetching...</h1>
      </div>
    );

  if (!loadingState && !nfts.length)
    return (
      <h1 className="py-10 px-20 text-3xl text-orange-500">No NFTs owned</h1>
    );
  return (
    <div className="bg-gradient-to-br from-purple-800 to-purple-600 w-full">
      <div className="p-4">
        <div className="flex flex-wrap justify-around m-4 gap-x-3">
          {nfts.map((nft, i) => (
            <div
              key={i}
              className="border shadow rounded-xl overflow-hidden w-[300px] h-[350px]"
            >
              <img
                src={nft.image}
                className="w-full rounded h-[200px] object-contain bg-white"
                alt={nft.name}
              />
              <div className="p-2 bg-purple-900 h-[150px]">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} ETH
                </p>
                <button
                  className="bg-orange-500 p-2 mt-8 text-white rounded-lg text-xl hover:bg-orange-600 w-full"
                  onClick={() => listNFT(nft)}
                >
                  List
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyNFTPage;
