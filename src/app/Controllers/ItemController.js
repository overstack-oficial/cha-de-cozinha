const Yup = require('yup');
const Item = require('../Models/Item');

class ItemController {

    async index(req, res) {
        const { page = 1 } = req.query;
        const { limit = 5 } = req.query;
        await Item.paginate(
            {}, 
            { select: '_id name active', page, limit })
        .then((itens) => {
            return res.json({
                error: false,
                itens
            }); 
        }).catch(() => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            active: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        var dados = req.body;

        const item = await Item.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Item não foi cadastrado!"
            });

            return res.status(200).json({
                error: false,
                message: "Item cadastrado com sucesso!",
                dados: item
            })
        });
    };

    async update(req, res) {
        var dados = req.body;

        const item = Item.findOne({ active: false });

        await Item.updateOne({ _id: item._id, active: false }, dados, (err) => {
            if(err) 
            return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Item não foi editado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Item editado com sucesso!"
            });
        });        
    };

    async delete(req, res) {

        await Item.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Item não foi apagado com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Item apagado com sucesso!"
        });
    };
}

module.exports = new ItemController();