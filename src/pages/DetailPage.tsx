import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import toast from "react-hot-toast";

const marketplaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const marketplaceAddress = "0x358d95F5EAb6Ea0D89bfadF62889c7eF542d6c41";

const DetailPage = (props: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nft, setNft] = useState<any>();
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    loadNFT();
  }, []);
  async function loadNFT() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    const data = await marketplaceContract.fetchMarketItemById(id);

    const tokenURI = await marketplaceContract.tokenURI(data.tokenId);
    const meta = await axios.get(tokenURI);
    const nftData = JSON.parse(Object.keys(meta.data)[0]);
    let price = ethers.utils.formatUnits(data.price.toString(), "ether");
    let item = {
      price,
      seller: data.seller,
      image: nftData.image,
      name: nftData.name,
      description: nftData.description,
      tokenId: data.tokenId.toNumber(),
      owner: data.owner,
    };

    setNft(item);
    console.log(nft);
    setLoadingState(false);
  }

  async function buyNft(nft: any) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        NFTMarketplace.abi,
        signer
      );
      if (props.userBalance < nft.price)
        throw Error("You don't have enough balance in your wallet");
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      await transaction.wait();
      navigate("/");
    } catch (err: any) {
      toast.error(err.message);
    }
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

  return (
    <div className=" w-full max-w-[85%] mx-auto mt-10">
      <div className="flex flex-wrap">
        <div className="flex justify-center w-full lg:w-1/2 flex-initial ">
          <img
            src={nft.image}
            className=" h-[450px] object-cover align-middle lg:mt-0 rounded-md"
          />
        </div>
        <div className="flex w-full lg:w-1/2 flex-initial bg-[#0B0E11] rounded-md p-5">
          <div className="flex justify-between flex-col mt-3 ">
            <div>
              <h1 className="text-white text-3xl font-bold mb-5">{nft.name}</h1>
              <h1 className="text-white text-md font-bold mb-5">
                Owned by {nft.seller}
              </h1>

              <h1 className="text-white text-lg font-bold text-justify">
                {nft.description}
              </h1>
            </div>
            <div>
              <h1 className="text-[#fcd535] text-3xl text-center font-bold mb-2">
                Price: {nft.price} MATIC
              </h1>
              <button
                className="bg-[#fcd535] p-2 mt-3 text-black font-bold rounded-lg text-xl hover:bg-orange-600 w-full"
                onClick={() => buyNft(nft)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
