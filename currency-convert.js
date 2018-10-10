// USD, CAD, 20
// 20 USD is worth 26 CAD. 
// You can spend these in the following countries: Canada

// `http://data.fixer.io/api/latest?access_key=${myFixerKey}`

const {
    myFixerKey
} = require('./config');
const axios = require('axios');

// const getExchangeRate = (from, to) => {
//     return axios.get(`http://data.fixer.io/api/latest?access_key=${myFixerKey}`).then((res) => {
//         const euro = 1 / res.data.rates[from];
//         const rate = euro * res.data.rates[to];
//         return rate;
//     });
// };



const getExchangeRate = async (from, to) => {
    const res = await axios.get(`http://data.fixer.io/api/latest?access_key=${myFixerKey}`);
    const euro = 1 / res.data.rates[from];
    const rate = euro * res.data.rates[to];
    return rate;
};

// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((res) => {
//         return res.data.map((country) => country.name);
//     });
// };

const getCountries = async (currencyCode) => {
    const res = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    const countries = res.data.map((country) => country.name);
    return countries;
};

// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then((rate) => {
//         convertedAmount = (amount * rate).toFixed(2);
//         return getCountries(to);
//     }).then((countries) => {
//         return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the followilg countries: ${countries.join(', ')}.`;
//     });
// };

const convertCurrency = async (from, to, amount) => {
    let exchangeRate = await getExchangeRate(from, to);
    let countries = await getCountries(to);
    return `${amount} ${from} is worth ${exchangeRate} ${to}. You can spend it in the followilg countries: ${countries.join(', ')}.`;
};

const doWork() = async () => {
    return 10;
};

doWork().then((data) => {
    console.log(data);
});


// convertCurrency('USD', 'CAD', 20).then((message) => console.log(message)).catch((e) => console.log(e));

// getExchangeRate('USD', 'CAD').then((rate) => {
//     console.log(rate);
// }).catch((e) => {
//     console.log(e);
// });

// getCountries('USD').then((countries) => {
//     console.log(countries);
// }).catch((e) => {
//     console.log(e);
// });