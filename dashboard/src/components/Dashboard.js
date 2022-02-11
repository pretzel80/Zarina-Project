import * as React from "react";
import { Card, CardHeader } from "@material-ui/core";
import Chart from "./Chart/Chart";
import { salesData } from "./Chart/dummyData";

export default () => (
  <Card>
    <CardHeader title="Welcome to the administration" />
    <Chart
      data={salesData}
      title="Sales Analytics"
      grid
      dataKey="Total profit"
    />
  </Card>
);
