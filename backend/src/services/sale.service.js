const saleModel = require('../models/sale.model');
const { validateId, validateSale } = require('./validations/inputValueValidations');

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  return { type: null, message: sales };
};

const getSaleById = async (saleId) => {
  const error = validateId(saleId);
  if (error.type) return error;

  const sale = await saleModel.getSaleById(saleId);
  if (!sale || sale.length < 1) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

const registerSale = async (saleData) => {
  const error = validateSale(saleData);
  if (error.type) return error;

  const newSale = await saleModel.registerSale(saleData);
  return { type: null, message: newSale };
};

module.exports = {
  getAllSales,
  getSaleById,
  registerSale,
};
