import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { exec } from 'child_process'

const prisma = new PrismaClient()

const verifyAuthorisation = (req, res, next) => {
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

        .then((newUserData) => {
            if(newUserData.role != "superadmin"){
                return res.json({error: 'Unauthorized'})
            }
            next();
        })
        .catch((error) => {
            res.json(error)
        })
    })
}

const getUsers = (req, res) => {
    verifyAuthorisation(req, res, ()=> {
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
}

const getUserById = (req, res) => {
    let id = Number(req.params.id)

    verifyAuthorisation(req, res, ()=> {
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
        return res.json({error: 'All fields must be completed'})
    } else if (existingUser) {
        return res.status(400).json({ error: 'This email is already registered' })
    } else {

        prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: 'en attente',
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

    if (user.role === "en attente"){
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
    let id = Number(req.params.id)
    let userData = req.body
    
    const existingUser = await prisma.user.findFirst({
        where: {
            email: userData.email,
            id: {
                not: id
            }
        }
    })

    verifyAuthorisation(req, res, async ()=> {

        if(userData.email === '' || userData.password ==='' || userData.role ===''){
            return res.status(400).json({ error: 'All fields must be completed' })
        } else if (existingUser) {
            return res.status(400).json({ error: 'This email already is already registered' })

        } else {

            let updateData = {
                email: userData.email,
                role: userData.role,
            }

            if(userData.password) {
                const hashedPassword = await bcrypt.hash(userData.password, 10)
                // prisma.user.update({
                //     where : {
                //         id: id
                //     },
                //     data: {
                //         password: hashedPassword,
                //     }
                // })
                updateData.password = hashedPassword
            }

            prisma.user.update({
                where : {
                    id: id
                },
                data: updateData
            })
            
            .then((updatedUser) => {
                res.json(updatedUser)
            })
                .catch((error) => {
                res.json({error: error.message})
            })
        }
    })
}

const deleteUser = async (req, res) => {
    let id = Number(req.params.id)

    verifyAuthorisation(req, res, ()=> {
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
}

const verifyRole = (req, res) => {
    verifyAuthorisation(req, res, (error)=> {
        if (error) {
            return res.status(500).json({ error: 'There was an error verifying the role.' });
        }

        res.json({ success: true });
    })
}

const importUsers = (req, res) => {
    console.log("import begin")
    exec('npm run seed', (error, stderr) => {
        if (error) {
            res.json({ error });
            console.log(error)
            return;
        }
        if (stderr) {
            res.json({ error: stderr });
            console.log("stderr")
            return;
        }
        console.log("seed script completed")
        res.send('Seed script completed');
    });
}

export { getUsers, getUserById, signUp, logIn, updateUser, deleteUser, verifyRole, importUsers }