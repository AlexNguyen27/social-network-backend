//getData.js
const fs = require('fs');

const getTrieuChung = async filePath => {
  try {
    const data = await fs.promises.readFile('./test.txt', 'utf8')
    return data.split('***');
  }
  catch(err) {
    console.log(err)
  }
}

const test = async () => {
  const x = await getTrieuChung();
  console.log(x);
  console.log('here')
}

test();
