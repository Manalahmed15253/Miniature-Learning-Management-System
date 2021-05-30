const express = require('express');
const student_controller = require('../Controllers/student_controller');

const router = express.Router();
router.get('/web/students/create', student_controller.student_create_get);
router.get('/api/students', student_controller.student_index);
router.post('/api/students', student_controller.student_create_post);
router.get('/api/students/:id', student_controller.student_details);
router.delete('/api/students/:id', student_controller.student_delete);
router.put('/api/students/:id',student_controller.student_update)
module.exports = router;