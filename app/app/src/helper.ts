import moment from "moment";
const _ = require("lodash");

function aggregate(dataSet) {
  var data = {};
  var output = _(dataSet).groupBy("col1").value();

  for (const property in output) {
    var obj = _(output[property])
      .groupBy("col3")
      .map((objs, key) => {
        {
          return {
            date: objs[0].col1,
            type: key,
            amount: _.sumBy(objs, "col4"),
          };
        }
      })
      .value();

    data[property] = obj;
  }

  return data;
}

export function formatData(dataSet) {
  const data = [];

  dataSet.map((item) => {
    const transactionId = item.id;
    const refundedObject = _.find(dataSet, {
      returns: [{ source_order_id: transactionId }],
    });
    const hasRefund = !!refundedObject;
    const tenders = item.tenders;

    if (tenders) {
      const tender = tenders[0];
      const date = item.created_at;
      let type = tender.type || "Unknown";
      const note = tender.note || "Unknown";
      const amount = tender.amount_money.amount / 100;
      const isOther = tender.type === "OTHER" && tender.type !== "CASH";

      if (type === "THIRD_PARTY_CARD") {
        type = "Card";
      } else if (type === "CASH") {
        type = "Cash";
      }

      if (type !== "NO_SALE" && !hasRefund) {
        data.push({
          col1: moment(date).format("DD/MM/YYYY"),
          col2: type,
          col3: isOther
            ? note.toLowerCase().replace(/\s/g, "")
            : type.toLowerCase().replace(/\s/g, ""),
          col4: amount,
        });
      }
    }

    return data;
  });

  return aggregate(data);
}

export function getPaymentBreakdown(aggregatedData) {
  let results = {};

  _.reduce(
    aggregatedData,
    (ori1, data1, c) => {
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

  return results;
}
