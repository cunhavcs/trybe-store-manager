const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

use(sinonChai);

const productService = require('../../../src/services/product.service');
const productController = require('../../../src/controllers/product.controller');
const { mockedProducts } = require('../mocks/product.mock');

describe('Testes unitários da camada controller de "products"', function () {
  const req = {};
  const res = {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });
  
  afterEach(function () {
    sinon.restore();
  });

  it('getAllProducts retorna todos os produtos cadastrados', async function () {
    sinon.stub(productService, 'getAllProducts').resolves(mockedProducts);
    await productController.getAllProducts(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockedProducts);
  });

  it('getProductById retorna o produto correspondente ao id informado', async function () {
    req.params = { id: 1 };
    sinon.stub(productService, 'getProductById').resolves(mockedProducts[0]);
    await productController.getProductById(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockedProducts[0]);
  });
});
