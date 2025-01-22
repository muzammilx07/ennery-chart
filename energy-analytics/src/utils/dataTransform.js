export const transformData = (data) => {
  return data.map((entry) => {
    const date = new Date(entry.createdAt.$date).toLocaleDateString("en-US");
    const total = entry.total_kwh;

    const savingModeOn =
      total > 0 ? (Math.random() * total * 0.6).toFixed(2) : 0;
    const savingModeOff = total > 0 ? (total - savingModeOn).toFixed(2) : 0;

    return {
      date,
      total_kwh: total.toFixed(2),
      savingModeOn: parseFloat(savingModeOn),
      savingModeOff: parseFloat(savingModeOff),
    };
  });
};
