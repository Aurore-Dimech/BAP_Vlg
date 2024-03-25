import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

const getUsers = (req, res) => {
    const token = req.headers['x-access-token']

    if(!token){
        return res.json({error: 'no token provided'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {

        if(error){
            return res.json({error: 'Unauthorized'})
        }

        prisma.user.findUnique({
            where: {
                email: decoded.email
            }
        })
        .then((user) => {
            if(user.role != "superadmin"){
                return res.json({error: 'Unauthorized'})
            }

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
        })
        .catch((error) => {
            res.json(error)
        })
    })
}

const getUserById = (req, res) => {
    const token = req.headers['x-access-token']

    let id = Number(req.params.id)

    if(!token){
        return res.json({error: 'no token provided'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {

        if(error){
            return res.json({error: 'Unauthorized'})
        }

        prisma.user.findUnique({
            where: {
                email: decoded.email
            }
        })

        .then((newUserData) => {
            if(newUserData.role != "superadmin"){
                return res.json({error: 'Unauthorized'})
            }

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
        })
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
                role: 'En attente',
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

    if (!user.verified){
        return res.json({error: 'User not verified'})
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

const updateUser = async (req, res) => { //à vérifier
    const token = req.headers['x-access-token']

    let id = Number(req.params.id)
    let userData = req.body
            
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const existingUser = await prisma.user.findFirst({
        where: {
            email: userData.email,
            id: {
                not: id
            }
        }
    })

    if(!token){
        return res.json({error: 'no token provided'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {

        if(error){
            return res.json({error: 'Unauthorized'})
        }

        prisma.user.findUnique({
            where: {
                email: decoded.email
            }
        })

        .then((newUserData) => {
            if(newUserData.role != "superadmin"){
                return res.json({error: 'Unauthorized'})
            }

            if(userData.email === '' || userData.password ==='' || userData.role ==='' || userData.verified === ''){
                return res.status(400).json({ error: 'All fields must be completed' })
            } else if (existingUser) {
                return res.status(400).json({ error: 'This email already is already registered' })

            } else {

                prisma.user.update({
                    where : {
                        id: id
                    },
                    data: {
                        email: userData.email,
                        password: hashedPassword,
                        role: userData.role,
                        verified: userData.verified
                    }
                })
            
                .then((updatedUser) => {
                    res.json(updatedUser)
                })
                .catch((error) => {
                    res.json({error: error.message})
                })
            }
        })
    })
}

const deleteUser = async (req, res) => {
    const token = req.headers['x-access-token']

    let id = Number(req.params.id)

    if(!token){
        return res.json({error: 'no token provided'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {

        if(error){
            return res.json({error: 'Unauthorized'})
        }

        prisma.user.findUnique({
            where: {
                email: decoded.email
            }
        })

        .then((newUserData) => {
            if(newUserData.role != "superadmin"){
                return res.json({error: 'Unauthorized'})
            }

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
        })
    })
}

export { getUsers, getUserById, signUp, logIn, updateUser, deleteUser }