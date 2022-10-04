function getToday() {
  const result = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd');

  return result;
}
