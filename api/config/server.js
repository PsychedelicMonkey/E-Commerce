module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'e129a24f030fe441b3b74da32cff73c0'),
      stripeSecret: env('STRIPE_SECRET'),
    },
  },
});
