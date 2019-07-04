import csv from 'csvtojson';
import { CronJob } from 'cron';
import path from 'path';
import { Property } from '../models/Property';

const getDataFromCsv = async (csvFilePath: string): Promise<Record<string, any>[]> => {
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

const updatePropertyValues = (property: Property, newDate: any): Property => {
  if (!newDate) {
    return property;
  }
  property.apartmentId = newDate.apartmentId;
  property.apartmentSize = newDate.apartmentSize;
  property.apartmentType = newDate.apartmentType;
  property.deleted = newDate.deleted;
  property.rent = newDate.rent;
  property.zipCode = newDate.zipCode;
  return property;
};

export const insertInitData = async (fileName: string): Promise<void> => {
  const properties: Record<string, any>[] = await getDataFromCsv(path.resolve(__dirname, fileName));

  const existingProperties: Property[] = await Property.findAll({
    where: {
      apartmentId: properties.map((property: Property): string => property.apartmentId),
    },
  });

  const updatedProperties: Property[] = existingProperties.map(
    (existingProperty: Property): Property => {
      return updatePropertyValues(
        existingProperty,
        properties.find((property: Record<string, any>): boolean => {
          return existingProperty.apartmentId === property.apartmentId;
        }),
      );
    },
  );
  const newEntries = properties.filter((p: Property): boolean => {
    return !existingProperties.find((property: Property): boolean => {
      return property.apartmentId === p.apartmentId;
    });
  });

  await Promise.all([
    Promise.all(
      updatedProperties.map(async (property: Property): Promise<Property> => await property.save()),
    ),
    Property.bulkCreate(newEntries),
  ]);
};

//@TODO - Whenever this function is triggered,  it should return the name of latest file for lookup.
//        This function may give that file name based on every monday value. Assuming cron job execs every Monday.
//        example: return new Date('today is Monday').format('yyyy-mm-dd') + '.csv'
const getCurrentFileName = (seq: 0 | 1): string => {
  // We only have 2 files at this moment.
  const fileNames = ['../data/rents-2019-01-15.csv', '../data/rents-2019-01-22.csv'];
  return fileNames[seq];
};

export const startJob = (): void => {
  let c = 0;
  new CronJob(
    '*/40 * * * * *', // Every 40 seconds for easier debugging. every Monday expression would be '* * * * * 01'
    async (): Promise<void> => {
      await insertInitData(getCurrentFileName(c as 0 | 1));
      if (c == 0) {
        // Take the last one.
        c = 1;
      }
    },
    null,
    true,
    undefined,
    undefined,
    true,
    'America/Los_Angeles',
  );
};
