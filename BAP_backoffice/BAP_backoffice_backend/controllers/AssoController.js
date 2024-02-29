import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getAssos = (req, res) => {
    prisma.association.findMany()
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

const createAsso = async (req, res) => {
    let asso = req.body

    const existingAsso = await prisma.association.findUnique({
        where: {
            name: asso.name
        }
    })

    if (existingAsso) {
        return res.status(400).json({ error: 'This association already exists' })
    } else if (asso.name === '' || asso.category === '' || asso.address === '' || asso.town === '' || asso.postal_code === '' || asso.longitude === '' || asso.latitude === ''){
        return res.status(400).json({ error: 'The name, category, address, town, postal code, longitude and latitude cannot be empty' })
    } else{
        prisma.association.create({
            data: {
                name: asso.name,
                siret: asso.siret,
                description: asso.description,
                category: asso.category,
                representative_name: asso.representative_name,
                representative_surname: asso.representative_surname,
                mail: asso.mail,
                phone: asso.phone, 
                address: asso.address,
                complement_address: asso.complement_address,
                town: asso.town,
                postal_code: asso.postal_code,
                longitude: asso.longitude,
                latitude: asso.latitude
            }
        })
        .then((asso) => {
            res.json(asso)
        })
        .catch((error) => {
            res.json(error)
        }) 
    }

}

const updateAsso = async (req, res) => {
    let id = Number(req.params.id)
    let asso = req.body

    const existingAsso = await prisma.association.findFirst({
        where: {
            name: asso.name,
            id: {
                not: id
            }
        }
    })

    if (existingAsso) {
        return res.status(400).json({ error: 'This association already exists' })
    } else if (asso.name === '' || asso.category === '' || asso.address === '' || asso.town === '' || asso.postal_code === '' || asso.longitude === '' || asso.latitude === ''){
        return res.status(400).json({ error: 'The name, category, address, town, postal code, longitude and latitude cannot be empty' })
    } else {
        prisma.association.update({
            where : {
                id: id
            },
            data: {
                name: asso.name,
                siret: asso.siret,
                description: asso.description,
                category: asso.category,
                representative_name: asso.representative_name,
                representative_surname: asso.representative_surname,
                mail: asso.mail,
                phone: asso.phone, 
                address: asso.address,
                complement_address: asso.complement_address,
                town: asso.town,
                postal_code: asso.postal_code,
                longitude: asso.longitude,
                latitude: asso.latitude
            }
        })
        .then((asso) => {
            res.json(asso)
        })
        .catch((error) => {
            res.json(error)
        })
    }

}

const deleteAsso = (req, res) => {
    let id = Number(req.params.id)

    prisma.association.delete({
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
              email: 'asc',
            },
    })
    .then((asso) => {
        res.json(asso)
    })
    .catch((error) => {
        res.json(error)
    })
}

export { getAssos, getAsso, createAsso, updateAsso, deleteAsso, searchAsso }