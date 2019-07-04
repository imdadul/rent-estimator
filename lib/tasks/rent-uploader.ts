import csv from 'csvtojson';
import { CronJob } from 'cron';
import path from 'path';
import { Property } from '../models/Property';

export const getDataFromCsv = async (csvFilePath: string): Promise<Record<string, any>[]> => {
  return await csv()
    .fromFile(csvFilePath)
    .then((data: Record<string, any>[]): Record<string, any>[] => {
      return data.map(
        (d: Record<string, any>): Record<string, any> => {
          return {
            apartmentId: d.apartment_id,
            apartmentSize: d.apartment_size,
            apartmentType: d.apartment_type,
            deleted: d.deleted,
            rent: d.rent,
            zipCode: d.zip_code,
          };
        },
      );
    });
};

export const insertInitData = async (): Promise<void> => {
  const rents: Record<string, any>[] = await getDataFromCsv(
    path.resolve(__dirname, '../data/rents-2019-01-15.csv'),
  );
  await Property.bulkCreate(rents);
};

export const startJob = () => {
  new CronJob(
    '*/05 * * * * *', // Every 10 seconds
    function() {
      console.log('You will see this message every second');
    },
    null,
    true,
    undefined,
    undefined,
    true,
    'America/Los_Angeles',
  );
};
