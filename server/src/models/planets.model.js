const fs = require('fs');
const parse = require('csv-parse');

const habitablePlanets = [];
const filePath = '../../data/kepler_data.csv';

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}

fs.createReadStream(filePath)
  .pipe(parse({
    comment: '#',
    columns: true,
  }))
  .on('data', (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.error(`[Error] : ${err}`);
  })
  .on('end', () => {
    console.log(habitablePlanets.map((planet) => planet.kepler_name));
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });

module.exports = {
  planets: habitablePlanets,
}
