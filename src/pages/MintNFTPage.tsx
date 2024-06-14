import { useState } from "react";
import { ethers } from "ethers";
// import { create as ipfsHttpClient } from "ipfs-http-client";
import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import mintNft from "./../images/mintNft.webp";

const marketplaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const marketplaceAddress = "0x358d95F5EAb6Ea0D89bfadF62889c7eF542d6c41";

const MintNFTPage = (props: any) => {
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState<any>();
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  async function onChange(e: any) {
    const file = e.target.files[0];
    console.log("file:", file);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      setFileUrl(ImgHash);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  }

  async function uploadToIPFS() {
    try {
      const { name, description, price } = formInput;
      if (!name || !description || !price || !fileUrl)
        throw Error("Please fill out the form completely");

      const data = JSON.stringify({
        name,
        description,
        image: fileUrl,
      });

      const resJSON = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
        data: data,
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
        },
      });
      const url = `https://gateway.pinata.cloud/ipfs/${resJSON.data.IpfsHash}`;

      return url;
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function listNFTForSale() {
    try {
      const url = await uploadToIPFS();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      /* next, create the item */
      const price = ethers.utils.parseUnits(formInput.price, "ether");
      let contract = new ethers.Contract(
        marketplaceAddress,
        NFTMarketplace.abi,
        signer
      );
      let listingPrice = await contract.getListingPrice();
      listingPrice = listingPrice.toString();
      let transaction = await contract.createToken(url, price, {
        value: listingPrice,
      });
      await transaction.wait();
      navigate("/");
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <div className="flex justify-center bg-[#2f333c]">
      <div className="w-1/2 flex flex-col pb-12 bg-[#0B0E11] px-4 rounded-lg mb-5">
        <div className="flex content-center justify-center">
          <img src={mintNft} alt="Mint NFT" width={400} height={400} />
        </div>
        <p className="text-[#fcd535] text-3xl text-center font-medium my-4">
          Create your own NFT now !
        </p>
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4 mb-3"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4 mb-2"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="Asset Price in ETH"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        {fileUrl && (
          <img
            className="rounded mt-4"
            width="350"
            src={fileUrl}
            alt="Insert pic"
          />
        )}
        <button
          onClick={listNFTForSale}
          className="bg-[#fcd535] p-2 py-3 mt-3 text-black font-medium rounded-lg text-xl hover:bg-orange-600 w-full"
        >
          Create NFT
        </button>
      </div>
    </div>
  );
};

export default MintNFTPage;
