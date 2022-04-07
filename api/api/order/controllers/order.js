const { sanitizeEntity } = require('strapi-utils');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
('use strict');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const { user } = ctx.state;
    let entities;

    if (ctx.query._q) {
      entities = await strapi.services.order.search({
        ...ctx.query,
        user: user.id,
      });
    } else {
      entities = await strapi.services.order.find({
        ...ctx.query,
        user: user.id,
      });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.order })
    );
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const entity = await strapi.services.order.findOne({ id, user: user.id });
    return sanitizeEntity(entity, { model: strapi.models.order });
  },

  async create(ctx) {
    const { user } = ctx.state;
    const { products } = ctx.request.body;
    let total = 0.0;

    // Add price of all selected products to total
    await Promise.all(
      products.map(async (id) => {
        const prod = await strapi.services.product.findOne({ id });
        total += prod.price;
      })
    );

    const line_items = await Promise.all(
      products.map(async (id) => {
        const prod = await strapi.services.product.findOne({ id });
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: prod.name,
            },
            unit_amount: prod.price * 100,
          },
          quantity: 1,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    const entity = await strapi.services.order.create({
      checkout_session: session.id,
      products,
      status: 'unpaid',
      total: parseFloat(total).toFixed(2),
      user: user.id,
    });

    // return sanitizeEntity(entity, { model: strapi.models.order });

    return { id: session.id };
  },
};
