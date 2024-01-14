export const formatDate = (date) => {
    if(date) {
        const inputDate = new Date(date);
        const formattedDate = `${String(inputDate.getDate()).padStart(2,'0')}/${String(inputDate.getMonth() + 1).padStart(2, '0')}/${inputDate.getFullYear()}`;
        return formattedDate
    }
    
}