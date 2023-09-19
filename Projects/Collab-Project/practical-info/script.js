
fetch('https://v6.exchangerate-api.com/v6/bafa3b4a173caed4e90a6ee0/latest/JPY')
  .then(response => response.json())
  .then(data => console.log(data.value))
  .catch(error => console.error(error))