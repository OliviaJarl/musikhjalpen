
export const travelingHostsString = (travelingHosts: string[]) => {
    let hostString = "";

    if (travelingHosts.length === 1) {
        return travelingHosts[0];
    }
  
    for (let i = 0; i < travelingHosts.length; i++) {
      if (i != travelingHosts.length - 1) {
        hostString += `${travelingHosts[i]}`;
      } else {
        hostString += ` & ${travelingHosts[i]}`;
      }
    }
  
    return hostString.trim();
  };
  
  