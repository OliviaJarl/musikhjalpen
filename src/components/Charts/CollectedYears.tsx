import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Box } from "@chakra-ui/react";
import useData from "../../state-management/useData";

const CollectedYears = () => {
  const {yearData} = useData();
  const yearsReversed = [...yearData].reverse();
  const formatYAxis = (tickItem: number) => {
    return `${(tickItem / 1_000_000).toFixed(1)} MSEK`;
  };

  return (
    <Box w={{ base: "100%", md: "80%" }} h="500px">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={yearsReversed}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="year" />
          <YAxis
            dataKey="collected"
            tick={{ fontSize: 12 }}
            tickFormatter={formatYAxis}
            width={80}
          />
          <Tooltip />
          <Line type="monotone" dataKey="collected" stroke="#159E80" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CollectedYears;
