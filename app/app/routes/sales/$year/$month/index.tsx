import { Link, useLoaderData, useParams } from "remix";
import { useEffect, useLayoutEffect, useState } from "react";
const _ = require("lodash");
import { useEffectOnce } from "react-use";
import dayjs from "dayjs";
import { formatData, getPaymentBreakdown } from "~/src/helper";
import moment from "moment";
import PreviousMonth from "~/src/components/Previous";
import NextsMonth from "~/src/components/Next";
import PaymentIcon from "~/src/components/PaymentIcon";
var formatThousands = require("format-thousands");

export const loader = async ({ params }) => {
  const currentYear = params.year;
  const currentMonth = params.month;
  const NumberOfdaysInMonth = dayjs(`${currentYear}-${currentMonth}-01`)
    .daysInMonth()
    .toString();

  return fetch("https://connect.squareup.com/v2/orders/search", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer EAAAEPMYdvO5GBA9sBlmEvAy0pcjImmzM0sG5E6aUCuYFz3DV-T5kvRhRIfQ8r8y",
      "Access-Control-Allow-Origin": "*",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      location_ids: ["LP4TYRNQXH210"],
      query: {
        filter: {
          date_time_filter: {
            closed_at: {
              start_at: `${currentYear}-${currentMonth}-01T04:00:00Z`,
              end_at: `${currentYear}-${currentMonth}-${NumberOfdaysInMonth}T20:00:00Z`,
            },
          },
          state_filter: { states: ["COMPLETED"] },
        },
        sort: { sort_field: "CLOSED_AT", sort_order: "ASC" },
      },
    }),
  });
};

export default function Index() {
  const params = useParams();
  const posts = useLoaderData();
  const aggregatedData = formatData(posts.orders);
  const [breakdown, setBreakdown] = useState();

  useEffect(() => {
    const breakdowns = getPaymentBreakdown(aggregatedData);

    if (!_.isEqual(breakdowns, breakdown)) {
      setBreakdown(breakdowns);
    }
  }, [aggregatedData]);

  return (
    <div>
      <div className="navigationTitle">
        <PreviousMonth year={params.year} month={params.month} />
        <h1>{dayjs(`${params.year}-${params.month}`).format("MMMM YYYY")}</h1>
        <NextsMonth year={params.year} month={params.month} />
      </div>
      {breakdown &&
        Object.keys(breakdown).map((item, index) => {
          return (
            <h2
              className="noUnderline majOnFirstLetter"
              key={`breakdow-${index}`}
            >
              <PaymentIcon type={item} /> {item}: $
              {formatThousands(_.sum(breakdown[item]).toFixed(2), ",")}
            </h2>
          );
        })}
      <h1>
        {dayjs(`${params.year}-${params.month}`).format("MMMM YYYY")}: Breakdown
        per day
      </h1>
      {aggregatedData &&
        Object.keys(aggregatedData).map(function (key, index) {
          return (
            <dl key={`yo-${index}`}>
              <dt key={`date-${index}`}>
                <h2 className="inline-block">{aggregatedData[key][0].date}</h2>
              </dt>
              {aggregatedData[key].map((element, index) => {
                return (
                  <dd key={`list${index}`}>
                    <h3 className="majOnFirstLetter">
                      {element.type}: ${element.amount}
                    </h3>
                  </dd>
                );
              })}
            </dl>
          );
        })}
    </div>
  );
}
