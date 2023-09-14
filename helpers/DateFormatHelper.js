
// convert date from db to dd/mm/yy format
export function formatDate(inputDateStr) {
    const date = new Date(inputDateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().padStart(2, '0')}`;
}


export function getDates(startDate, endDate) {
    const dateList = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
        dateList.push(`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear().toString().substr(-2)}`);
        currentDate.setDate(currentDate.getDate() + 1); // Increment the date by one day
    }
    return dateList;
}

export function convertToMySQLTime(jsDateTimeString) {
    const jsDate = new Date(jsDateTimeString);
    const hours = String(jsDate.getHours()).padStart(2, '0');
    const minutes = String(jsDate.getMinutes()).padStart(2, '0');
    const seconds = String(jsDate.getSeconds()).padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
}

export function convertToMySQLDateFormat(dateString) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = String(parts[0]).padStart(2, '0');
      const month = String(parts[1]).padStart(2, '0');
      const year = `20${parts[2]}`; // Assuming years are in the 21st century
  
      return `${year}-${month}-${day}`;
    }
    return null; // Invalid date format
  }