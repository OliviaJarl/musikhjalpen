import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Box } from "@chakra-ui/react";
import data from "../../../public/data/musikhjalpenYears.json";

const CollectedYears = () => {
  const years: MusikhjalpenYear[] = data.years;
  const yearsReversed = [...years].reverse();

  return (
    <Box w="80%" h="500px" >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={yearsReversed}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="year" />
          <YAxis
            dataKey="collected"
            tick={{ fontSize: 14 }} // Minska fontstorleken
          />
          <Tooltip />
          <Line type="monotone" dataKey="collected" stroke="#159E80" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CollectedYears;
