import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getEvents = (req, res) => {
    prisma.event.findMany()
    .then((events) => {
        res.json(events)
    })
    .catch((error) => {
        res.json(error)
    })
}

const getEvent = (req, res) => {
    let id = Number(req.params.id)

    prisma.event.findUnique({
        where : {
            id: id
        }
    })
    .then((event) => {
        res.json(event)
    })
    .catch((error) => {
        res.json(error)
    })
}

const searchEvent = async (req, res) => {
    let input = req.params.searchInput

    await prisma.event.findMany({
        where : {
            OR: [
                {
                    name: {contains: input}, 
                },
                // {
                //     start_date: {contains: input}, 
                // },
                {
                    address: {contains: input}, 
                },
                {
                    town: {contains: input}
                }
            ]
        },
        orderBy: {
            name: 'asc',
        },
    })
    .then((event) => {
        res.json(event)
    })
    .catch((error) => {
        res.json(error)
    })
}

export { getEvents, getEvent, searchEvent }