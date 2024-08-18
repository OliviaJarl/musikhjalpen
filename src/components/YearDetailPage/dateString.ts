

  export const dateString = (startDateString: string, endDateString: string) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);


    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const startDay = startDate.getDate();
    const startMonth = months[startDate.getMonth()];

    const endDay = endDate.getDate();
    const endMonth = months[endDate.getMonth()];

    return `${startDay} ${startMonth} to ${endDay} ${endMonth}`;
  };


