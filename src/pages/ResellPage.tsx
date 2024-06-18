import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const marketplaceAddress = import.meta.env.VITE_AMOY_ADDRESS;

const ResellPage = () => {
  const [formInput, updateFormInput] = useState({ price: "", image: "" });
  const [nft, setNft] = useState<any>();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const tokenURI = searchParams.get("tokenURI");
  const { image, price } = formInput;

  useEffect(() => {
    fetchNFT();
  }, [id]);

  async function fetchNFT() {
    try {
      if (!tokenURI) return;
      const meta = await axios.get(tokenURI);
      const nftData = JSON.parse(Object.keys(meta.data)[0]);
      setNft({
        name: nftData.name,
        description: nftData.description,
        image: nftData.image,
      });
      updateFormInput((state) => ({
        ...state,
        image: nftData.image,
      }));
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function listNFTForSale() {
    try {
      if (!price) throw Error("Please give the price");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const priceFormatted = ethers.utils.parseUnits(formInput.price, "ether");
      let contract = new ethers.Contract(
        marketplaceAddress,
        NFTMarketplace.abi,
        signer
      );
      let listingPrice = await contract.getListingPrice();

      listingPrice = listingPrice.toString();
      let transaction = await contract.resellToken(id, priceFormatted, {
        value: listingPrice,
      });
      await transaction.wait();
      navigate("/");
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  if (!nft)
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-orange-500 text-3xl">Fetching...</h1>
      </div>
    );

  // if (props.chainId != "80001")
  //   return (
  //     <h1 className="text-orange-500 text-3xl text-center">
  //       Please change your network to Mumbai Testnet.
  //     </h1>
  //   );

  return (
    <div className="flex justify-center w-full">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Price in MATIC"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        {image && (
          <img
            className="rounded mt-4 mx-auto"
            width="350"
            src={image}
            alt="beautiful img"
          />
        )}

        <p className="text-2xl font-semibold text-[#fcd535] h-[30px] text-center mt-4">
          {nft.name}
        </p>

        <div className="text-center text-xl mt-4 text-white ">
          {nft.description}
        </div>

        <button
          onClick={listNFTForSale}
          className="bg-orange-500 p-2 mt-8 text-white rounded-lg text-xl hover:bg-orange-600 w-full"
        >
          List NFT
        </button>
      </div>
    </div>
  );
};

export default ResellPage;
