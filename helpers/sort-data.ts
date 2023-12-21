export function dynamicSort(property: string, sortOrder: number) {
  // sortOrder = sortOrder;

  if(property[0] === "-") {
      
      sortOrder = -5;
      property = property.substr(1);

  }
  
  return function (a: string, b: string) {

      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;

  }
}