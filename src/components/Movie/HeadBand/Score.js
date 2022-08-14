import { IoArrowDownCircle, IoArrowUpCircle } from "react-icons/io5";
import { formatNumber } from "../../../utils";

const Score = ({ children: { vote_average, budget, revenue } }) =>
  vote_average > 0 || budget || revenue ? (
    <table className="w-full lg:w-1/2 mx-auto mt-6 shadow bg-blue-100/80 backdrop-filter backdrop-blur-sm rounded-full">
      <thead>
        <tr className="text-base text-blue-600">
          {vote_average > 0 ? (
            <th className="font-semibold">Score</th>
          ) : undefined}
          {budget ? <th className="font-semibold">Budget</th> : undefined}
          {revenue ? <th className="font-semibold">Box-office</th> : undefined}
        </tr>
      </thead>
      <tbody>
        <tr className="text-sm text-blue-600">
          {vote_average > 0 ? (
            <td className="text-center">{`${Math.round(
              vote_average * 10,
            )}%`}</td>
          ) : undefined}
          {budget ? (
            <td className="text-center">{formatNumber(budget)}</td>
          ) : undefined}
          {revenue ? (
            <td className="flex flex-row w-max mx-auto">
              <p>{formatNumber(revenue)}</p>
              {budget > 0 ? (
                <div
                  className={`flex flex-row ml-2 items-center ${
                    revenue < budget
                      ? "text-red-600"
                      : revenue < 1.5 * budget
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  <p className="mr-0.5 text-xs">
                    {`x${(revenue / budget).toFixed(2)}`}
                  </p>
                  {revenue < budget ? (
                    <IoArrowDownCircle />
                  ) : (
                    <IoArrowUpCircle />
                  )}
                </div>
              ) : undefined}
            </td>
          ) : undefined}
        </tr>
      </tbody>
    </table>
  ) : null;

export default Score;
