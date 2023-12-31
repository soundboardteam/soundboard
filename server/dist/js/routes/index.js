"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const profile_1 = require("../controllers/profile");
const router = (0, express_1.Router)();
router.get('/todos', todos_1.getTodos);
router.post('/add-todo', todos_1.addTodo);
router.put('/edit-todo/:id', todos_1.updateTodo);
router.delete('/delete-todo/:id', todos_1.deleteTodo);
router.get('/profiles', profile_1.getProfiles);
router.post('/add-profile', profile_1.addProfile);
router.get('/get-profile/:phoneNumber', profile_1.getProfile);
exports.default = router;
