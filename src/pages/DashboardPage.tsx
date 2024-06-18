import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import TransactionTable from "../components/TransactionTable";

const marketplaceAddress = import.meta.env.VITE_AMOY_ADDRESS;

const DashboardPage = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);
  async function loadTransactions() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    const data = await contract.fetchTransactionBySeller();
    console.log(data);
    const items = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        const nftData = JSON.parse(Object.keys(meta.data)[0]);
        console.log(i.price);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          transactionId: i.transactionId.toNumber(),
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          buyer: i.buyer,
          image: nftData.image,
          name: nftData.name,
          status: i.status,
          listedDate: i.listedDate,
          soldDate: i.soldDate,
        };
        return item;
      })
    );

    setTransactions(items);
    console.log(items);
    setLoadingState(false);
  }

  if (loadingState)
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-[#fcd535] text-3xl">Fetching...</h1>
      </div>
    );

  if (!loadingState && !transactions.length)
    return (
      <h1 className="py-10 px-20 text-3xl text-[#fcd535] text-center">
        You have not listed any NFT yet.
      </h1>
    );

  // if (props.chainId !== 80001)
  //   return (
  //     <div className="bg-gray-100">
  //       <TransactionTable transactions={transactions} />
  //     </div>
  //   );

  return (
    <div>
      <div className="p-2 bg-[#2f333c] w-full">
        <h2 className="text-[30px] mb-3 py-2 text-[#fcd535] text-center font-bold">
          Transaction Dashboard
        </h2>
        <div className="rounded-md">
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
