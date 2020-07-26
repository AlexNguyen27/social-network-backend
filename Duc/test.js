const axios = require('axios');
const qs = require('querystring');

// const word = 'khó nhọc';
const test = async (word)=>  {
  console.log(word)
  const res = await axios.get(`https://noitu.xyz/answer?${qs.stringify({word})}`);
  console.log(res.data);
  return res.data;
}

const test2 = async () => {
  const x = await test('khó nhọc');
  console.log(x);
  console.log('rererer')
  // return x;
}
// console.log(test2);
test2();
// console.log('rer')
