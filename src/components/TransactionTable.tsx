// TransactionTable.tsx
import React from "react";

interface Transaction {
  transactionId: any;
  price: any;
  tokenId: any;
  seller: any;
  buyer: any;
  image: any;
  name: any;
  status: any;
  listedDate: any;
  soldDate: any;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  function formatTimestamp(hexTimestamp: any) {
    const timestampDec = hexTimestamp.toString();

    const date = new Date(timestampDec * 1000);

    const formattedDate = date.toLocaleString();

    return formattedDate;
  }

  return (
    <div className="container mx-auto pt-4  bg-[#181a20] rounded-md max-w-[95%]">
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-white ">
          <thead className="border-b-[1px]">
            <tr>
              <th className="text-left px-4 py-5 ">NFT</th>
              <th className="text-left px-4 py-5">Buyer</th>
              <th className="text-left px-4 py-5">Price (ETH)</th>
              <th className="text-left px-4 py-5">Status</th>
              <th className="text-left px-4 py-5">Listed Date</th>
              <th className="text-left px-4 py-5">Sold Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.transactionId}
                className="border-b-[1px] last:border-b-0"
              >
                <td className="text-left px-4 py-5">
                  <img
                    className="w-[200px] object-contain"
                    width="200px"
                    src={transaction.image}
                  />
                </td>

                <td className="text-left px-4 py-5">
                  {transaction.status == "LISTING" ? "None" : transaction.buyer}
                </td>

                <td className="text-left px-4 py-5">{transaction.price}</td>
                <td className="text-left px-4 py-5">{transaction.status}</td>
                <td className="text-left px-4 py-5">
                  {formatTimestamp(transaction.listedDate)}
                </td>
                <td className=" px-4 py-2">
                  {transaction.status == "LISTING"
                    ? "None"
                    : formatTimestamp(transaction.soldDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
