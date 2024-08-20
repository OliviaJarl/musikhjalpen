import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Center, Flex, Heading, VStack, Text } from "@chakra-ui/react";
import useData from "../state-management/useData";
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
} from "../state-management/fetchAndProcessFunctions";

const YearDetailPage = () => {
  const { id } = useParams();
  const {yearData} = useData();
  const currentYear: MusikhjalpenYear = yearData[Number(id)];

  const [trackData, setTrackData] = useState<TrackPlot[]>([]);
  const [artistData, setArtistData] = useState<ArtistPlot[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tracks: Track[] = await fetchTrackData(currentYear.year);
      const trackCount = trackOccurrence(tracks);
      const artistCount = artistOccurence(tracks);

      const sortedTracks = getSortedTracks(trackCount);
      const sortedArtists = sortArtistsByCount(
        Array.from(artistCount.values())
      );

      if (sortedTracks) {
        setTrackData(sortedTracks);
      }
      if (sortedArtists) {
        setArtistData(sortedArtists);
      }
    };
    fetchData();
  }, [currentYear.year]);

  return (
    <Flex
      flexDir="column"
      align="left"
      marginLeft={sideMargins}
      marginRight={sideMargins}
    >
      <YearInfo data={currentYear} />
      <Heading fontSize="xl" marginBottom={bottomMarginHeading}>
        Most played songs
      </Heading>
      <Center marginBottom={bottomMarginSection}>
        <HorizontalBarChart data={trackData}>
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
          {currentYear.most_wished_artists.length === 0 ? (
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
        <HorizontalBarChart data={artistData}>
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
    </Flex>
  );
};

export default YearDetailPage;
