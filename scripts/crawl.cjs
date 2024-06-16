/* eslint-disable */

// Resources
// REST Countries: https://restcountries.com
// Factbook: https://www.cia.gov/the-world-factbook

const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

const moreInfos = {
  Afghanistan: {
    vieName: 'Afghanistan; Áp-ga-ni-xtan'
  },
  'Åland Islands': {
    vieName: 'Åland Islands'
  },
  Albania: {
    vieName: 'Albania; An-ba-ni'
  },
  Algeria: {
    vieName: 'Algeria; An-giê-ri'
  },
  'American Samoa': {
    vieName: 'American Samoa'
  },
  Andorra: {
    vieName: 'Andorra'
  },
  Angola: {
    vieName: 'Angola; Ăng-gô-la'
  },
  Anguilla: {
    vieName: 'Anguilla'
  },
  Antarctica: {
    vieName: 'Antarctica'
  },
  'Antigua and Barbuda': {
    vieName: 'Antigua và Barbuda; An-ti-gua và Bác-bu-đa'
  },
  Argentina: {
    vieName: 'Argentina; Ác-hen-ti-na'
  },
  Armenia: {
    vieName: 'Armenia; Ác-mê-ni-a'
  },
  Aruba: {
    vieName: 'Aruba'
  },
  Australia: {
    vieName: 'Úc; Australia; Ô-xtrây-li-a'
  },
  Austria: {
    vieName: 'Áo'
  },
  Azerbaijan: {
    vieName: 'Azerbaijan; A-déc-bai-dan'
  },
  Bahamas: {
    vieName: 'Bahamas; Ba-ha-mát'
  },
  Bahrain: {
    vieName: 'Bahrain; Ba-ranh'
  },
  Bangladesh: {
    vieName: 'Bangladesh; Băng-la-đét'
  },
  Barbados: {
    vieName: 'Barbados; Bác-ba-đốt'
  },
  Belarus: {
    vieName: 'Belarus; Bê-la-rút'
  },
  Belgium: {
    vieName: 'Bỉ'
  },
  Belize: {
    vieName: 'Belize; Bê-li-xê'
  },
  Benin: {
    vieName: 'Benin; Bê-nanh'
  },
  Bermuda: {
    vieName: 'Bermuda'
  },
  Bhutan: {
    vieName: 'Bhutan; Bu-tan'
  },
  Bolivia: {
    vieName: 'Bolivia; Bô-li-vi-a'
  },
  'Bosnia and Herzegovina': {
    vieName: 'Bosnia và Herzegovina; Bô-xnia Héc-dê-gô-vi-na'
  },
  Botswana: {
    vieName: 'Botswana; Bốt-xoa-na'
  },
  'Bouvet Island': {
    vieName: 'Bouvet Island'
  },
  Brazil: {
    vieName: 'Brazil; Bra-xin'
  },
  'British Indian Ocean Territory': {
    vieName: 'British Indian Ocean Territory'
  },
  'British Virgin Islands': {
    vieName: 'British Virgin Islands'
  },
  Brunei: {
    vieName: 'Brunei'
  },
  Bulgaria: {
    vieName: 'Bulgaria; Bun-ga-ri'
  },
  'Burkina Faso': {
    vieName: 'Burkina Faso; Buốc-ki-na Pha-xô'
  },
  Burundi: {
    vieName: 'Burundi; Bu-run-đi'
  },
  Cambodia: {
    vieName: 'Campuchia; Cam-pu-chia'
  },
  Cameroon: {
    vieName: 'Cameroon; Ca-mơ-run'
  },
  Canada: {
    vieName: 'Canada; Ca-na-đa'
  },
  'Cape Verde': {
    vieName: 'Cape Verde'
  },
  'Caribbean Netherlands': {
    vieName: 'Caribbean Netherlands'
  },
  'Cayman Islands': {
    vieName: 'Cayman Islands'
  },
  'Central African Republic': {
    vieName: 'Cộng hòa Trung Phi'
  },
  Chad: {
    vieName: 'Chad; Sát'
  },
  Chile: {
    vieName: 'Chile; Chi-lê'
  },
  China: {
    vieName: 'Trung Quốc; Trung Hoa'
  },
  'Christmas Island': {
    vieName: 'Christmas Island'
  },
  'Cocos (Keeling) Islands': {
    vieName: 'Cocos (Keeling) Islands'
  },
  Colombia: {
    vieName: 'Colombia; Cô-lôm-bi-a'
  },
  Comoros: {
    vieName: 'Comoros; Cô-mo'
  },
  'Cook Islands': {
    vieName: 'Cook Islands'
  },
  'Costa Rica': {
    vieName: 'Costa Rica; Cô-xta Ri-ca'
  },
  Croatia: {
    vieName: 'Croatia; Crô-a-ti-a'
  },
  Cuba: {
    vieName: 'Cuba; Cu-ba'
  },
  Curaçao: {
    vieName: 'Curaçao'
  },
  Cyprus: {
    vieName: 'Síp; Cộng hòa Síp'
  },
  Czechia: {
    vieName: 'Czechia'
  },
  Denmark: {
    vieName: 'Đan Mạch'
  },
  Djibouti: {
    vieName: 'Djibouti; Gi-bu-ti'
  },
  Dominica: {
    vieName: 'Dominica; Đô-mi-ni-ca-na'
  },
  'Dominican Republic': {
    vieName: 'Cộng hòa Dominican; Cộng hòa  Đô-mi-ni-ca-na'
  },
  'DR Congo': {
    vieName: 'DR Congo'
  },
  Ecuador: {
    vieName: 'Ecuador; Ê-cu-a-đo'
  },
  Egypt: {
    vieName: 'Ai Cập'
  },
  'El Salvador': {
    vieName: 'El Salvador; En Xan-va-đo'
  },
  'Equatorial Guinea': {
    vieName: 'Guinea Xích đạo; Ghi-xê Xích đạo'
  },
  Eritrea: {
    vieName: 'Eritrea; Ê-ri-tơ-rê-a'
  },
  Estonia: {
    vieName: 'Estonia; E-xtô-ni-a'
  },
  Eswatini: {
    vieName: 'Eswatini'
  },
  Ethiopia: {
    vieName: 'Ethiopia; Ê-ti-ô-pi-a'
  },
  'Falkland Islands': {
    vieName: 'Falkland Islands'
  },
  'Faroe Islands': {
    vieName: 'Faroe Islands'
  },
  Fiji: {
    vieName: 'Fiji; Phi-gi'
  },
  Finland: {
    vieName: 'Phần Lan'
  },
  France: {
    vieName: 'Pháp'
  },
  'French Guiana': {
    vieName: 'French Guiana'
  },
  'French Polynesia': {
    vieName: 'French Polynesia'
  },
  'French Southern and Antarctic Lands': {
    vieName: 'French Southern and Antarctic Lands'
  },
  Gabon: {
    vieName: 'Gabon; Ga-bông'
  },
  Gambia: {
    vieName: 'Gambia'
  },
  Georgia: {
    vieName: 'Gruzia; Giê-oóc-gi-a; Georgia (ít phổ biến)'
  },
  Germany: {
    vieName: 'Đức'
  },
  Ghana: {
    vieName: 'Ghana; Gha-na'
  },
  Gibraltar: {
    vieName: 'Gibraltar'
  },
  Greece: {
    vieName: 'Hy Lạp'
  },
  Greenland: {
    vieName: 'Greenland'
  },
  Grenada: {
    vieName: 'Grenada; Grê-na-đa'
  },
  Guadeloupe: {
    vieName: 'Guadeloupe'
  },
  Guam: {
    vieName: 'Guam'
  },
  Guatemala: {
    vieName: 'Guatemala; Goa-tê-ma-la'
  },
  Guernsey: {
    vieName: 'Guernsey'
  },
  Guinea: {
    vieName: 'Guinea; Ghi-nê'
  },
  'Guinea-Bissau': {
    vieName: 'Guinea-Bissau; Ghi-nê Bít-xao'
  },
  Guyana: {
    vieName: 'Guyana; Guy-a-na'
  },
  Haiti: {
    vieName: 'Haiti; Ha-i-ti'
  },
  'Heard Island and McDonald Islands': {
    vieName: 'Heard Island and McDonald Islands'
  },
  Honduras: {
    vieName: 'Honduras; Hôn-đu-rát'
  },
  'Hong Kong': {
    vieName: 'Hong Kong'
  },
  Hungary: {
    vieName: 'Hungary; Hung-ga-ri'
  },
  Iceland: {
    vieName: 'Iceland; Ai-xơ-len'
  },
  India: {
    vieName: 'Ấn Độ'
  },
  Indonesia: {
    vieName: 'Indonesia; In-đô-nê-si-a'
  },
  Iran: {
    vieName: 'Iran'
  },
  Iraq: {
    vieName: 'Iraq; I-rắc'
  },
  Ireland: {
    vieName: 'Ireland; Ai-len'
  },
  'Isle of Man': {
    vieName: 'Isle of Man'
  },
  Israel: {
    vieName: 'Israel; I-xra-en'
  },
  Italy: {
    vieName: 'Italy; Italia; Ý'
  },
  'Ivory Coast': {
    vieName: 'Ivory Coast'
  },
  Jamaica: {
    vieName: 'Jamaica; Gia-mai-ca'
  },
  Japan: {
    vieName: 'Nhật Bản; Nhật'
  },
  Jersey: {
    vieName: 'Jersey'
  },
  Jordan: {
    vieName: 'Jordan; Gioóc-đa-ni'
  },
  Kazakhstan: {
    vieName: 'Kazakhstan; Ca-dắc-xtan'
  },
  Kenya: {
    vieName: 'Kenya; Kê-ni-a'
  },
  Kiribati: {
    vieName: 'Kiribati; Ki-ri-ba-ti'
  },
  Kosovo: {
    vieName: 'Kosovo'
  },
  Kuwait: {
    vieName: 'Kuwait; Cô-oét'
  },
  Kyrgyzstan: {
    vieName: 'Kyrgyzstan; Cư-rơ-gư-dơ-xtan'
  },
  Laos: {
    vieName: 'Laos'
  },
  Latvia: {
    vieName: 'Latvia; Lát-vi-a'
  },
  Lebanon: {
    vieName: 'Liban; Lebanon; Li Băng'
  },
  Lesotho: {
    vieName: 'Lesotho; Lê-xô-thô'
  },
  Liberia: {
    vieName: 'Liberia; Li-bê-ri-a'
  },
  Libya: {
    vieName: 'Libya; Libi'
  },
  Liechtenstein: {
    vieName: 'Liechtenstein; Lít-ten-xơ-tên; Lích-tên- xtanh; Lích-then-xtai-in'
  },
  Lithuania: {
    vieName: 'Litva'
  },
  Luxembourg: {
    vieName: 'Luxembourg; Lúc-xăm-bua'
  },
  Macau: {
    vieName: 'Macau'
  },
  Madagascar: {
    vieName: 'Madagascar; Ma-đa-gát-xca'
  },
  Malawi: {
    vieName: 'Malawi; Ma-la-uy'
  },
  Malaysia: {
    vieName: 'Malaysia; Ma-lai-xi-a; Mã Lai'
  },
  Maldives: {
    vieName: 'Maldives; Man-đi-vơ'
  },
  Mali: {
    vieName: 'Mali; Ma-li'
  },
  Malta: {
    vieName: 'Malta; Man-ta'
  },
  'Marshall Islands': {
    vieName: 'Quần đảo Marshall; Quần đảo Mác-san'
  },
  Martinique: {
    vieName: 'Martinique'
  },
  Mauritania: {
    vieName: 'Mauritania; Mô-ri-ta-ni'
  },
  Mauritius: {
    vieName: 'Mauritius; Mô-ri-xơ'
  },
  Mayotte: {
    vieName: 'Mayotte'
  },
  Mexico: {
    vieName: 'Mexico; Mễ Tây Cơ; Mê-hi-cô'
  },
  Micronesia: {
    vieName: 'Micronesia'
  },
  Moldova: {
    vieName: 'Moldova'
  },
  Monaco: {
    vieName: 'Monaco; Mô-na-cô'
  },
  Mongolia: {
    vieName: 'Mông Cổ'
  },
  Montenegro: {
    vieName: 'Montenegro; Môn-tê-nê-grô'
  },
  Montserrat: {
    vieName: 'Montserrat'
  },
  Morocco: {
    vieName: 'Morocco; Maroc; Ma-rốc'
  },
  Mozambique: {
    vieName: 'Mozambique; Mô-dăm-bích'
  },
  Myanmar: {
    vieName: 'Myanmar; Myanma; Mi-an-ma'
  },
  Namibia: {
    vieName: 'Namibia; Nam-mi-bi-a'
  },
  Nauru: {
    vieName: 'Nauru; Nau-ru'
  },
  Nepal: {
    vieName: 'Nepal; Nê-pan'
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
    vieName: 'Nicaragua; Ni-ca-ra-goa'
  },
  Niger: {
    vieName: 'Niger; Ni-giê'
  },
  Nigeria: {
    vieName: 'Nigeria; Ni-giê-ri-a'
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
    vieName: 'Nauy; Na Uy'
  },
  Oman: {
    vieName: 'Oman; Ô-man'
  },
  Pakistan: {
    vieName: 'Pakistan; Pa-ki-xtan'
  },
  Palau: {
    vieName: 'Palau; Pa-lau; Pa-lao'
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
    vieName: 'Paraguay; Pa-ra-goay'
  },
  Peru: {
    vieName: 'Peru; Pê-ru'
  },
  Philippines: {
    vieName: 'Philippines; Phi-líp-pin'
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
    vieName: 'Qatar; Ca-ta'
  },
  'Republic of the Congo': {
    vieName: 'Cộng hòa Congo; Công-gô; Cộng hòa Công-gô'
  },
  Réunion: {
    vieName: 'Réunion'
  },
  Romania: {
    vieName: 'Romania; Ru-ma-ni'
  },
  Russia: {
    vieName: 'Russia'
  },
  Rwanda: {
    vieName: 'Rwanda; Ru-an-đa'
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
    vieName: 'Samoa; Xa-moa'
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
    vieName: 'Senegal; Xê-nê-gan'
  },
  Serbia: {
    vieName: 'Serbia; Xéc-bi'
  },
  Seychelles: {
    vieName: 'Seychelles; Xây-sen'
  },
  'Sierra Leone': {
    vieName: 'Sierra Leone; Xi-ê-ra Lê-ôn'
  },
  Singapore: {
    vieName: 'Singapore; Xin-ga-po'
  },
  'Sint Maarten': {
    vieName: 'Sint Maarten'
  },
  Slovakia: {
    vieName: 'Slovakia; Xlô-va-kia'
  },
  Slovenia: {
    vieName: 'Slovenia; Xlô-vê-nia'
  },
  'Solomon Islands': {
    vieName: 'Quần đảo Sô-lô-môn'
  },
  Somalia: {
    vieName: 'Somalia; Xô-ma-li'
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
    vieName: 'Sudan; Xu Đăng'
  },
  Suriname: {
    vieName: 'Surinam; Xu-ri-nam'
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
    vieName: 'Taiwan'
  },
  Tajikistan: {
    vieName: 'Tajikistan; Ta-di-ki-xtan'
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
    vieName: 'Togo; Tô-gô'
  },
  Tokelau: {
    vieName: 'Tokelau'
  },
  Tonga: {
    vieName: 'Tonga; Tôn-ga'
  },
  'Trinidad and Tobago': {
    vieName: 'Trinidad và Tobago'
  },
  Tunisia: {
    vieName: 'Tunisia; Tuy-ni-di'
  },
  Turkey: {
    vieName: 'Thổ Nhĩ Kỳ'
  },
  Turkmenistan: {
    vieName: 'Turkmenistan; Tuốc-mê-ni-xtan'
  },
  'Turks and Caicos Islands': {
    vieName: 'Turks and Caicos Islands'
  },
  Tuvalu: {
    vieName: 'Tuvalu; Tu-va-lu'
  },
  Uganda: {
    vieName: 'Uganda; U-gan-đa'
  },
  Ukraine: {
    vieName: 'Ukraina; U-crai-na;Uycờrain'
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
    vieName: 'Uruguay; U-ru-guay'
  },
  Uzbekistan: {
    vieName: 'Uzbekistan; U-dơ-bê-ki-xtan'
  },
  Vanuatu: {
    vieName: 'Vanuatu; Va-nu-a-tu'
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
    vieName: 'Yemen; Y-ê-men'
  },
  Zambia: {
    vieName: 'Zambia; Dăm-bi-a'
  },
  Zimbabwe: {
    vieName: 'Zimbabwe; Dim-ba-bu-ê'
  }
}

fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    console.log('🔍 Collecting information of countries...')
    const countries = []

    data.forEach((c) => {
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
      (error) => {
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
