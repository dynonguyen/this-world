/* eslint-disable */

// Resources
// REST Countries: https://restcountries.com
// Factbook: https://www.cia.gov/the-world-factbook

const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

const moreInfos = {
  Afghanistan: {
    vieName: 'Áp-ga-ni-xtan'
  },
  'Åland Islands': {
    vieName: 'Åland Islands'
  },
  Albania: {
    vieName: 'An-ba-ni'
  },
  Algeria: {
    vieName: 'An-giê-ri'
  },
  Angola: {
    vieName: 'Ăng-gô-la'
  },
  'Antigua and Barbuda': {
    vieName: 'An-ti-gua và Bác-bu-đa'
  },
  Argentina: {
    vieName: 'Ác-hen-ti-na'
  },
  Armenia: {
    vieName: 'Ác-mê-ni-a'
  },
  Australia: {
    vieName: 'Úc; Ô-xtrây-li-a'
  },
  Austria: {
    vieName: 'Áo'
  },
  Azerbaijan: {
    vieName: 'A-déc-bai-dan'
  },
  Bahamas: {
    vieName: 'Ba-ha-mát'
  },
  Bahrain: {
    vieName: 'Ba-ranh'
  },
  Bangladesh: {
    vieName: 'Băng-la-đét'
  },
  Barbados: {
    vieName: 'Bác-ba-đốt'
  },
  Belarus: {
    vieName: 'Bê-la-rút'
  },
  Belgium: {
    vieName: 'Bỉ'
  },
  Belize: {
    vieName: 'Bê-li-xê'
  },
  Benin: {
    vieName: 'Bê-nanh'
  },
  Bhutan: {
    vieName: 'Bu-tan'
  },
  Bolivia: {
    vieName: 'Bô-li-vi-a'
  },
  'Bosnia and Herzegovina': {
    vieName: 'Bô-xnia Héc-dê-gô-vi-na'
  },
  Botswana: {
    vieName: 'Bốt-xoa-na'
  },
  Brazil: {
    vieName: 'Bra-xin'
  },
  Bulgaria: {
    vieName: 'Bun-ga-ri'
  },
  'Burkina Faso': {
    vieName: 'Buốc-ki-na Pha-xô'
  },
  Burundi: {
    vieName: 'Bu-run-đi'
  },
  Cambodia: {
    vieName: 'Cam-pu-chia'
  },
  Cameroon: {
    vieName: 'Ca-mơ-run'
  },
  Canada: {
    vieName: 'Ca-na-đa'
  },
  'Central African Republic': {
    vieName: 'Cộng hòa Trung Phi'
  },
  Chad: {
    vieName: 'Sát'
  },
  Chile: {
    vieName: 'Chi-lê'
  },
  China: {
    vieName: 'Trung Quốc; Trung Hoa'
  },
  Colombia: {
    vieName: 'Cô-lôm-bi-a'
  },
  Comoros: {
    vieName: 'Cô-mo'
  },
  'Costa Rica': {
    vieName: 'Cô-xta Ri-ca'
  },
  Croatia: {
    vieName: 'Crô-a-ti-a'
  },
  Cuba: {
    vieName: 'Cu-ba'
  },
  Cyprus: {
    vieName: 'Síp; Cộng hòa Síp'
  },
  Denmark: {
    vieName: 'Đan Mạch'
  },
  Djibouti: {
    vieName: 'Gi-bu-ti'
  },
  Dominica: {
    vieName: 'Đô-mi-ni-ca-na'
  },
  'Dominican Republic': {
    vieName: 'Cộng hòa Đô-mi-ni-ca-na'
  },
  Ecuador: {
    vieName: 'Ê-cu-a-đo'
  },
  Egypt: {
    vieName: 'Ai Cập'
  },
  'El Salvador': {
    vieName: 'En Xan-va-đo'
  },
  'Equatorial Guinea': {
    vieName: 'Ghi-xê Xích đạo'
  },
  Eritrea: {
    vieName: 'Ê-ri-tơ-rê-a'
  },
  Estonia: {
    vieName: 'E-xtô-ni-a'
  },
  Ethiopia: {
    vieName: 'Ê-ti-ô-pi-a'
  },
  Fiji: {
    vieName: 'Phi-gi'
  },
  Finland: {
    vieName: 'Phần Lan'
  },
  France: {
    vieName: 'Pháp'
  },
  Gabon: {
    vieName: 'Ga-bông'
  },
  Georgia: {
    vieName: 'Giê-oóc-gi-a'
  },
  Germany: {
    vieName: 'Đức'
  },
  Ghana: {
    vieName: 'Gha-na'
  },
  Greece: {
    vieName: 'Hy Lạp'
  },
  Grenada: {
    vieName: 'Grê-na-đa'
  },
  Guatemala: {
    vieName: 'Goa-tê-ma-la'
  },
  Guinea: {
    vieName: 'Ghi-nê'
  },
  'Guinea-Bissau': {
    vieName: 'Ghi-nê Bít-xao'
  },
  Guyana: {
    vieName: 'Guy-a-na'
  },
  Haiti: {
    vieName: 'Ha-i-ti'
  },
  'Heard Island and McDonald Islands': {
    vieName: 'Heard Island and McDonald Islands'
  },
  Honduras: {
    vieName: 'Hôn-đu-rát'
  },
  'Hong Kong': {
    vieName: 'Hong Kong'
  },
  Hungary: {
    vieName: 'Hung-ga-ri'
  },
  Iceland: {
    vieName: 'Ai-xơ-len'
  },
  India: {
    vieName: 'Ấn Độ'
  },
  Indonesia: {
    vieName: 'In-đô-nê-si-a'
  },
  Iran: {
    vieName: 'Iran'
  },
  Iraq: {
    vieName: 'I-rắc'
  },
  Ireland: {
    vieName: 'Ai-len'
  },
  'Isle of Man': {
    vieName: 'Isle of Man'
  },
  Israel: {
    vieName: 'I-xra-en'
  },
  Italy: {
    vieName: 'Ý'
  },
  'Ivory Coast': {
    vieName: 'Ivory Coast'
  },
  Jamaica: {
    vieName: 'Gia-mai-ca'
  },
  Japan: {
    vieName: 'Nhật Bản; Nhật'
  },
  Jersey: {
    vieName: 'Jersey'
  },
  Jordan: {
    vieName: 'Gioóc-đa-ni'
  },
  Kazakhstan: {
    vieName: 'Ca-dắc-xtan'
  },
  Kenya: {
    vieName: 'Kê-ni-a'
  },
  Kiribati: {
    vieName: 'Ki-ri-ba-ti'
  },
  Kosovo: {
    vieName: 'Kosovo'
  },
  Kuwait: {
    vieName: 'Cô-oét'
  },
  Kyrgyzstan: {
    vieName: 'Cư-rơ-gư-dơ-xtan'
  },
  Laos: {
    vieName: 'Lào'
  },
  Latvia: {
    vieName: 'Lát-vi-a'
  },
  Lebanon: {
    vieName: 'Li Băng'
  },
  Lesotho: {
    vieName: 'Lê-xô-thô'
  },
  Liberia: {
    vieName: 'Li-bê-ri-a'
  },
  Libya: {
    vieName: 'Libi'
  },
  Liechtenstein: {
    vieName: 'Lít-ten-xơ-tên; Lích-tên- xtanh; Lích-then-xtai-in'
  },
  Lithuania: {
    vieName: 'Litva'
  },
  Luxembourg: {
    vieName: 'Lúc-xăm-bua'
  },
  Macau: {
    vieName: 'Macau'
  },
  Madagascar: {
    vieName: 'Ma-đa-gát-xca'
  },
  Malawi: {
    vieName: 'Ma-la-uy'
  },
  Malaysia: {
    vieName: 'Ma-lai-xi-a; Mã Lai'
  },
  Maldives: {
    vieName: 'Man-đi-vơ'
  },
  Mali: {
    vieName: 'Ma-li'
  },
  Malta: {
    vieName: 'Man-ta'
  },
  'Marshall Islands': {
    vieName: 'Quần đảo Marshall; Quần đảo Mác-san'
  },
  Martinique: {
    vieName: 'Martinique'
  },
  Mauritania: {
    vieName: 'Mô-ri-ta-ni'
  },
  Mauritius: {
    vieName: 'Mô-ri-xơ'
  },
  Mayotte: {
    vieName: 'Mayotte'
  },
  Mexico: {
    vieName: 'Mễ Tây Cơ; Mê-hi-cô'
  },
  Micronesia: {
    vieName: 'Micronesia'
  },
  Moldova: {
    vieName: 'Moldova'
  },
  Monaco: {
    vieName: 'Mô-na-cô'
  },
  Mongolia: {
    vieName: 'Mông Cổ'
  },
  Montenegro: {
    vieName: 'Môn-tê-nê-grô'
  },
  Montserrat: {
    vieName: 'Montserrat'
  },
  Morocco: {
    vieName: 'Ma-rốc'
  },
  Mozambique: {
    vieName: 'Mô-dăm-bích'
  },
  Myanmar: {
    vieName: 'Mi-an-ma'
  },
  Namibia: {
    vieName: 'Nam-mi-bi-a'
  },
  Nauru: {
    vieName: 'Nau-ru'
  },
  Nepal: {
    vieName: 'Nê-pan'
  },
  Netherlands: {
    vieName: 'Hà Lan'
  },
  'New Caledonia': {
    vieName: 'New Caledonia'
  },
  'New Zealand': {
    vieName: 'New Zealand; Niu Di-lân'
  },
  Nicaragua: {
    vieName: 'Ni-ca-ra-goa'
  },
  Niger: {
    vieName: 'Ni-giê'
  },
  Nigeria: {
    vieName: 'Ni-giê-ri-a'
  },
  Niue: {
    vieName: 'Niue'
  },
  'Norfolk Island': {
    vieName: 'Norfolk Island'
  },
  'North Korea': {
    vieName: 'North Korea'
  },
  'North Macedonia': {
    vieName: 'Bắc Macedonia; Bắc Ma-xê-đô-ni-a'
  },
  'Northern Mariana Islands': {
    vieName: 'Northern Mariana Islands'
  },
  Norway: {
    vieName: 'Na Uy'
  },
  Oman: {
    vieName: 'Ô-man'
  },
  Pakistan: {
    vieName: 'Pa-ki-xtan'
  },
  Palau: {
    vieName: 'Pa-lau; Pa-lao'
  },
  Palestine: {
    vieName: 'Palestine'
  },
  Panama: {
    vieName: 'Panama;Pa-na-ma'
  },
  'Papua New Guinea': {
    vieName: 'Papua New Guinea; Pa-pua Niu Ghi-nê'
  },
  Paraguay: {
    vieName: 'Pa-ra-goay'
  },
  Peru: {
    vieName: 'Pê-ru'
  },
  Philippines: {
    vieName: 'Phi-líp-pin'
  },
  'Pitcairn Islands': {
    vieName: 'Pitcairn Islands'
  },
  Poland: {
    vieName: 'Ba Lan'
  },
  Portugal: {
    vieName: 'Bồ Đào Nha'
  },
  'Puerto Rico': {
    vieName: 'Puerto Rico'
  },
  Qatar: {
    vieName: 'Ca-ta'
  },
  'Republic of the Congo': {
    vieName: 'Cộng hòa Congo; Công-gô; Cộng hòa Công-gô'
  },
  Réunion: {
    vieName: 'Réunion'
  },
  Romania: {
    vieName: 'Ru-ma-ni'
  },
  Russia: {
    vieName: 'Russia'
  },
  Rwanda: {
    vieName: 'Ru-an-đa'
  },
  'Saint Barthélemy': {
    vieName: 'Saint Barthélemy'
  },
  'Saint Helena, Ascension and Tristan da Cunha': {
    vieName: 'Saint Helena, Ascension and Tristan da Cunha'
  },
  'Saint Kitts and Nevis': {
    vieName: 'Saint Kitts và Nevis'
  },
  'Saint Lucia': {
    vieName: 'Saint Lucia'
  },
  'Saint Martin': {
    vieName: 'Saint Martin'
  },
  'Saint Pierre and Miquelon': {
    vieName: 'Saint Pierre and Miquelon'
  },
  'Saint Vincent and the Grenadines': {
    vieName: 'Saint Vincent và Grenadines'
  },
  Samoa: {
    vieName: 'Xa-moa'
  },
  'San Marino': {
    vieName: 'San Marino; Xan Ma-ri-nô'
  },
  'São Tomé and Príncipe': {
    vieName: 'São Tomé và Príncipe'
  },
  'Saudi Arabia': {
    vieName: 'Ả Rập Xê Út'
  },
  Senegal: {
    vieName: 'Xê-nê-gan'
  },
  Serbia: {
    vieName: 'Xéc-bi'
  },
  Seychelles: {
    vieName: 'Xây-sen'
  },
  'Sierra Leone': {
    vieName: 'Sierra Leone; Xi-ê-ra Lê-ôn'
  },
  Singapore: {
    vieName: 'Xin-ga-po'
  },
  'Sint Maarten': {
    vieName: 'Sint Maarten'
  },
  Slovakia: {
    vieName: 'Xlô-va-kia'
  },
  Slovenia: {
    vieName: 'Xlô-vê-nia'
  },
  'Solomon Islands': {
    vieName: 'Quần đảo Sô-lô-môn'
  },
  Somalia: {
    vieName: 'Xô-ma-li'
  },
  'South Africa': {
    vieName: 'Cộng hòa Nam Phi'
  },
  'South Georgia': {
    vieName: 'South Georgia'
  },
  'South Korea': {
    vieName: 'South Korea'
  },
  'South Sudan': {
    vieName: 'Nam Sudan; Nam Xu Đăng'
  },
  Spain: {
    vieName: 'Tây Ban Nha'
  },
  'Sri Lanka': {
    vieName: 'Sri Lanca; Xri Lan-ca'
  },
  Sudan: {
    vieName: 'Xu Đăng'
  },
  Suriname: {
    vieName: 'Xu-ri-nam'
  },
  'Svalbard and Jan Mayen': {
    vieName: 'Svalbard and Jan Mayen'
  },
  Sweden: {
    vieName: 'Thụy Điển'
  },
  Switzerland: {
    vieName: 'Thụy Sỹ'
  },
  Syria: {
    vieName: 'Syria'
  },
  Taiwan: {
    vieName: 'Đài Loan'
  },
  Tajikistan: {
    vieName: 'Ta-di-ki-xtan'
  },
  Tanzania: {
    vieName: 'Tanzania'
  },
  Thailand: {
    vieName: 'Thái Lan'
  },
  'Timor-Leste': {
    vieName: 'Đông Ti-mo'
  },
  Togo: {
    vieName: 'Tô-gô'
  },
  Tokelau: {
    vieName: 'Tokelau'
  },
  Tonga: {
    vieName: 'Tôn-ga'
  },
  'Trinidad and Tobago': {
    vieName: 'Trinidad và Tobago'
  },
  Tunisia: {
    vieName: 'Tuy-ni-di'
  },
  Turkey: {
    vieName: 'Thổ Nhĩ Kỳ'
  },
  Turkmenistan: {
    vieName: 'Tuốc-mê-ni-xtan'
  },
  'Turks and Caicos Islands': {
    vieName: 'Turks and Caicos Islands'
  },
  Tuvalu: {
    vieName: 'Tu-va-lu'
  },
  Uganda: {
    vieName: 'U-gan-đa'
  },
  Ukraine: {
    vieName: 'U-crai-na;Uycờrain'
  },
  'United Arab Emirates': {
    vieName: 'Các Tiểu vương quốc Ả Rập Thống nhất'
  },
  'United Kingdom': {
    vieName: 'United Kingdom'
  },
  'United States': {
    vieName: 'United States'
  },
  'United States Minor Outlying Islands': {
    vieName: 'United States Minor Outlying Islands'
  },
  'United States Virgin Islands': {
    vieName: 'United States Virgin Islands'
  },
  Uruguay: {
    vieName: 'U-ru-guay'
  },
  Uzbekistan: {
    vieName: 'U-dơ-bê-ki-xtan'
  },
  Vanuatu: {
    vieName: 'Va-nu-a-tu'
  },
  'Vatican City': {
    vieName: 'Vatican City'
  },
  Venezuela: {
    vieName: 'Venezuela'
  },
  Vietnam: {
    vieName: 'Việt Nam; Cộng hòa Xã hội Chủ nghĩa Việt Nam'
  },
  'Wallis and Futuna': {
    vieName: 'Wallis and Futuna'
  },
  'Western Sahara': {
    vieName: 'Western Sahara'
  },
  Yemen: {
    vieName: 'Y-ê-men'
  },
  Zambia: {
    vieName: 'Dăm-bi-a'
  },
  Zimbabwe: {
    vieName: 'Dim-ba-bu-ê'
  }
}

