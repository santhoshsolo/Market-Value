const apiURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let cryptoData = [];


function fetchDataThen() {
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      cryptoData = data;
      renderTable(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}

async function fetchDataAsync() {
  try {
    const response = await fetch(apiURL);
    cryptoData = await response.json();
    renderTable(cryptoData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function renderTable(data) {
  const tableBody = document.getElementById('cryptoTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  data.forEach(coin => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${coin.image}" alt="${coin.name}" width="20"></td>
      <td>${coin.name}</td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>$${coin.current_price.toFixed(2)}</td>
      <td>$${coin.total_volume.toLocaleString()}</td>
      <td style="color: ${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'};">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>Mkt Cap : $${coin.market_cap.toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

function filterTable() {
  const query = document.getElementById('search').value.toLowerCase();
  const filteredData = cryptoData.filter(coin => 
    coin.name.toLowerCase().includes(query) || 
    coin.symbol.toLowerCase().includes(query)
  );
  renderTable(filteredData);
}

function sortByMarketCap() {
  const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
}

function sortByPercentage() {
  const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  renderTable(sortedData);
}

fetchDataAsync();
