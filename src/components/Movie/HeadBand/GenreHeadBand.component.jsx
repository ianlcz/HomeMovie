import { isMobileOnly } from "react-device-detect";

import ReadingTime from "./ReadingTime.component";

const GenreHeadBand = ({ genres, runtime }) => (
  <>
    <ul className="flex flex-row mb-1.5 lg:mb-0 font-light">
      {genres.map((g, index) => (
        <li key={g.name} className="ml-1">
          <p className="text-sm">
            {g.name}
            {index === genres.length - 1 ? undefined : ", "}
          </p>
        </li>
      ))}
    </ul>

    {runtime > 0 ? (
      <>
        {genres.length > 0 ? (
          isMobileOnly ? undefined : (
            <p className="mx-2">&bull;</p>
          )
        ) : undefined}
        <ReadingTime>{runtime}</ReadingTime>
      </>
    ) : undefined}
  </>
);

export default GenreHeadBand;
