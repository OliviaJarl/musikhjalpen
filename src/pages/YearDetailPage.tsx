import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Center, Flex, Heading, VStack, Text } from "@chakra-ui/react";
import YearInfo from "../components/DetailPages/YearInfo";
import PlaylistDisplay from "../components/PlaylistDisplay";
import HorizontalBarChart from "../components/Charts/HorizontalBarChart";
import ChartLabel from "../components/Charts/ChartLabel";
import WishedItem from "../components/DetailPages/WishedItem";
import {
  sideMargins,
  bottomMarginHeading,
  bottomMarginSection,
} from "../constants";
import {
  fetchTrackData,
  getSortedTracks,
  trackOccurrence,
  artistOccurence,
  sortArtistsByCount,
  fetchYearData,
} from "../state-management/fetchAndProcessFunctions";
import Loading from "../components/Loading";
import Breadcrumb from "../components/Breadcrumb";

const YearDetailPage = () => {
  const { id } = useParams();
  const [trackData, setTrackData] = useState<TrackPlot[]>([]);
  const [currentYear, setCurrentYear] = useState<MusikhjalpenYear | null>(null);
  const [artistData, setArtistData] = useState<ArtistPlot[]>([]);
  const [isLocalLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLocalLoading(true);
      try {
        const years: MusikhjalpenYear[] = await fetchYearData();
        const year = years.find((year) => year.id === Number(id));

        if (year) {
          setCurrentYear(year);
          const tracks: Track[] = await fetchTrackData(year.year);
          const trackCount = trackOccurrence(tracks);
          const artistCount = artistOccurence(tracks);

          const sortedTracks = getSortedTracks(trackCount);
          const sortedArtists = sortArtistsByCount(
            Array.from(artistCount.values())
          );

          setTrackData(sortedTracks);
          setArtistData(sortedArtists);
        } else {
          console.error("Year not found");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLocalLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!isLocalLoading && currentYear === null) {
    return <Text>Id is not defined</Text>;
  }

  return (
    <Flex
      flexDir="column"
      align="left"
      marginLeft={sideMargins}
      marginRight={sideMargins}
    >
      {isLocalLoading || currentYear === null ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Breadcrumb lastPathName={currentYear.year} />
          <YearInfo data={currentYear} />
          <Heading fontSize="xl" marginBottom={bottomMarginHeading}>
            Most played songs
          </Heading>
          <Center marginBottom={bottomMarginSection}>
            <HorizontalBarChart data={trackData.slice(0, 10)}>
              {(track) => <ChartLabel data={track} />}
            </HorizontalBarChart>
          </Center>
          <Flex
            marginBottom={bottomMarginSection}
            gap={{ base: 50, md: 200 }}
            flexDir={{ base: "column", md: "row" }}
          >
            <VStack alignItems="flex-start">
              <Heading fontSize="xl" marginBottom={bottomMarginHeading}>
                Most wished songs
              </Heading>
              {currentYear.most_wished_songs.map((song, index) => (
                <WishedItem key={index} name={song} index={index} />
              ))}
            </VStack>
            <VStack w={{ base: "100%", md: "30%" }} alignItems="flex-start">
              <Heading fontSize="xl" marginBottom={bottomMarginHeading}>
                Most wished artists
              </Heading>
              {currentYear.most_wished_artists[0] === "" ? (
                <Text fontSize="xl">Information is missing</Text>
              ) : (
                currentYear.most_wished_artists.map((artist, index) => (
                  <WishedItem key={index} name={artist} index={index} />
                ))
              )}
            </VStack>
          </Flex>
          <Heading fontSize="xl" marginBottom={bottomMarginHeading}>
            Most played artists
          </Heading>
          <Center>
            <HorizontalBarChart data={artistData.slice(0, 10)}>
              {(artist) => <ChartLabel data={artist} />}
            </HorizontalBarChart>
          </Center>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            marginBottom={bottomMarginSection}
            justifyContent="space-between"
          ></Flex>
          <Heading fontSize="xl" marginBottom={bottomMarginHeading}>
            Spotify playlist
          </Heading>
          <PlaylistDisplay
            id={currentYear.playlist_id}
            externalURL={currentYear.playlist_external_url}
          />
        </>
      )}
    </Flex>
  );
};

export default YearDetailPage;
