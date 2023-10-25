import { Router } from 'express'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todos'
import { addProfile, getProfile, getProfiles } from '../controllers/profile'

const router: Router = Router()

router.get('/todos', getTodos)

router.post('/add-todo', addTodo)

router.put('/edit-todo/:id', updateTodo)

router.delete('/delete-todo/:id', deleteTodo)

router.get('/profiles', getProfiles)

router.post('/add-profile', addProfile)

router.get('/get-profile/:phoneNumber', getProfile)

export default router
