const connection = require('../database/connection');
const genUniqueId = require('../utils/genUniqueId');
const hashPassword = require('../utils/hashPassword');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, password, whatsapp, bio, city, uf } = request.body;
        const id = genUniqueId();

        const [nameExists] = await connection('ongs').count().where({ name });
        const [emailExists] = await connection('ongs').count().where({ email });

        if (nameExists['count(*)'])
            return response.status(400).json({ error: 'The specified name already exists in the DB.' });
        if (emailExists['count(*)'])
            return response.status(400).json({ error: 'The specified email already exists in the DB.' });

            await connection('ongs').insert({
                id,
                name,
                email,
                password: await hashPassword(password),
                whatsapp,
                bio,
                city,
                uf,
            });

        return response.status(201).send();
    },

    async update(request, response) {
        const { name, email, whatsapp, bio, city, uf } = request.body;
        const id = request.headers.authorization;

        const [nameExists] = await connection('ongs').count().where({ name });
        const [emailExists] = await connection('ongs').count().where({ email });

        if (nameExists['count(*)'])
            return response.status(400).json({ error: 'The specified name already exists in the DB.' });
        if (emailExists['count(*)'])
            return response.status(400).json({ error: 'The specified email already exists in the DB.' });

        await connection('ongs').update({
            name,
            email,
            whatsapp,
            bio,
            city,
            uf,
        }).where({ id });

        return response.send();
    },
};