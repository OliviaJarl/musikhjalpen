import data from "../../public/data/musikhjalpenYears.json";

export function processCityData() : City[] {
    const cityCountMap = new Map<string, number>();
    
    data.years.forEach((year: MusikhjalpenYear) => {
    const currentCity = year.city;
    if (cityCountMap.has(currentCity)) {
      cityCountMap.set(currentCity, cityCountMap.get(currentCity)! + 1);
    } else {
      cityCountMap.set(currentCity, 1);
    }
  });

  const citiesArray: City[] = Array.from(cityCountMap.entries()).map(
    ([name, count]) => ({
      name,
      count,
    })
  );
  const cities = citiesArray
    .sort((a, b) => b.count - a.count)
    .slice(0, citiesArray.length);
  
    return cities;
}


export function processHostData() : Host[] {
  const hostCountMap = new Map<string, number>();
  data.years.forEach((year: MusikhjalpenYear) => {
    year.hosts.forEach((host: string) => {
      if (hostCountMap.has(host)) {
        hostCountMap.set(host, hostCountMap.get(host)! + 1);
      } else {
        hostCountMap.set(host, 1);
      }
    });
  });

  const hostsArray: Host[] = Array.from(hostCountMap.entries()).map(
    ([name, count]) => ({
      name,
      count,
    })
  );

  const hosts = hostsArray.sort((a, b) => b.count - a.count).slice(0, 7);
  return hosts;
}