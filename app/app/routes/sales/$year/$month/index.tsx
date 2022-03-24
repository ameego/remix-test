import { Link, useLoaderData, useParams } from "remix";
import { useState } from "react";
const _ = require("lodash");
import { useEffectOnce } from "react-use";
import dayjs from "dayjs";
import { formatData } from "~/src/helper";
import moment from "moment";
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

  useEffectOnce(() => {
    let results = {};

    _.reduce(
      aggregatedData,
      function (ori1, data1, c) {
        ori1[c] = _.reduce(
          data1,
          function (ori2, data2) {
            if (!_.has(results, data2.type)) {
              results[data2.type] = [];
            }

            results[data2.type].push(data2.amount);
          },
          ori1[c] || {}
        );
        return ori1;
      },
      {}
    );

    setBreakdown(results);
  }, [aggregatedData, setBreakdown]);

  const nextDate = moment(`${params.year}-${params.month}-01`)
    .add(1, "months")
    .endOf("month")
    .format("YYYY-MM-DD");

  const previousDate = moment(`${params.year}-${params.month}-01`)
    .subtract(1, "months")
    .endOf("month")
    .format("YYYY-MM-DD");

  const splitPreviousDate = previousDate.split("-");
  const splitNextDate = nextDate.split("-");

  const currentDate = dayjs().$d;
  const formattedCurrentDate = dayjs(currentDate).format("YYYY-MM");
  const splitFormattedCurrentDate = formattedCurrentDate.split("-");
  const isCurrent =
    splitFormattedCurrentDate[0] === params.year &&
    splitFormattedCurrentDate[1] === params.month;

  return (
    <div>
      <div className="navigationTitle">
        <Link to={`/sales/${splitPreviousDate[0]}/${splitPreviousDate[1]}`}>
          Previous
        </Link>
        <h1>
          {dayjs(`${params.year}-${params.month}`).format("MMMM YYYY")}: total
          per payment type
        </h1>
        {!isCurrent && (
          <Link to={`/sales/${splitNextDate[0]}/${splitNextDate[1]}`}>
            Next
          </Link>
        )}
      </div>
      {breakdown &&
        Object.keys(breakdown).map((item, index) => {
          return (
            <h2
              className="noUnderline majOnFirstLetter"
              key={`breakdow-${index}`}
            >
              {item}: ${formatThousands(_.sum(breakdown[item]).toFixed(2), ",")}
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
