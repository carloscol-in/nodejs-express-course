const faker = require('faker')
const boom = require('@hapi/boom')


class ProductsService {

  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 10

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }

    this.products.push(newProduct)

    return newProduct
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 1000);
    })
  }

  async findOne(id) {
    const product = this.products.filter(p => p.id === id)

    if (!product) throw boom.notFound('Product not found')

    return product
  }

  async update(id, changes) {
    const idx = this.products.findIndex(p => p.id === id)

    if (idx === -1) throw boom.notFound('Product not found')

    const product = this.products[idx]
    this.products[idx] = {
      id,
      ...product,
      ...changes
    };

    return this.products[idx]
  }

  async delete(id) {
    const idx = this.products.findIndex(item => item.id === id)

    if (idx === -1) throw boom.notFound('Product not found')

    const deletedProduct = this.products.splice(idx, 1)

    return deletedProduct
  }
}

module.exports = ProductsService
