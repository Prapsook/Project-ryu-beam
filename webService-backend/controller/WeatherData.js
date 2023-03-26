const TokenManager = require("../route/token_manager");
const https = require('https');
const axios = require('axios');
const API_KEY = '8b111392161542f2ddbed2fb5513e88b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getWeatherForCities = async (req, res, next) => {
  const cities = [
    'Amnat Charoen',
    'Ang Thong',
    'Bangkok',
    'Bueng Kan',
    'Buri Ram',
    'Chachoengsao',
    'Chai Nat',
    'Chaiyaphum',
    'Chanthaburi',
    'Chiang Mai',
    'Chiang Rai',
    'Chon Buri',
    'Chumphon',
    'Kalasin',
    'Kamphaeng Phet',
    'Kanchanaburi',
    'Khon Kaen',
    'Krabi',
    'Lampang',
    // 'Lamphun',
    // 'Loei',
    // 'Lop Buri',
    // 'Mae Hong Son',
    // 'Maha Sarakham',
    // 'Mukdahan',
    // 'Nakhon Nayok',
    // 'Nakhon Pathom',
    // 'Nakhon Phanom',
    // 'Nakhon Ratchasima',
    // 'Nakhon Sawan',
    // 'Nakhon Si Thammarat',
    // 'Nan',
    // 'Narathiwat',
    // 'Nong Bua Lamphu',
    // 'Nong Khai',
    // 'Nonthaburi',
    // 'Pathum Thani',
    // 'Pattani',
    // 'Phang Nga',
    // 'Phatthalung',
    // 'Phayao',
    // 'Phetchabun',
    // 'Phetchaburi',
    // 'Phichit',
    // 'Phitsanulok',
    // 'Phra Nakhon Si Ayutthaya',
    // 'Phrae',
    // 'Phuket',
    // 'Prachin Buri',
    // 'Prachuap Khiri Khan',
    // 'Ranong',
    // 'Ratchaburi',
    // 'Rayong',
    // 'Roi Et',
    // 'Sa Kaeo',
    // 'Sakon Nakhon',
    // 'Samut Prakan',
    // 'Samut Sakhon',
    // 'Samut Songkhram',
    // 'Saraburi',
    // 'Satun',
    // 'Sing Buri',
    // 'Sisaket',
    // 'Songkhla',
    // 'Sukhothai',
    // 'Suphan Buri',
    // 'Surat Thani',
    // 'Surin',
    // 'Tak',
    // 'Trang',
    // 'Trat',
    // 'Ubon Ratchathani',
    // 'Udon Thani',
    // 'Uthai Thani',
    // 'Uttaradit',
    // 'Yala',
    // 'Yasothon'
  ];
  
  const results = [];
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const data = await getWeatherData(city);
    results.push(data);
  }
  res.json(results);
};
