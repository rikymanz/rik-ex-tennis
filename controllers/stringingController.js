// COPIARE registerController, adattare a  stringing
const model = require('../models/stringingModel')

const Controller = {

    getAll: async( request, reply ) => {
        const data = await model.getAll()
        return reply.status(200).send(data)
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
        // Create a reguster row
        const entry = {
            raquet: request.body.raquet,
            date: request.body.date,
            string: request.body.string,
            weight: request.body.weight,
            place: request.body.place,
            
        }

        // Save entry in the database
        const res = await model.post( entry )

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

        const entry = {
            raquet: request.body.raquet,
            date: request.body.date,
            string: request.body.string,
            weight: request.body.weight,
            place: request.body.place, 
        }

        const id = request.params.id 

        console.log( id )
        console.log( entry )

        const res = await model.update( entry , id );

        if ( res ) {
            return reply.status(200).send(true);
        } else {
            return reply.status(500).send({ error: "Error"});
        }
    },  // fine update

} // fine classe con metodi

module.exports = Controller