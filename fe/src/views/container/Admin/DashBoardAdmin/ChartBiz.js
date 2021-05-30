import React, { useEffect, useState } from "react";
import { Chart, LineAdvance } from "bizcharts";
import { currencyFormat } from "~/views/utilities/helpers/currency";

function BizChart(props) {
   const [data, setData] = useState([]);
   useEffect(() => {
      // map dự liệu
      if (props.reportChart && props.reportChart[0]) {
         const dataTrue = [];
         props.reportChart[1].map((rp) => {
            dataTrue.push({
               month: rp.month,
               type: "Doanh số",
               temperature: rp.SUM
            });
         });
         props.reportChart[0].map((rp) => {
            dataTrue.push({
               month: rp.month,
               type: "Doanh thu",
               temperature: rp.SUM
            });
         });
         setData(dataTrue);
      }
   }, [props.reportChart]);

   return (
      <Chart padding={[20, 30, 70, 70]} autoFit height={350} data={data}>
         <LineAdvance shape='smooth' point area position='month*temperature' color='type' />
      </Chart>
   );
}
export default BizChart;
