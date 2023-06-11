const saleService = require('../services/sale.service');

const errorMap = {
  INVALID_VALUE: 422,
  SALE_NOT_FOUND: 404,
};

const getAllSales = async (_req, res) => {
  const { type, message } = await saleService.getAllSales();
  if (type) return res.status(errorMap[type]).json(message);
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getSaleById(+id);
  if (type) return res.status(errorMap[type]).json({ message });
  return res.status(200).json(message);
};

const registerSale = async (req, res) => {
  const saleData = req.body;
  const { type, message } = await saleService.registerSale(saleData);
  if (type) return res.status(errorMap[type]).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  getAllSales,
  getSaleById,
  registerSale,
};
