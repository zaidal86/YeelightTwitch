const CouleurCode = require('./colors.json');

function RGB(test){
    const NumberRGB = test.split(',').slice(0, 3);
    return NumberRGB;
}

function hasNumber(myString) {
  return /\d/.test(myString);
}

function couleur(message){
   switch (message) {
    case 'red':
      return RGB(CouleurCode.red);
    case 'yellow':
      return RGB(CouleurCode.yellow);
    case 'blue':
      return RGB(CouleurCode.blue);
    case 'orange':
      return RGB(CouleurCode.orange);
    case 'brown':
      return RGB(CouleurCode.brown);
    case 'green':
      return RGB(CouleurCode.green);
    case 'purple':
      return RGB(CouleurCode.purple);
    case 'pink':
      return RGB(CouleurCode.pink);
    default:
      return 'e';
  }
}

module.exports = {couleur, hasNumber, RGB};