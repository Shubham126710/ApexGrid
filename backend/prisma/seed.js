require("dotenv").config();
const prisma = require('../src/prisma/client');

async function main() {
  console.log("Seeding database...");

  // Clear existing
  await prisma.expense.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.component.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.flight.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.race.deleteMany();
  await prisma.circuit.deleteMany();
  await prisma.team.deleteMany();

  // Create Teams
  const redBull = await prisma.team.create({ data: { name: 'Red Bull Racing', nationality: 'Austrian', baseCity: 'Milton Keynes' } });
  const mercedes = await prisma.team.create({ data: { name: 'Mercedes-AMG', nationality: 'German', baseCity: 'Brackley' } });
  const ferrari = await prisma.team.create({ data: { name: 'Scuderia Ferrari', nationality: 'Italian', baseCity: 'Maranello' } });
  const mclaren = await prisma.team.create({ data: { name: 'McLaren', nationality: 'British', baseCity: 'Woking' } });
  const astonMartin = await prisma.team.create({ data: { name: 'Aston Martin', nationality: 'British', baseCity: 'Silverstone' } });
  const alpine = await prisma.team.create({ data: { name: 'Alpine', nationality: 'French', baseCity: 'Enstone' } });
  const williams = await prisma.team.create({ data: { name: 'Williams', nationality: 'British', baseCity: 'Grove' } });
  const vcarb = await prisma.team.create({ data: { name: 'VCARB', nationality: 'Italian', baseCity: 'Faenza' } });
  const haas = await prisma.team.create({ data: { name: 'Haas', nationality: 'American', baseCity: 'Kannapolis' } });
  const audi = await prisma.team.create({ data: { name: 'Audi', nationality: 'German', baseCity: 'Hinwil' } });
  const cadillac = await prisma.team.create({ data: { name: 'Cadillac', nationality: 'American', baseCity: 'Fishers' } });

  // Create Drivers (2026 Rosters)
  await prisma.driver.createMany({
    data: [
      { firstName: 'Max', lastName: 'Verstappen', nationality: 'Dutch', number: 1, teamId: redBull.id },
      { firstName: 'Liam', lastName: 'Lawson', nationality: 'New Zealander', number: 30, teamId: redBull.id },
      
      { firstName: 'George', lastName: 'Russell', nationality: 'British', number: 63, teamId: mercedes.id },
      { firstName: 'Kimi', lastName: 'Antonelli', nationality: 'Italian', number: 12, teamId: mercedes.id },
      
      { firstName: 'Charles', lastName: 'Leclerc', nationality: 'Monegasque', number: 16, teamId: ferrari.id },
      { firstName: 'Lewis', lastName: 'Hamilton', nationality: 'British', number: 44, teamId: ferrari.id },
      
      { firstName: 'Lando', lastName: 'Norris', nationality: 'British', number: 4, teamId: mclaren.id },
      { firstName: 'Oscar', lastName: 'Piastri', nationality: 'Australian', number: 81, teamId: mclaren.id },
      
      { firstName: 'Fernando', lastName: 'Alonso', nationality: 'Spanish', number: 14, teamId: astonMartin.id },
      { firstName: 'Lance', lastName: 'Stroll', nationality: 'Canadian', number: 18, teamId: astonMartin.id },

      { firstName: 'Pierre', lastName: 'Gasly', nationality: 'French', number: 10, teamId: alpine.id },
      { firstName: 'Jack', lastName: 'Doohan', nationality: 'Australian', number: 7, teamId: alpine.id },

      { firstName: 'Alex', lastName: 'Albon', nationality: 'Thai', number: 23, teamId: williams.id },
      { firstName: 'Carlos', lastName: 'Sainz', nationality: 'Spanish', number: 55, teamId: williams.id },

      { firstName: 'Yuki', lastName: 'Tsunoda', nationality: 'Japanese', number: 22, teamId: vcarb.id },
      { firstName: 'Isack', lastName: 'Hadjar', nationality: 'French', number: 20, teamId: vcarb.id },

      { firstName: 'Esteban', lastName: 'Ocon', nationality: 'French', number: 31, teamId: haas.id },
      { firstName: 'Oliver', lastName: 'Bearman', nationality: 'British', number: 87, teamId: haas.id },

      { firstName: 'Nico', lastName: 'Hulkenberg', nationality: 'German', number: 27, teamId: audi.id },
      { firstName: 'Gabriel', lastName: 'Bortoleto', nationality: 'Brazilian', number: 5, teamId: audi.id }
    ]
  });

  // Create Circuits
  const bahrain = await prisma.circuit.create({ data: { name: 'Bahrain International Circuit', country: 'Bahrain', city: 'Sakhir', length: 5.412 } });
  const monaco = await prisma.circuit.create({ data: { name: 'Circuit de Monaco', country: 'Monaco', city: 'Monte Carlo', length: 3.337 } });
  const silverstone = await prisma.circuit.create({ data: { name: 'Silverstone Circuit', country: 'United Kingdom', city: 'Silverstone', length: 5.891 } });
  const monza = await prisma.circuit.create({ data: { name: 'Autodromo Nazionale Monza', country: 'Italy', city: 'Monza', length: 5.793 } });
  const spa = await prisma.circuit.create({ data: { name: 'Circuit de Spa-Francorchamps', country: 'Belgium', city: 'Stavelot', length: 7.004 } });
  const suzuka = await prisma.circuit.create({ data: { name: 'Suzuka International Racing Course', country: 'Japan', city: 'Suzuka', length: 5.807 } });

  // Create Races
  const bahrainGP = await prisma.race.create({ data: { name: 'Bahrain Grand Prix', date: new Date('2026-03-01T15:00:00Z'), circuitId: bahrain.id } });
  const monacoGP = await prisma.race.create({ data: { name: 'Monaco Grand Prix', date: new Date('2026-05-24T13:00:00Z'), circuitId: monaco.id } });
  const britishGP = await prisma.race.create({ data: { name: 'British Grand Prix', date: new Date('2026-07-05T14:00:00Z'), circuitId: silverstone.id } });
  const italianGP = await prisma.race.create({ data: { name: 'Italian Grand Prix', date: new Date('2026-09-06T13:00:00Z'), circuitId: monza.id } });
  const belgianGP = await prisma.race.create({ data: { name: 'Belgian Grand Prix', date: new Date('2026-08-30T13:00:00Z'), circuitId: spa.id } });
  const japaneseGP = await prisma.race.create({ data: { name: 'Japanese Grand Prix', date: new Date('2026-04-05T05:00:00Z'), circuitId: suzuka.id } });

  // Create Components
  await prisma.component.createMany({
    data: [
      { type: 'Engine', status: 'Active', teamId: redBull.id },
      { type: 'Gearbox', status: 'Active', teamId: redBull.id },
      { type: 'Front Wing', status: 'Damaged', teamId: mercedes.id },
      { type: 'Chassis', status: 'Active', teamId: ferrari.id },
      { type: 'Engine', status: 'Spare', teamId: ferrari.id },
    ]
  });

  // Create Shipments
  await prisma.shipment.createMany({
    data: [
      { description: 'RB20 Chassis Transport', status: 'Delivered', origin: 'Milton Keynes', destination: 'Sakhir', teamId: redBull.id, raceId: bahrainGP.id },
      { description: 'Spare Engines', status: 'In Transit', origin: 'Maranello', destination: 'Monte Carlo', teamId: ferrari.id, raceId: monacoGP.id },
      { description: 'Aero Upgrades', status: 'Preparing', origin: 'Brackley', destination: 'Silverstone', teamId: mercedes.id, raceId: null }
    ]
  });

  // Create Expenses
  await prisma.expense.createMany({
    data: [
      { amount: 1500000, category: 'Component', description: 'New Engine Block Fabrication', date: new Date(), teamId: redBull.id },
      { amount: 250000, category: 'Logistics', description: 'Freight to Bahrain', date: new Date(), teamId: mercedes.id, raceId: bahrainGP.id },
      { amount: 45000, category: 'Travel', description: 'Staff Hotel Booking', date: new Date(), teamId: ferrari.id, raceId: monacoGP.id },
    ]
  });

  console.log("Database seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
