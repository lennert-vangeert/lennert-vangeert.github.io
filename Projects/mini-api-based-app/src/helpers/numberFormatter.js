// Functie om getallen te formatteren met duizendtallen gescheiden door een spatie
const formatter = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default formatter;
