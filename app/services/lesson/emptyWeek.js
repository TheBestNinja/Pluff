// Create 5 days (Mo - Fr) and 14 hours
export default function () {
  const week = [];

  for (let day = 0; day < 5; day += 1) {
    week[day] = [];

    for (let hour = 0; hour < 15; hour += 1) {
      week[day][hour] = {
        number: hour + 1,
        lessons: [],
      };
    }
  }

  return week;
}
