
const model = require('../models/walletsModel')

const Wallets = {
    getAll: async( request, reply ) => {
        const data = await model.getAll();
        return reply.status(200).send(data);
    },

    getOne: async( request, reply ) => {
        const data = await model.getById( request.params.id );
        if ( data != null && data.length > 0 ) {
            return reply.status(200).send(data[0]);
        } else {
            return reply.status(500).send({ error: "Data not found"});
        }
    },

    post: async( request , reply ) => {
        // Create a helpdesk ticket
        const wallet = {
          owner: request.body.owner,
          coin: request.body.coin,
          quantity: request.body.quantity,
          color: request.body.color
        };

        // Save ticket in the database
        const res = await model.post(wallet)
        if ( res ) {
          return reply.status(200).send(true);
        } else {
            return reply.status(500).send({ error: "Error"});
        }

    }, // fine moetodo post

    delete: async( request , reply ) => {
      const res = await model.delete( request.params.id );
      if ( res ) {
          return reply.status(200).send(true);
      } else {
          return reply.status(500).send({ error: "Data not found"});
      }
    },  // fine delete

    update: async( request , reply ) => {
      const wallet = {
        owner: request.body.owner,
        coin: request.body.coin,
        quantity: request.body.quantity,
        color: request.body.color
      }

      const wallet_id = request.params.id 

      const res = await model.update( wallet , wallet_id );

      if ( res ) {
        return reply.status(200).send(true);
      } else {
        return reply.status(500).send({ error: "Error"});
      }
    },  // fine update

} // fine classe con metodi




module.exports = Wallets