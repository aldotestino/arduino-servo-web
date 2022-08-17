import { Command } from 'commander';
import { getDeg, setDeg } from './lib/api';

async function main() {
  const program = new Command();

  program
    .option('-g, --get', 'get servo\'s rotations degree')
    .option('-s, --set <degToSet>', 'set servo\'s rotation degree');

  program.parse(process.argv);

  const options = program.opts();

  let deg = 0;
  try {
    if ('get' in options) {
      deg = await getDeg();
    } else if ('set' in options) {
      deg = await setDeg(options.set);
    }
    console.log(`✅ deg: ${deg}°`);
  } catch (e: any) {
    console.log(`❌ ${e.message}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });