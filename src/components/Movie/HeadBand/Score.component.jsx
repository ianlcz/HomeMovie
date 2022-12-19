import {
  IoCaretDown,
  IoCaretUp,
  IoHappyOutline,
  IoReorderTwo,
  IoSadOutline,
} from "react-icons/io5";
import { formatNumber } from "../../../utils";

const Score = ({ children: { vote_average, budget, revenue, isReleased } }) =>
  vote_average > 0 || budget || revenue ? (
    <table className="w-full lg:w-1/2 mx-auto mt-6 shadow-inner bg-blue-50/70 dark:bg-slate-800/70 backdrop-filter backdrop-blur dark:backdrop-blur-md rounded-full">
      <thead>
        <tr className="text-base text-blue-700 dark:text-blue-600">
          {vote_average > 0 ? (
            <th className="font-semibold">Score</th>
          ) : undefined}
          {budget ? <th className="font-semibold">Budget</th> : undefined}
          {revenue && isReleased ? (
            <th className="font-semibold">Box-office</th>
          ) : undefined}
        </tr>
      </thead>
      <tbody>
        <tr className="text-sm text-blue-700 dark:text-blue-600">
          {vote_average > 0 ? (
            <td
              className={`flex flex-row w-max mx-auto font-light ${
                Math.round(vote_average) < 5
                  ? "text-red-600"
                  : Math.round(vote_average) < 7
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {Math.round(vote_average) < 6 ? (
                <IoSadOutline size={18} />
              ) : (
                <IoHappyOutline size={18} />
              )}

              <p className="ml-1">{`${Math.round(vote_average)}/10`}</p>
            </td>
          ) : undefined}
          {budget ? (
            <td className="text-center font-light">{formatNumber(budget)}</td>
          ) : undefined}
          {revenue && isReleased ? (
            <td className="flex flex-row w-max mx-auto font-light">
              <p>{formatNumber(revenue)}</p>
              {budget > 0 ? (
                <div
                  className={`flex flex-row ml-2 items-center font-medium ${
                    revenue < budget
                      ? "text-red-600"
                      : revenue < 1.5 * budget
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {revenue < budget ? (
                    <IoCaretDown />
                  ) : revenue > budget ? (
                    <IoCaretUp />
                  ) : (
                    <IoReorderTwo />
                  )}

                  <p className="ml-0.5 text-xs">
                    {`x${(revenue / budget).toFixed(2)}`}
                  </p>
                </div>
              ) : undefined}
            </td>
          ) : undefined}
        </tr>
      </tbody>
    </table>
  ) : null;

export default Score;
