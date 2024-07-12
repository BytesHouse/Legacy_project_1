import isNaN from 'lodash/isNaN';
type colors = {
  'tertiary': 'tertiary',
  'primary': 'primary',
  'gray': 'gray'
}
export interface deviationResult {
  result: number;
  color: keyof colors;
  arrow: string;
  mobile?: boolean;
}

export function getDeviationCurrent(y: number, x: number, multiplier = 1) {
  let arr: deviationResult;
  let prevYear: number;
  let currentYear: number;
  if (isNaN(x)) {
    currentYear = 0;
  } else {
    currentYear = x * multiplier;
  }
  if (isNaN(y)) {
    prevYear = 0;
  } else {
    prevYear = y * multiplier;
  }
  let resultValue: number;
  if (currentYear === prevYear) {
    if (currentYear === 0) {
      return null;
    }
    arr = { result: 0, color: 'gray', arrow: 'none' };
    return arr;
  }
  if (currentYear > 0 && prevYear > 0) {
    resultValue = (prevYear / currentYear) * 100 - 100;
    if (resultValue < 0) {
      arr = { result: resultValue, color: 'primary', arrow: 'down' };
      return arr;
    }
    if (resultValue > 0) {
      arr = { result: resultValue, color: 'tertiary', arrow: 'up' };
      return arr;
    }
  } else if (currentYear < 0 && prevYear < 0) {
    resultValue = (prevYear / currentYear) * 100 - 100;
    if (resultValue < 0) {
      arr = { result: resultValue, color: 'tertiary', arrow: 'down' };
      return arr;
    }
    if (resultValue > 0) {
      arr = { result: resultValue, color: 'primary', arrow: 'up' };
      return arr;
    }
  } else if (currentYear > 0 && prevYear < 0) {
    resultValue = (prevYear / currentYear) * 100 - 100;
    arr = { result: resultValue, color: 'primary', arrow: 'down' };
    return arr;
  } else if (currentYear < 0 && prevYear > 0) {
    resultValue = (prevYear / currentYear) * 100 - 100;
    arr = { result: resultValue, color: 'tertiary', arrow: 'down' };
    return arr;
  } else if (prevYear === 0) {
    if (currentYear < 0) {
      arr = { result: -100, color: 'tertiary', arrow: 'up' };
      return arr;
    }
    if (currentYear > 0) {
      arr = { result: -100, color: 'primary', arrow: 'down' };
      return arr;
    }
  } else if (currentYear === 0) {
    if (prevYear > 0) {
      arr = { result: prevYear, color: 'tertiary', arrow: 'up' };
      return arr;
    }
    if (prevYear < 0) {
      arr = { result: prevYear, color: 'primary', arrow: 'up' };
      return arr;
    }
  }
  return { result: 0, color: 'gray', arrow: 'none' };
}
