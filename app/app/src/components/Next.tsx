import { Link } from "remix";
import moment from "moment";
import dayjs from "dayjs";

interface NextMonthProps {
  year: string | undefined;
  month: string | undefined;
}

export default function NextsMonth(props: NextMonthProps) {
  const nextDate = moment(`${props.year}-${props.month}-01`)
    .add(1, "months")
    .endOf("month")
    .format("YYYY-MM-DD");

  const splitNextDate = nextDate.split("-");

  const currentDate = dayjs().$d;
  const formattedCurrentDate = dayjs(currentDate).format("YYYY-MM");
  const splitFormattedCurrentDate = formattedCurrentDate.split("-");
  const isCurrent =
    splitFormattedCurrentDate[0] === props.year &&
    splitFormattedCurrentDate[1] === props.month;

  return (
    <>
      <Link
        className={
          isCurrent ? "month-selector link-disabled" : "month-selector"
        }
        to={`/sales/${splitNextDate[0]}/${splitNextDate[1]}`}
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          data-tags="chevron-with-circle-right"
        >
          <g transform="scale(0.01953125 0.01953125)">
            <path d="M563.2 512l-117.862-128.307c-10.035-10.138-10.035-26.573 0-36.762 10.035-10.086 26.368-10.086 36.352 0l143.718 146.637c10.035 10.189 10.035 26.624 0 36.71l-143.718 146.637c-9.984 10.189-26.317 10.138-36.352 0-10.035-10.086-10.035-26.522 0-36.71l117.862-128.205zM512 20.48c271.462 0 491.52 220.058 491.52 491.52 0 271.514-220.058 491.52-491.52 491.52s-491.52-220.006-491.52-491.52c0-271.462 220.058-491.52 491.52-491.52zM512 939.725c236.186 0 427.725-191.488 427.725-427.725s-191.539-427.725-427.725-427.725c-236.288 0-427.725 191.488-427.725 427.725-0.051 236.237 191.437 427.725 427.725 427.725z" />
          </g>
        </svg>
      </Link>
    </>
  );
}
