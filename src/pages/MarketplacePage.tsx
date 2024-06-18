import { ethers } from "ethers";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import HomeBanner from "../components/HomeBanner";
import { useNavigate } from "react-router-dom";

const marketplaceAddress = import.meta.env.VITE_AMOY_ADDRESS;

const MarketplacePage = (props: any) => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState(true);
  const [searchedNFT, setSearchedNFT] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const searchHandler = () => {
    const inputValue = inputRef.current?.value || ""; // Add null check and provide a default value
    const a = nfts.filter((nft) =>
      nft.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchedNFT(a);
  };

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

    const data = await marketplaceContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await marketplaceContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        const nftData = JSON.parse(Object.keys(meta.data)[0]);

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: nftData.image,
          name: nftData.name,
          description: nftData.description,
        };
        return item;
      })
    );
    setNfts(items);
    setSearchedNFT(items);
    setLoadingState(false);
  }
  // async function buyNft(nft: any) {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(
  //       marketplaceAddress,
  //       NFTMarketplace.abi,
  //       signer
  //     );
  //     if (props.userBalance < nft.price)
  //       throw Error("You don't have enough balance in your wallet");
  //     const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

  //     const transaction = await contract.createMarketSale(nft.tokenId, {
  //       value: price,
  //     });
  //     await transaction.wait();
  //     loadNFTs();
  //   } catch (err: any) {
  //     toast.error(err.message);
  //   }
  // }

  if (!(window.ethereum && window.ethereum.isMetaMask))
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-white text-3xl">
          Please install metamask first to use this website.
        </h1>
      </div>
    );

  if (!props.defaultAccount) {
    return (
      <div className="h-screen flex justify-center items-center flex-col">
        <h1 className="text-white text-3xl">
          Looks like you haven't connected your wallet yet.
        </h1>

        <button
          onClick={props.connectWalletHandler}
          className="bg-[#fcd535] px-5 py-3 mt-3 text-black rounded-lg text-xl hover:bg-orange-600 font-medium"
        >
          Connect wallet
        </button>
      </div>
    );
  }

  // if (props.chainId !== 80001)
  //   return (
  //     <h1 className="text-orange-500 text-3xl text-center">
  //       Please change your network to Mumbai Testnet.
  //     </h1>
  //   );

  if (loadingState)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-[#fcd535] text-3xl">Fetching...</h1>
      </div>
    );

  if (loadingState === false && !nfts.length)
    return (
      <h1 className="px-20 py-10 text-3xl text-[#fcd535] text-center">
        No items in marketplace
      </h1>
    );
  return (
    <div className="bg-gradient-to-br bg-[#2f333c] w-full ">
      <HomeBanner />
      <div className="flex mx-auto w-[400px] rounded-md bg-white">
        <div className="text-black bg-white rounded-md p-2 font-bold text-md">
          Search NFTs
        </div>
        <input
          type="text"
          ref={inputRef}
          onChange={searchHandler}
          className="p-2 text-black outline-none grow rounded-md"
        />
      </div>
      <div className="flex flex-wrap justify-around m-4 mb-0 gap-x-3">
        {searchedNFT.map((nft, i) => (
          <div
            key={i}
            className=" shadow rounded-xl overflow-hidden bg-[#0B0E11] w-[300px] h-[400px] mb-4"
          >
            <img
              className="w-full h-[200px] object-contain bg-[#0B0E11]"
              src={nft.image}
              alt={nft.name}
            />
            <div className="p-4">
              <p className="text-2xl font-semibold text-[#fcd535] h-[30px]">
                {nft.name}
              </p>
            </div>
            <div className="p-4 ">
              <p className="text-2xl font-bold text-[#fcd535]">
                {nft.price} MATIC
              </p>
              <button
                className="bg-[#fcd535] p-2 mt-3 text-black font-bold rounded-lg text-xl hover:bg-orange-600 w-full"
                onClick={() => navigate(`/nft/${nft.tokenId}`)}
              >
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;
