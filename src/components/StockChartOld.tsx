"use client";
import { AreaChart } from "@tremor/react";
import React from "react";
import { cx } from "@/lib/utils";
import { StockDatum } from "@/data/schema";
import { InfoCard } from "./InfoCard";

export type CardProps = {
  id: string;
  data: StockDatum[];
  price: number;
  sales: number;
  ratingStars: number;
  ratingCount: number;
};

export const getBadgeType = (value: number) => {
  if (value > 0) {
    return "success";
  } else if (value < 0) {
    if (value < -50) {
      return "warning";
    }
    return "error";
  } else {
    return "neutral";
  }
};

export function StockChartOld({
  id,
  data,
  price,
  sales,
  ratingStars,
  ratingCount,
}: CardProps) {

  
  // const previousValue = chartData.length > 0 ? chartData[0].stock || 0 : 0;

  // const evolution =
  //   selectedPeriod !== "no-comparison" && previousValue !== 0
  //     ? (value - previousValue) / previousValue
  //     : 0;

  return (
    <div className="flex justify-between w-full">
    <span className='w-1/3'>
    {/* Chart part of the component */}
    <div className={cx("transition")}>
      <div className="flex items-center justify-between gap-x-2">
        <div className="flex items-center gap-x-2">
          {/* {selectedPeriod !== "no-comparison" && (
            <Badge variant={getBadgeType(evolution)}>
              {percentageFormatter(evolution)}
            </Badge>
          )} */}
        </div>
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        {/* {selectedPeriod !== "no-comparison" && (
          <dd className="text-sm text-gray-500">
            {value > previousValue ? "up" : "down"} from{" "}
            {formatter(previousValue)}
          </dd>
        )} */}
      </div>
      <AreaChart
        key={id}
        className="h-52"
        noDataText="No data"
        data={data || []}
        index="formattedDate"
        yAxisWidth={45}
        categories={['stock']}
        colors={["#694873"]}
        startEndOnly={true}
        showYAxis={true}
        showAnimation={true}
        showLegend={false}
        showTooltip={true}
        yAxisLabel="Sales"
      />
        {/*figure out how to add scatter points and stuff by checking the tremor docs*/}
        {/* Data FLEX part of the component */}
    </div>
    </span>
      <span className={'w-1/3 text-center text-lg'}>
      <InfoCard title={'Price'} value={'€' + price.toString()} />
      <InfoCard title={'Sales'} value={sales.toString()} />
      <InfoCard title={'Total'} value={'€' + (sales * price).toFixed(2)} />
      </span>
      <span className={'w-1/3 text-center text-lg'}>
      <InfoCard title={'Reviews'} value={ratingCount.toString()} />
      <InfoCard title={'Stars'} value={ratingStars.toFixed(2)} />
      </span>
    </div>
    
  );
}