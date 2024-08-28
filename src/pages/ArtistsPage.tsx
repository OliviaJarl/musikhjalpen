import { Box, Center, Heading } from "@chakra-ui/react";
import { sideMargins } from "../constants";
import Loading from "../components/Loading";
import useData from "../state-management/useData";
import Breadcrumb from "../components/Breadcrumb";
import HorizontalBarChart from "../components/Charts/HorizontalBarChart";
import ChartLabel from "../components/Charts/ChartLabel";
import { bottomMarginHeading } from "../constants";

const ArtistsPage = () => {
  const { artistData, isLoading } = useData();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box marginLeft={sideMargins} marginRight={sideMargins}>
          <Breadcrumb lastPathName="Artists" />
          <Heading
            marginBottom={bottomMarginHeading}
            marginTop={{ base: "10px", md: "20px", lg: "30px" }}
            fontSize="xl"
          >
            Top 100 artists
          </Heading>
          <Center>
            <HorizontalBarChart data={artistData.slice(0, 100)}>
              {(artist) => <ChartLabel data={artist} />}
            </HorizontalBarChart>
          </Center>
        </Box>
      )}
    </>
  );
};

export default ArtistsPage;
