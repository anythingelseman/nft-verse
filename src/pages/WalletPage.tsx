import TransitionForm from "../components/TransitionForm";

const WalletPage = (props: any) => {
  return (
    <div className=" bg-[#2f333c] w-full ">
      <div className="flex flex-col items-center text-white lg:flex-row lg:justify-around">
        <div className="w-fit h-48 bg-[#0B0E11] p-6 rounded-xl">
          <h1 className="text-center text-2xl font-bold text-[#fcd535]">
            Wallet overview
          </h1>
          <div className="flex flex-col justify-evenly h-full">
            <div className="flex justify-between">
              <p className="mr-5">Address: </p>
              <p>{props.defaultAccount}</p>
            </div>
            <div className="flex justify-between">
              <p>Balance: </p>
              <p>
                {props.userBalance} {props.currency}
              </p>
            </div>
          </div>
        </div>

        <div className="w-fit h-48 bg-[#0B0E11] p-6 rounded-xl mt-5 lg:mt-0">
          <h1 className="text-center text-2xl font-bold text-[#fcd535]">
            Current chain
          </h1>
          <div className="flex flex-col justify-evenly h-full">
            <div className="flex justify-between">
              <p className="mr-5">Chain name: </p>
              <p>{props.chainName}</p>
            </div>
            <div className="flex justify-between">
              <p>Chain Id: </p>
              <p>{props.chainId}</p>
            </div>
            <div className="flex justify-between">
              <p>Currency: </p>
              <p>{props.currency}</p>
            </div>
          </div>
        </div>
      </div>

      <TransitionForm
        userBalance={props.userBalance}
        defaultAccount={props.defaultAccount}
        getAccountBalance={props.getAccountBalance}
      />
    </div>
  );
};

export default WalletPage;
