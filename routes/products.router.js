const express = require('express')

const ProductsService = require('../services/products.services')
const { validatorHandler } = require('./../middlewares/validator.handler')
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema
} = require('./../schemas/product.schema')

const router = express.Router()
const service = new ProductsService()

router.get('/', async (req, res) => {
  const products = await service.find()

  res.json(products)
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params

    const product = await service.findOne(id)

    res.json(product)
  }
)

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body

    const newProduct = await service.create(body)

    res.status(201).json({
      data: newProduct,
      message: 'Product created'
    })
  }
)

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { body } = req
    const { id } = req.params

    let statusCode = 500
    const messageObj = {
      id
    }

    try {
      await service.update(id, body)
      statusCode = 200
      messageObj.payload = body
      messageObj.message = "Product updated"
    } catch (error) {
      next(error)
    }


    res.status(statusCode).json(messageObj)
  }
)

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { body } = req
    const { id } = req.params

    let statusCode = 500
    const messageObj = {
      id
    }

    try {
      await service.update(id, body)
      statusCode = 200
      messageObj.payload = body
      messageObj.message = "Product patched"
    } catch (error) {
      next(error)
    }

    res.status(statusCode).json(messageObj)
  }
)

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params

    const deletedProduct = await service.delete(id)

    res.json({
      deletedProduct,
      message: 'Product deleted'
    })
  }
)

module.exports = router
