const express = require('express');
const course_controller = require('../Controllers/course_controller');
const router = express.Router();
router.get('/web/courses/create', course_controller.course_create_get);
router.get('/api/courses', course_controller.course_index);
router.post('/api/courses', course_controller.course_create_post);
router.get('/api/courses/:id', course_controller.course_details);
router.delete('/api/courses/:id', course_controller.course_delete);
router.put('/api/courses/:id',course_controller.course_update)
module.exports = router;