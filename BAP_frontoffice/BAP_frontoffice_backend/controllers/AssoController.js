import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getAssos = (req, res) => {
    prisma.association.findMany({
        orderBy: {
            name: 'asc',
        }
    })
    .then((assos) => {
        res.json(assos)
    })
    .catch((error) => {
        res.json(error)
    })
}

const getAsso = (req, res) => {
    let id = Number(req.params.id)

    prisma.association.findUnique({
        where : {
            id: id
        }
    })
    .then((asso) => {
        res.json(asso)
    })
    .catch((error) => {
        res.json(error)
    })
}

const searchAsso = async (req, res) => {
    let input = req.params.searchInput

    await prisma.association.findMany({
        where : {
            OR: [
                {
                    name: {contains: input}, 
                },
                {
                    description: {contains: input}, 
                },
                {
                    category: {contains: input}, 
                },
                {
                    representative_name: {contains: input}, 
                },
                {
                    representative_surname: {contains: input}, 
                },
                {
                    address: {contains: input}, 
                },
            ]
        },
        orderBy: {
            name: 'asc',
        },
    })
    .then((asso) => {
        res.json(asso)
    })
    .catch((error) => {
        res.json(error)
    })
}

const getEventsByAsso = async (req, res) => {
    let id = Number(req.params.id)

    prisma.event.findMany({
        where : {
            id_association: id
        }
    })
    .then((asso) => {
        res.json(asso)
    })
    .catch((error) => {
        res.json(error)
    })    
}

export { getAssos, getAsso, searchAsso, getEventsByAsso }