import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Box } from "@chakra-ui/react";
import { fetchAndProcessTracks } from "../old_files/fetchAndProcessTracks";

interface Props {
  year: string;
}

const MostPlayedSongs = ({ year }: Props) => {
  const [data, setData] = useState<TrackPlot[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const sortedTracks = await fetchAndProcessTracks(year);

      if (sortedTracks) {
        setData(sortedTracks);
      }
    };
    fetchData();
  }, [year]);

  return (
    <>
      <Box w="100%" h="1000px">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical" // Ändra layouten till vertikal för liggande staplar
            margin={{
              top: 5,
              right: 30,
              left: 50,
              bottom: 5,
            }}
          >
            <XAxis type="number" /> <YAxis type="category" dataKey="name" />
            <Bar
              dataKey="count"
              fill="#159E80"
              radius={[0, 20, 20, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default MostPlayedSongs;
