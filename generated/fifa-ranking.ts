// https://inside.fifa.com/fifa-world-ranking/men

/*
result = {}
$0.querySelectorAll('tr').forEach((row, index) => {
  const cols = row.querySelectorAll('td')
  const name = cols[1]?.textContent.trim()
  const cca3 = name?.slice(-3)
  if(cca3) result[cca3] = [index + 1, Number(cols[2].textContent.trim()), name?.slice(0, name.length - 3)]
})
console.log(result)
*/

export const fifaMenRanking = {
  ARG: [1, 1860.14, 'Argentina'],
  FRA: [2, 1837.47, 'France'],
  BEL: [3, 1797.98, 'Belgium'],
  BRA: [4, 1791.85, 'Brazil'],
  ENG: [5, 1787.88, 'England'],
  POR: [6, 1747.04, 'Portugal'],
  NED: [7, 1746.66, 'Netherlands'],
  ESP: [8, 1729.92, 'Spain'],
  CRO: [9, 1728.3, 'Croatia'],
  ITA: [10, 1724.37, 'Italy'],
  USA: [11, 1676.52, 'USA'],
  MAR: [12, 1669.44, 'Morocco'],
  COL: [13, 1669.44, 'Colombia'],
  URU: [14, 1663.44, 'Uruguay'],
  MEX: [15, 1652.33, 'Mexico'],
  GER: [16, 1646.78, 'Germany'],
  JPN: [17, 1628.81, 'Japan'],
  SEN: [18, 1623.34, 'Senegal'],
  SUI: [19, 1617.24, 'Switzerland'],
  IRN: [20, 1611.16, 'IR Iran'],
  DEN: [21, 1610.76, 'Denmark'],
  KOR: [22, 1572.87, 'Korea Republic'],
  AUS: [23, 1571.29, 'Australia'],
  UKR: [24, 1565.37, 'Ukraine'],
  AUT: [25, 1560.03, 'Austria'],
  POL: [26, 1541.49, 'Poland'],
  HUN: [27, 1529, 'Hungary'],
  SWE: [28, 1522.19, 'Sweden'],
  WAL: [29, 1521.4, 'Wales'],
  ECU: [30, 1517.54, 'Ecuador'],
  PER: [31, 1515.01, 'Peru'],
  SRB: [32, 1514.76, 'Serbia'],
  RUS: [33, 1506.58, 'Russia'],
  CZE: [34, 1506.23, 'Czechia'],
  QAT: [35, 1504.06, 'Qatar'],
  EGY: [36, 1502.34, 'Egypt'],
  CIV: [37, 1499.69, "Côte d'Ivoire"],
  NGA: [38, 1498.93, 'Nigeria'],
  SCO: [39, 1497.18, 'Scotland'],
  CHI: [40, 1496.13, 'Chile'],
  TUN: [41, 1494.06, 'Tunisia'],
  TUR: [42, 1493.38, 'Türkiye'],
  PAN: [43, 1482.1, 'Panama'],
  ALG: [44, 1474.13, 'Algeria'],
  SVK: [45, 1467.77, 'Slovakia'],
  NOR: [46, 1466.48, 'Norway'],
  ROU: [47, 1462.35, 'Romania'],
  CAN: [48, 1461.74, 'Canada'],
  CMR: [49, 1458.47, 'Cameroon'],
  MLI: [50, 1456.74, 'Mali'],
  GRE: [51, 1455.95, 'Greece'],
  CRC: [52, 1454.2, 'Costa Rica'],
  JAM: [53, 1442.82, 'Jamaica'],
  VEN: [54, 1442.29, 'Venezuela'],
  IRQ: [55, 1433.07, 'Iraq'],
  KSA: [56, 1431.3, 'Saudi Arabia'],
  SVN: [57, 1429.74, 'Slovenia'],
  PAR: [58, 1427.11, 'Paraguay'],
  RSA: [59, 1416.66, 'South Africa'],
  IRL: [60, 1403.84, 'Republic of Ireland'],
  COD: [61, 1400.93, 'Congo DR'],
  UZB: [62, 1397.41, 'Uzbekistan'],
  FIN: [63, 1393.4, 'Finland'],
  GHA: [64, 1381.25, 'Ghana'],
  CPV: [65, 1380.53, 'Cabo Verde'],
  ALB: [66, 1379.4, 'Albania'],
  BFA: [67, 1375.16, 'Burkina Faso'],
  JOR: [68, 1374.13, 'Jordan'],
  UAE: [69, 1368.84, 'United Arab Emirates'],
  ISL: [70, 1353.48, 'Iceland'],
  MKD: [71, 1348.63, 'North Macedonia'],
  MNE: [72, 1345.02, 'Montenegro'],
  NIR: [73, 1341.33, 'Northern Ireland'],
  GEO: [74, 1338.91, 'Georgia'],
  BIH: [75, 1332.3, 'Bosnia and Herzegovina'],
  OMA: [76, 1326.18, 'Oman'],
  GUI: [77, 1324.8, 'Guinea'],
  HON: [78, 1313.05, 'Honduras'],
  ISR: [79, 1312.54, 'Israel'],
  SLV: [80, 1303.65, 'El Salvador'],
  BHR: [81, 1302.86, 'Bahrain'],
  BUL: [82, 1295.5, 'Bulgaria'],
  GAB: [83, 1288.45, 'Gabon'],
  BOL: [84, 1282.43, 'Bolivia'],
  LUX: [85, 1276.73, 'Luxembourg'],
  HAI: [86, 1274.46, 'Haiti'],
  CUW: [87, 1272.71, 'Curaçao'],
  CHN: [88, 1267.51, 'China PR'],
  EQG: [89, 1260.5, 'Equatorial Guinea'],
  ZAM: [90, 1258.4, 'Zambia'],
  BEN: [91, 1254.18, 'Benin'],
  ANG: [92, 1248.94, 'Angola'],
  SYR: [93, 1246.68, 'Syria'],
  UGA: [94, 1242.96, 'Uganda'],
  PLE: [95, 1231.25, 'Palestine'],
  ARM: [96, 1230.79, 'Armenia'],
  NAM: [97, 1219.83, 'Namibia'],
  BLR: [98, 1219.78, 'Belarus'],
  TRI: [99, 1219.44, 'Trinidad and Tobago'],
  THA: [100, 1218.56, 'Thailand'],
  KGZ: [101, 1213.58, 'Kyrgyz Republic'],
  TJK: [102, 1212.41, 'Tajikistan'],
  MOZ: [103, 1205.82, 'Mozambique'],
  MAD: [104, 1203.66, 'Madagascar'],
  KOS: [105, 1203.16, 'Kosovo'],
  GUA: [106, 1199.21, 'Guatemala'],
  NZL: [107, 1197.68, 'Aotearoa New Zealand'],
  KEN: [108, 1195.45, 'Kenya'],
  KAZ: [109, 1193.62, 'Kazakhstan'],
  PRK: [110, 1183.96, 'Korea DPR'],
  AZE: [111, 1179.88, 'Azerbaijan'],
  MTN: [112, 1177.5, 'Mauritania'],
  CGO: [113, 1176.45, 'Congo'],
  TAN: [114, 1174.99, 'Tanzania'],
  GNB: [115, 1168.49, 'Guinea-Bissau'],
  VIE: [116, 1168.02, 'Vietnam'],
  LBN: [117, 1167.64, 'Lebanon'],
  LBY: [118, 1165.73, 'Libya'],
  COM: [119, 1158.71, 'Comoros'],
  TOG: [120, 1158.7, 'Togo'],
  SDN: [121, 1152.29, 'Sudan'],
  SLE: [122, 1149.4, 'Sierra Leone'],
  EST: [123, 1146.47, 'Estonia'],
  IND: [124, 1139.39, 'India'],
  MWI: [125, 1137.83, 'Malawi'],
  CYP: [126, 1136.78, 'Cyprus'],
  CTA: [127, 1129.3, 'Central African Republic'],
  NIG: [128, 1125.5, 'Niger'],
  ZIM: [129, 1122.54, 'Zimbabwe'],
  NCA: [130, 1119.88, 'Nicaragua'],
  RWA: [131, 1114.15, 'Rwanda'],
  GAM: [132, 1112.55, 'The Gambia'],
  SOL: [133, 1111.02, 'Solomon Islands'],
  IDN: [134, 1108.73, 'Indonesia'],
  MAS: [135, 1107.58, 'Malaysia'],
  LTU: [136, 1100.66, 'Lithuania'],
  KUW: [137, 1098.42, 'Kuwait'],
  LVA: [138, 1095.98, 'Latvia'],
  FRO: [139, 1093.7, 'Faroe Islands'],
  BDI: [140, 1091.24, 'Burundi'],
  SUR: [141, 1087.77, 'Suriname'],
  LBR: [142, 1067.05, 'Liberia'],
  ETH: [143, 1066.16, 'Ethiopia'],
  TKM: [144, 1065.42, 'Turkmenistan'],
  BOT: [145, 1064.19, 'Botswana'],
  SKN: [146, 1059.53, 'St Kitts and Nevis'],
  PHI: [147, 1053.03, 'Philippines'],
  ATG: [148, 1052.8, 'Antigua and Barbuda'],
  LES: [149, 1050.83, 'Lesotho'],
  DOM: [150, 1045.64, 'Dominican Republic'],
  AFG: [151, 1034.37, 'Afghanistan'],
  MDA: [152, 1033.75, 'Moldova'],
  GUY: [153, 1026.61, 'Guyana'],
  SWZ: [154, 1025.18, 'Eswatini'],
  YEM: [155, 1021.24, 'Yemen'],
  PUR: [156, 1020.22, 'Puerto Rico'],
  HKG: [157, 1011.91, 'Hong Kong, China'],
  NCL: [158, 1008.92, 'New Caledonia'],
  SGP: [159, 1008.26, 'Singapore'],
  MDV: [160, 1003.48, 'Maldives'],
  TAH: [161, 999.48, 'Tahiti'],
  AND: [162, 996.05, 'Andorra'],
  TPE: [163, 991.34, 'Chinese Taipei'],
  MYA: [164, 988.98, 'Myanmar'],
  PNG: [165, 985.32, 'Papua New Guinea'],
  FIJ: [166, 983.81, 'Fiji'],
  SSD: [167, 980.02, 'South Sudan'],
  LCA: [168, 979.57, 'St Lucia'],
  CUB: [169, 975.01, 'Cuba'],
  VAN: [170, 972.14, 'Vanuatu'],
  BER: [171, 971.15, 'Bermuda'],
  MLT: [172, 970.62, 'Malta'],
  GRN: [173, 953.67, 'Grenada'],
  VIN: [174, 938.4, 'St Vincent and the Grenadines'],
  NEP: [175, 935.93, 'Nepal'],
  MSR: [176, 934.46, 'Montserrat'],
  BRB: [177, 932.64, 'Barbados'],
  CHA: [178, 929.97, 'Chad'],
  MRI: [179, 927.94, 'Mauritius'],
  CAM: [180, 924.52, 'Cambodia'],
  SAM: [181, 920.54, 'Samoa'],
  DMA: [182, 912.93, 'Dominica'],
  BHU: [183, 904.1, 'Bhutan'],
  BLZ: [184, 901.43, 'Belize'],
  BAN: [185, 896.67, 'Bangladesh'],
  MAC: [186, 896.62, 'Macau'],
  COK: [187, 896.59, 'Cook Islands'],
  ASA: [188, 890.97, 'American Samoa'],
  LAO: [189, 889.62, 'Laos'],
  MNG: [190, 884.92, 'Mongolia'],
  BRU: [191, 881.73, 'Brunei Darussalam'],
  STP: [192, 878.09, 'São Tomé and Príncipe'],
  DJI: [193, 875.13, 'Djibouti'],
  ARU: [194, 873.9, 'Aruba'],
  CAY: [195, 865.34, 'Cayman Islands'],
  TLS: [196, 843.4, 'Timor-Leste'],
  PAK: [197, 842.59, 'Pakistan'],
  GIB: [198, 836.14, 'Gibraltar'],
  LIE: [199, 835.83, 'Liechtenstein'],
  TGA: [200, 833.12, 'Tonga'],
  SEY: [201, 831.96, 'Seychelles'],
  SOM: [202, 829.81, 'Somalia'],
  BAH: [203, 823.58, 'Bahamas'],
  GUM: [204, 821.91, 'Guam'],
  SRI: [205, 820.32, 'Sri Lanka'],
  TCA: [206, 817.03, 'Turks and Caicos Islands'],
  VGB: [207, 801.29, 'British Virgin Islands'],
  VIR: [208, 797.29, 'US Virgin Islands'],
  AIA: [209, 779.86, 'Anguilla'],
  SMR: [210, 739.64, 'San Marino']
}
