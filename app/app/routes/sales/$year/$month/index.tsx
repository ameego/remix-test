import { useLoaderData } from "remix";
import moment from 'moment';
import { useState} from "react";
const _ = require('lodash');
import { useEffectOnce } from 'react-use'


function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

function aggregate (dataSet) {
    var data = {};
    var output = _(dataSet).groupBy('col1').value();

    for (const property in output) {
      var obj = _(output[property]).groupBy('col3').map((objs, key) => {{
        return {
            'date': objs[0].col1,
            'type': key,
            'amount': _.sumBy(objs, 'col4') 
        };
      }}).value();

      data[property] = obj;  
    }

    return data;    
  }

function formatData (dataSet) {
    const data = [];

    dataSet.map((item) => {
      const tenders = item.tenders;
      
      if(tenders) {
        const tender = tenders[0];
        const date = item.created_at;
        let type = tender.type || 'Unknown';
        const note = tender.note || 'Unknown';
        const amount = tender.amount_money.amount / 100;         
        const isOther = tender.type === "OTHER" && tender.type !== "CASH";

        if(type === 'THIRD_PARTY_CARD') {
          type = 'Card'
        } else if (type === 'CASH') {
          type = 'Cash'
        }

        if(type !== 'NO_SALE') {
          data.push({
            col1: moment(date).format('DD/MM/YYYY'),
            col2: type,
            col3: isOther ? note.toLowerCase().replace(/\s/g, '') : type.toLowerCase().replace(/\s/g, ''),
            col4: amount
          })
        }        
      }

      return data;
    });

    return aggregate(data);
}

export const loader = async ({ params }) => {
  const currentYear = params.year;
  const currentMonth = params.month;
    var endOfMonth = parseInt(currentMonth) + 1;
    endOfMonth.toString();    
    const NumberOfdaysInMonth = daysInMonth(parseInt(currentMonth), parseInt(currentYear)).toString();

  const response = await fetch('https://connect.squareup.com/v2/orders/search', {
      method: 'POST',
      cache: 'no-cache',    
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer EAAAEPMYdvO5GBA9sBlmEvAy0pcjImmzM0sG5E6aUCuYFz3DV-T5kvRhRIfQ8r8y',
          'Access-Control-Allow-Origin': '*',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({'location_ids': ['LP4TYRNQXH210'], 'query': {'filter': {'date_time_filter': {'closed_at': {'start_at': `${currentYear}-${currentMonth}-01T04:00:00Z`, 'end_at': `${currentYear}-${currentMonth}-${NumberOfdaysInMonth}T20:00:00Z`}},'state_filter': {'states': ['COMPLETED']}},'sort': {'sort_field': 'CLOSED_AT', 'sort_order': 'ASC'}}}) // body data type must match "Content-Type" header
  });

  
  return response;
};

export default function Index() {
  const posts = useLoaderData();
  const aggregatedData = formatData(posts.orders);
  const [breakdown, setBreakdown] = useState();

    useEffectOnce(() => {
        let results = {};

        _.reduce(aggregatedData, function (ori1, data1, c) {
            ori1[c] = _.reduce(data1, function (ori2, data2) {
                if(!_.has(results, data2.type)) {
                    results[data2.type] = []
                }

                results[data2.type].push(data2.amount);

                return ori2;
            }, ori1[c] || {});
            return ori1;
        }, {});

        setBreakdown(results);
    }, [aggregatedData, setBreakdown]);

  return (
    <div>
        <h2>Breakdown per payment type</h2>
        {breakdown && Object.keys(breakdown).map((item, index) => {
            return <p key={`breakdow-${index}`}>{item}:  ${_.sum(breakdown[item])}</p>;
        })}
        <h2>Breakdown per day</h2>
      {aggregatedData && Object.keys(aggregatedData).map(function(key, index) {    
        return <dl key={`yo-${index}`}>
          <dt key={`date-${index}`}>
          {aggregatedData[key][0].date}
          </dt>
          {aggregatedData[key].map((element, index) => {            
            return (
            <dd key={`list${index}`}>              
              <p><strong>{element.type}:</strong> ${element.amount}</p>              
            </dd>
          )})}      
      </dl>})}
    </div>
  );
}
