/**
 * Check if a date is 16 years old or more
 */
export default function getAge(date) {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if(month < 0 || (month === 0 && today.getDate() < birthDate.getDate())){
        age--
    }
    if(age >= 18) return true
    else return false
}