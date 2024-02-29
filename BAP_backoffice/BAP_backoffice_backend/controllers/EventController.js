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

const createEvent = (req, res) => {
    let event = req.body

    prisma.event.create({
        data: {
            name: event.name,
            start_date: event.start_date,
            end_date: event.end_date,
            id_association: Number(event.id_asso), //à vérifier
            address: event.address,
            complement_address: event.complement_address,
            town: event.town,
            postal_code: event.postal_code,
            longitude: event.longitude,
            latitude: event.latitude
        }
    })

    .then((event) => {
        res.json(event)
    })
    .catch((error) => {
        res.json(error)
    }) 
}

const updateEvent = (req, res) => {
    let id = Number(req.params.id)
    let event = req.body

    prisma.event.update({
        where : {
            id: id
        },
        data: {
            name: event.name,
            start_date: event.start_date,
            end_date: event.end_date,
            id_association: Number(event.id_asso), //à vérifier
            address: event.address,
            complement_address: event.complement_address,
            town: event.town,
            postal_code: event.postal_code,
            longitude: event.longitude,
            latitude: event.latitude
        }
    })
    .then((event) => {
        res.json(event)
    })
    .catch((error) => {
        res.json(error)
    })
}

const deleteEvent = (req, res) => {
    let id = Number(req.params.id)

    prisma.event.delete({
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

export { getEvents, getEvent, createEvent, updateEvent, deleteEvent }