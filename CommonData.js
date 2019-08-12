exports.getValue = (array, key) => {
  return array.filter((o) => o.key === key)[0].value
}
  
exports.languages = [
  {key: '01', value: 'English'},
  {key: '02', value: 'Malay'},
  {key: '03', value: 'Mandarine'},
  {key: '04', value: 'Cantonese'},
  {key: '05', value: 'Japanese'},
  {key: '06', value: 'Korean'},

];