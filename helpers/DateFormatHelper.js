
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