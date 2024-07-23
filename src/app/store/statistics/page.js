"use client";
import React from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import Drawer from "../components/Drawer";

const Statistics = () => {
  const options = {
    chart: {
      type: "spline",
      scrollablePlotArea: {
        minWidth: 600,
        scrollPositionX: 1,
      },
    },
    title: {
      text: "Monthly Expense and Revenue",
      align: "left",
    },
    subtitle: {
      text: "Comparison of expense and revenue over the year",
      align: "left",
    },
    xAxis: {
      // type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels: {
        overflow: "justify",
      },
      // type: "datetime",
      // labels: {
      //     format: '{value:%b}' // format as month abbreviation
      // }
    },
    yAxis: {
      title: {
        text: "Amount (in thousands)",
      },
      labels: {
        formatter: function () {
          return this.value / 1000 + "k";
        },
      },
      minorGridLineWidth: 0,
      gridLineWidth: 1,
      alternateGridColor: null,
    },
    tooltip: {
      valueSuffix: "k",
    },
    plotOptions: {
      spline: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 5,
          },
        },
        marker: {
          enabled: false,
        },
        // pointInterval: 3600000, // one hour
        // pointStart: Date.UTC(2020, 3, 15, 0, 0, 0),
        // pointInterval: 30 * 24 * 3600 * 1000, // one month interval
        // pointStart: Date.UTC(2023, 0, 1),
      },
    },
    series: [
      {
        name: "Revenue",
        data: [5400, 5200, 5700, 6300, 5200, 5600, 6100, 5600, 5900, 7100, 8600, 7800].map((value) => value / 1000),
      },
      {
        name: "Expense",
        data: [200, 100, 100, 50000, 300, 200, 100, 100, 100, 100, 200, 1100].map((value) => value / 1000),
      },
    ],
    navigation: {
      menuItemStyle: {
        fontSize: "10px",
      },
    },
  };

  return (
    <>
      <Drawer>
        <div className="container mx-auto md:px-20 ">
          {/* bg-gray-100 */}
          <div className="grid md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white p-4 rounded-md flex items-center justify-between">
              <div>
                <h1>Profit</h1>
                <div className="font-bold text-xl">0</div>
              </div>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  opacity="0.2"
                  d="M30 11.4549L11.5737 22.4549C10.8294 22.8883 9.96502 23.0699 9.10919 22.9726C8.25337 22.8753 7.45181 22.5043 6.82374 21.9149L2.31624 17.4999C2.19501 17.3863 2.10401 17.2442 2.05146 17.0866C1.9989 16.929 1.98646 16.7607 2.01524 16.5971C2.04402 16.4334 2.11313 16.2795 2.21632 16.1493C2.3195 16.0191 2.45351 15.9166 2.60624 15.8511L2.99999 15.6586L6.97374 16.9999L11 14.5636L7.33124 10.9999C7.20645 10.8876 7.11193 10.7457 7.05641 10.5873C7.00089 10.4288 6.98615 10.259 7.01355 10.0933C7.04095 9.92772 7.1096 9.77166 7.21318 9.63954C7.31676 9.50743 7.45193 9.40352 7.60624 9.33739L8.49999 8.99989L15.6912 11.6461L22.5462 7.55239C23.3691 7.06815 24.338 6.89422 25.278 7.06203C26.2179 7.22984 27.0668 7.72832 27.6712 8.46739L30 11.4549Z"
                  fill="#07ACB1"
                />
                <path
                  d="M22 27C22 27.2652 21.8946 27.5196 21.7071 27.7071C21.5196 27.8946 21.2652 28 21 28H2.99998C2.73477 28 2.48041 27.8946 2.29288 27.7071C2.10534 27.5196 1.99998 27.2652 1.99998 27C1.99998 26.7348 2.10534 26.4804 2.29288 26.2929C2.48041 26.1054 2.73477 26 2.99998 26H21C21.2652 26 21.5196 26.1054 21.7071 26.2929C21.8946 26.4804 22 26.7348 22 27ZM30.9825 11.6437C30.9563 11.7829 30.9009 11.915 30.8199 12.0311C30.7388 12.1473 30.6341 12.2449 30.5125 12.3175L12.0862 23.3175C11.3182 23.7679 10.4441 24.006 9.55373 24.0075C8.28538 24.0061 7.06551 23.52 6.14373 22.6487L6.12873 22.6337L1.62498 18.225C1.3867 17.9987 1.20784 17.7172 1.10422 17.4053C1.00061 17.0935 0.975428 16.7609 1.03091 16.437C1.0864 16.1131 1.22084 15.8079 1.42235 15.5483C1.62385 15.2887 1.88621 15.0828 2.18623 14.9487L2.56123 14.765C2.79805 14.6487 3.07122 14.6308 3.32123 14.715L6.85373 15.9075L9.37498 14.3825L6.64623 11.7337C6.40083 11.5077 6.2159 11.2238 6.10827 10.9079C6.00065 10.5921 5.97375 10.2544 6.03004 9.92546C6.08632 9.59657 6.224 9.28699 6.43053 9.02492C6.63705 8.76285 6.90587 8.55661 7.21248 8.42499L7.25248 8.40874L8.14623 8.06999C8.37157 7.98597 8.61965 7.98597 8.84498 8.06999L15.5875 10.5475L22.0337 6.69999C23.061 6.0886 24.274 5.86735 25.451 6.07667C26.6279 6.28599 27.6903 6.9119 28.4437 7.83999L28.4587 7.85874L30.7887 10.845C30.8758 10.9568 30.9381 11.0858 30.9715 11.2235C31.0049 11.3612 31.0086 11.5045 30.9825 11.6437ZM28.515 11.1812L26.89 9.09749C26.4377 8.5442 25.8019 8.17153 25.0982 8.04721C24.3945 7.92289 23.6695 8.05516 23.055 8.41999L16.205 12.51C16.0767 12.5861 15.9331 12.6327 15.7846 12.6465C15.6361 12.6604 15.4864 12.6411 15.3462 12.59L8.49998 10.0725L7.99998 10.2637L8.02623 10.2887L11.6962 13.85C11.8058 13.9565 11.8896 14.0867 11.941 14.2306C11.9925 14.3745 12.0102 14.5283 11.993 14.6801C11.9757 14.832 11.9239 14.9778 11.8414 15.1065C11.759 15.2352 11.6482 15.3433 11.5175 15.4225L7.49123 17.8587C7.36668 17.934 7.22721 17.9811 7.08256 17.9969C6.93791 18.0126 6.79156 17.9966 6.65373 17.95L3.06998 16.7412L3.04623 16.7537L2.99998 16.775C3.006 16.7793 3.01146 16.7843 3.01623 16.79L7.51623 21.1975C7.98586 21.6388 8.58585 21.9161 9.2263 21.9877C9.86675 22.0594 10.5132 21.9216 11.0687 21.595L28.515 11.1812Z"
                  fill="#057C80"
                />
              </svg>
            </div>
            <div className="bg-white p-4 rounded-md flex items-center justify-between">
              <div>
                <h1>Profit</h1>
                <div className="font-bold text-xl">0</div>
              </div>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  opacity="0.2"
                  d="M30 11.4549L11.5737 22.4549C10.8294 22.8883 9.96502 23.0699 9.10919 22.9726C8.25337 22.8753 7.45181 22.5043 6.82374 21.9149L2.31624 17.4999C2.19501 17.3863 2.10401 17.2442 2.05146 17.0866C1.9989 16.929 1.98646 16.7607 2.01524 16.5971C2.04402 16.4334 2.11313 16.2795 2.21632 16.1493C2.3195 16.0191 2.45351 15.9166 2.60624 15.8511L2.99999 15.6586L6.97374 16.9999L11 14.5636L7.33124 10.9999C7.20645 10.8876 7.11193 10.7457 7.05641 10.5873C7.00089 10.4288 6.98615 10.259 7.01355 10.0933C7.04095 9.92772 7.1096 9.77166 7.21318 9.63954C7.31676 9.50743 7.45193 9.40352 7.60624 9.33739L8.49999 8.99989L15.6912 11.6461L22.5462 7.55239C23.3691 7.06815 24.338 6.89422 25.278 7.06203C26.2179 7.22984 27.0668 7.72832 27.6712 8.46739L30 11.4549Z"
                  fill="#07ACB1"
                />
                <path
                  d="M22 27C22 27.2652 21.8946 27.5196 21.7071 27.7071C21.5196 27.8946 21.2652 28 21 28H2.99998C2.73477 28 2.48041 27.8946 2.29288 27.7071C2.10534 27.5196 1.99998 27.2652 1.99998 27C1.99998 26.7348 2.10534 26.4804 2.29288 26.2929C2.48041 26.1054 2.73477 26 2.99998 26H21C21.2652 26 21.5196 26.1054 21.7071 26.2929C21.8946 26.4804 22 26.7348 22 27ZM30.9825 11.6437C30.9563 11.7829 30.9009 11.915 30.8199 12.0311C30.7388 12.1473 30.6341 12.2449 30.5125 12.3175L12.0862 23.3175C11.3182 23.7679 10.4441 24.006 9.55373 24.0075C8.28538 24.0061 7.06551 23.52 6.14373 22.6487L6.12873 22.6337L1.62498 18.225C1.3867 17.9987 1.20784 17.7172 1.10422 17.4053C1.00061 17.0935 0.975428 16.7609 1.03091 16.437C1.0864 16.1131 1.22084 15.8079 1.42235 15.5483C1.62385 15.2887 1.88621 15.0828 2.18623 14.9487L2.56123 14.765C2.79805 14.6487 3.07122 14.6308 3.32123 14.715L6.85373 15.9075L9.37498 14.3825L6.64623 11.7337C6.40083 11.5077 6.2159 11.2238 6.10827 10.9079C6.00065 10.5921 5.97375 10.2544 6.03004 9.92546C6.08632 9.59657 6.224 9.28699 6.43053 9.02492C6.63705 8.76285 6.90587 8.55661 7.21248 8.42499L7.25248 8.40874L8.14623 8.06999C8.37157 7.98597 8.61965 7.98597 8.84498 8.06999L15.5875 10.5475L22.0337 6.69999C23.061 6.0886 24.274 5.86735 25.451 6.07667C26.6279 6.28599 27.6903 6.9119 28.4437 7.83999L28.4587 7.85874L30.7887 10.845C30.8758 10.9568 30.9381 11.0858 30.9715 11.2235C31.0049 11.3612 31.0086 11.5045 30.9825 11.6437ZM28.515 11.1812L26.89 9.09749C26.4377 8.5442 25.8019 8.17153 25.0982 8.04721C24.3945 7.92289 23.6695 8.05516 23.055 8.41999L16.205 12.51C16.0767 12.5861 15.9331 12.6327 15.7846 12.6465C15.6361 12.6604 15.4864 12.6411 15.3462 12.59L8.49998 10.0725L7.99998 10.2637L8.02623 10.2887L11.6962 13.85C11.8058 13.9565 11.8896 14.0867 11.941 14.2306C11.9925 14.3745 12.0102 14.5283 11.993 14.6801C11.9757 14.832 11.9239 14.9778 11.8414 15.1065C11.759 15.2352 11.6482 15.3433 11.5175 15.4225L7.49123 17.8587C7.36668 17.934 7.22721 17.9811 7.08256 17.9969C6.93791 18.0126 6.79156 17.9966 6.65373 17.95L3.06998 16.7412L3.04623 16.7537L2.99998 16.775C3.006 16.7793 3.01146 16.7843 3.01623 16.79L7.51623 21.1975C7.98586 21.6388 8.58585 21.9161 9.2263 21.9877C9.86675 22.0594 10.5132 21.9216 11.0687 21.595L28.515 11.1812Z"
                  fill="#057C80"
                />
              </svg>
            </div>
            <div>09</div>
            <div>09</div>
          </div>
          <div className="px-5 py-7 bg-white rounded-md grid grid-cols-1">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Statistics;