console.log('🔍 Collecting information of countries...')
fetch('https://restcountries.com/v3.1/all')
  .then(res => res.json())
  .then(data => {
    const countries = []

    data.forEach(c => {
      const { vieName = c.name.common, ...more } = moreInfos[c.name.common] || {}

      const country = {
        area: c.area,
        borders: c.borders,
        capital: c.capital?.[0] || 'Unknown',
        car: c.car,
        cca2: c.cca2,
        cca3: c.cca3,
        code: c.cca2,
        cioc: c.cioc,
        coatOfArms: c.coatOfArms.svg || c.coatOfArms.png,
        continents: c.continents,
        currencies: Object.entries(c.currencies || {}).map(([code, value]) => ({
          code,
          name: value.name,
          symbol: value.symbol
        })),
        fifaCode: c.fifa,
        flag: c.flags.svg || c.flags.png,
        flagSymbol: c.flag,
        googleMap: c.maps.googleMaps,
        idd: c.idd,
        independent: c.independent,
        languages: Object.entries(c.languages || {}).map(([code, name]) => ({ code, name })),
        latlng: c.latlng,
        name: { ...c.name, vieName },
        population: c.population,
        region: c.region,
        startOfWeek: c.startOfWeek,
        subregion: c.subregion,
        timezones: c.timezones,
        tld: c.tld,
        unMember: c.unMember,
        wiki: `https://wikipedia.org/wiki/${c.name.common}`,
        ...more
      }

      countries.push(country)
    })

    countries.sort((a, b) => a.name.common.localeCompare(b.name.common))

    fs.writeFile(
      path.resolve(__dirname, '../public/data/countries.json'),
      JSON.stringify(countries, null, 2),
      error => {
        error ? console.error('Write file error: ', error) : console.log('✅ Collect success information of countries')
      }
    )

    /*
      // Crawl factbook from https://www.cia.gov/the-world-factbook
      const countryNames = countries.map((c) => c.name.common.toLowerCase().replace(/ /g, '-'))
      countryNames.forEach((name) => {
        fetch(`https://www.cia.gov/the-world-factbook/countries/${name}/summaries`)
          .then((res) => res.text())
          .then((doc) => {
            const htmlDoc = cheerio.load(doc)('.content-area-content.article-content')

            if (htmlDoc.length) {
              fs.writeFile(path.resolve(__dirname, `../public/data/factbooks/${name}.html`), htmlDoc.html(), (error) => {
                error ? console.error('Write file error: ', error) : console.log(`✅ Collect success factbook of ${name}`)
              })
            }
          })
      })
    */
  })
