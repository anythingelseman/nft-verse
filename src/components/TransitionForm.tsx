import { ethers } from "ethers";
import { useRef } from "react";
import toast from "react-hot-toast";

const TransitionForm = (props: any) => {
  const amountInputRef = useRef<HTMLInputElement>(null);
  const addrInputRef = useRef<HTMLInputElement>(null);

  const startPayment = async ({
    ether,
    addr,
  }: {
    ether: string;
    addr: string;
  }) => {
    try {
      if (ether > props.userBalance)
        throw Error("You don't have enough balance in your wallet");
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const transaction = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether),
      });
      await transaction.wait();
      props.getAccountBalance(props.defaultAccount);
      if (amountInputRef.current) {
        amountInputRef.current.value = "";
      }
      if (addrInputRef.current) {
        addrInputRef.current.value = "";
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);

    await startPayment({
      ether: data.get("ether") as string,
      addr: data.get("addr") as string,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-14 mx-auto bg-[#0B0E11] w-fit p-5 rounded-md">
        <h1 className="text-center text-2xl font-bold text-[#fcd535] mb-5">
          Transaction Form
        </h1>
        <div>
          <input
            type="text"
            name="addr"
            placeholder="Recipient Address"
            className="w-96 mb-5 rounded-lg p-4"
            ref={addrInputRef}
          />

          <br />

          <input
            name="ether"
            type="text"
            placeholder="Amount"
            className="w-96 rounded-lg p-4 mb-5"
            ref={amountInputRef}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#fcd535] px-4 py-3 mt-3 text-black rounded-lg text-xl hover:bg-orange-600 "
          >
            Pay now
          </button>
        </div>
      </div>
    </form>
  );
};

export default TransitionForm;
