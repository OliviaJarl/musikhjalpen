
export const hostsString = (hosts: string[]) => {
  let hostString = "";

  for (let i = 0; i < hosts.length; i++) {
    if (i != hosts.length - 1) {
      hostString += `${hosts[i]}, `;
    } else {
      hostString += ` & ${hosts[i]}`;
    }
  }

  return hostString.trim();
};

