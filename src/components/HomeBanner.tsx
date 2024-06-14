import homeBg from "./../images/homeBg.png";

const HomeBanner = () => {
  return (
    <div>
      <img src={homeBg} className="hidden lg:block" />
      <div
        id="homeBanner"
        className="bg-[#2f333c] lg:bg-inherit lg:absolute top-1/2 left-1/2 w-full z-[1] lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 pb-5"
      >
        <div className="max-w-[80%] w-full mx-auto">
          <div className="flex flex-wrap">
            <div className="flex items-center justify-center w-full lg:w-2/3 flex-initial">
              <div className="flex flex-col gap-3 items-center justify-center mt-3">
                <h1 className="text-[#fff] font-bold text-3xl text-center">
                  One-stop platform for all things NFTs
                </h1>
                <h1 className="text-[#fff] font-semibold text-xl  mt-5">
                  Trade, Stake and Loan NFTs securely on Binance NFT
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
