'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = require('express')
const todos_controller_1 = require('./todos.controller')
const router = express_1.Router()
router.get('/', todos_controller_1.getTodos)
router.post('/add-todo', todos_controller_1.addTodos)
router.put('/edit-todo:id', todos_controller_1.updateTodos)
router.delete('/delete-todo', todos_controller_1.deleteTodos)
exports.default = router
