import { Command } from 'commander';
import { deleteRecord, getAllRecords, addRecord } from '../utils/handleRecords';
import { executeRecord, getDeg, setDeg } from './lib/api';

async function main() {
  const program = new Command();

  program
    .option('-g, --get', 'get servo\'s rotations degree')
    .option('-s, --set <degToSet>', 'set servo\'s rotation degree')
    .option('-a, --add "<name>;<[pos1,pos2...]>;<delay>"', 'add a new record')
    .option('-l, --list', 'list all saved records')
    .option('-d, --delete <recordName>', 'delete a record')
    .option('-e, --execute <recordName>', 'execute a record');

  program.parse(process.argv);

  const options = program.opts();

  try {
    if ('get' in options) {
      const deg = await getDeg();
      console.log(`✅ deg: ${deg}°`);
    } else if ('set' in options) {
      const deg = await setDeg(options.set);
      console.log(`✅ deg: ${deg}°`);
    } else if ('add' in options) {
      const [name, movementsString, delayString] = options.add.split(';') as string[];
      const delay = parseInt(delayString);
      const movements = movementsString.replace('[', '').replace(']', '').split(',').map(s => parseInt(s));
      addRecord(name, { movements, delay });
      console.log(`✅ record '${name}' succesfully added`);
    } else if ('list' in options) {
      getAllRecords().map(r => console.log(`- ${r}`));
    } else if ('delete' in options) {
      deleteRecord(options.delete);
      console.log(`✅ record '${options.delete}' succesfully deleted`);
    } else if ('execute' in options) {
      await executeRecord(options.execute);
      console.log(`✅ Record '${options.execute}' succesfully executed`);
    }
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