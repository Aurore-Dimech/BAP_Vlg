import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

const getUsers = (req, res) => {
    prisma.user.findMany({
        orderBy: {
            email: 'asc',
        }
    })
    .then((users) => {
        res.json(users)
    })
    .catch((error) => {
        res.json(error)
    })
}

const getUserById = (req, res) => {
    let id = Number(req.params.id)

    prisma.user.findUnique({
        where : {
            id: id
        }
    })
    .then((user) => {
        res.json(user)
    })
    .catch((error) => {
        res.json(error)
    })
}

const signUp = async (req, res) => {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(email === '' || password ===''){
        res.json({error: 'All fields must be completed'})
    } else if (existingUser) {
        return res.status(400).json({ error: 'This email is already registered' })
    } else {

        prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: 'admin',
                verified: false
            }
        })
    
        .then((user) => {       
            res.json(user)
        })
        .catch((error) => {
            res.json({error: error.message})
        })
    }
}

const logIn = async (req, res) => {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where : {
            email
        }
    })

    if (!user){
        return res.json({error: 'User not found'})
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.json({error: 'Password not valid'})
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    })

    res.json(token)
}

const updateUser = async (req, res) => {
    let id = Number(req.params.id)
    let user = req.body
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(user.password, 10)

    const existingUser = await prisma.user.findFirst({
        where: {
            email: user.email,
            id: {
                not: id
            }
        }
    })

    if(user.email === '' || user.password ==='' || user.role ==='' || user.verified === ''){
        return res.status(400).json({ error: 'All fields must be completed' })
    } else if (existingUser) {
        return res.status(400).json({ error: 'This email already is already registered' })

    } else {

        prisma.user.update({
            where : {
                id: id
            },
            data: {
                email: user.email,
                password: hashedPassword,
                role: user.role,
                verified: user.verified
            }
        })
    
        .then((user) => {
            res.json(user)
        })
        .catch((error) => {
            res.json({error: error.message})
        })
    }
}

const deleteUser = async (req, res) => {
    let id = Number(req.params.id)

    prisma.user.delete({
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

export { getUsers, getUserById, signUp, logIn, updateUser, deleteUser }