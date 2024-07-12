export const formatCoordinates = (coordinates: any[]): any[] =>
  coordinates.map((item) => {
    if (item.length) {
      if (item.length > 2 || item[0].length > 2) {
        return formatCoordinates(item);
      }
    }
    if (!Array.isArray(item)) {
      return;
    }
    const [lng, lat] = item;
    return [lat, lng];
  });
