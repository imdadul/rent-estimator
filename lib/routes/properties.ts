/*  eslint-disable @typescript-eslint/camelcase */
import {NextFunction, Router} from 'express';
import { Property } from '../models/Property';

export const properties = Router();

properties.get('/estimate/:zipCode/:apartmentSize', async (req, res, next) => {
  try {
    const properties:Property[] = await Property.findAll({
      attributes:['zipCode','rent','apartmentSize'],
      where: {
        zipCode: parseInt(req.params.zipCode),
        deleted:false
      }
    });
    let totalRent = 0;
    let totalSize = 0;
    if(properties.length === 0) {
      return res.status(400).send({
        success: false,
        error: 'ZIP_CODE_NOT_FOUND',
        msg:'No rent info for this zip code'
      });
    }
    properties.forEach((property:Property):void=> {
      totalRent += property.rent;
      totalSize += property.apartmentSize;
    });
    res.status(200).send({
      success:true,
      value:Math.round((totalRent/totalSize)*req.params.apartmentSize)
    })
  } catch (e) {
    console.log(e.toString());
    next(e);
  }
});
