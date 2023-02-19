'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = (data, langAbb, currAbb) => {
  const html = ` 
  <article class="country">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span> ${(
      data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[langAbb]}</p>
    <p class="country__row"><span>💰</span>${data.currencies[currAbb].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const getCountryAndNeighbour = (country, langAbb, currAbb) => {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Render country 1
    renderCountry(data, langAbb, currAbb);
    // Get neighbour country (2)

    const [neighbour] = data.borders;
    if (!neighbour) return;
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
    });
  });
};
getCountryAndNeighbour('portugal', 'por', 'EUR');
getCountryAndNeighbour('nigeria', 'eng', 'NGN');
