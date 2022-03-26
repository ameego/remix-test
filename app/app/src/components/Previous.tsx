import { Link } from "remix";
import moment from "moment";

interface PreviousMonthProps {
  year: string | undefined;
  month: string | undefined;
}

export default function PreviousMonth(props: PreviousMonthProps) {
  const previousDate = moment(`${props.year}-${props.month}-01`)
    .subtract(1, "months")
    .endOf("month")
    .format("YYYY-MM-DD");

  const splitPreviousDate = previousDate.split("-");

  return (
    <Link
      className="month-selector"
      to={`/sales/${splitPreviousDate[0]}/${splitPreviousDate[1]}`}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        data-tags="chevron-with-circle-left"
      >
        <g transform="scale(0.01953125 0.01953125)">
          <path d="M578.662 346.931c-10.035-10.086-26.368-10.086-36.352 0l-143.718 146.688c-10.035 10.189-10.035 26.624 0 36.71l143.718 146.637c9.984 10.189 26.317 10.138 36.352 0 10.035-10.086 10.035-26.522 0-36.71l-117.862-128.256 117.862-128.307c10.035-10.138 10.035-26.522 0-36.762zM512 20.48c-271.462 0-491.52 220.058-491.52 491.52 0 271.514 220.058 491.52 491.52 491.52s491.52-220.006 491.52-491.52c0-271.462-220.058-491.52-491.52-491.52zM512 939.725c-236.288 0-427.725-191.488-427.725-427.725s191.437-427.725 427.725-427.725c236.186 0 427.725 191.488 427.725 427.725s-191.539 427.725-427.725 427.725z" />
        </g>
      </svg>
    </Link>
  );
}
