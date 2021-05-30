const Joi = require('joi');
const path = require('path');
const Course = require('../models/course');
const firebase = require('../db');
const Student = require('../models/student');
const { description } = require('joi/lib/types/symbol');
const firestore = firebase.firestore();
// let courses = [
//     {id:1 , name:'Math', code:'CSE443', description:'algebra and calculus'},
//     {id:2 , name:'English' ,code:'CSE441', description:'speech and reading course'}
// ];
// helper Functions --> Error validation functions for course intity
function Error_validation_for_courses(msg) {
    var constraits = /^[a-zA-Z]{3}[0-9]{3}$/;
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        code: Joi.string().regex(constraits).required(),
        description: Joi.string().max(200).allow(null, '')
    });
    const result = schema.validate(msg);
    return result;
}
//to get the details of all the courses
const course_index = async (req, res) => {
    const courses = await firestore.collection('courses');
    const data = await courses.get();
    const courseslist= [];
    if(data.empty) {
        res.status(404).send('No course record found');
    }
    else {
        data.forEach(doc => {
            const course = new Course(
                doc.id,
                doc.data().name,
                doc.data().code,
                doc.data().description,
            );
            courseslist.push(course);
        });
        res.send(courseslist);
    }
}
//to get the details of specific course
const course_details = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await firestore.collection('courses').doc(id);
        const data = await course.get();
        if(!data.exists) {
            res.status(404).send('Course with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

}
//to create new course
const course_create_get = (req, res) => {
    let reqPath = path.join(__dirname, '../website');
    res.sendFile('course_intity.html', { root: reqPath });

}
const course_create_post = async (req, res) => {
    const { error } = Error_validation_for_courses(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const courses = await firestore.collection('courses');
    const allcourses = await courses.get();
    if(allcourses.empty) {
        const data = {
            name: req.body.name,
            code: req.body.code,
            description: req.body.description
        };
        await firestore.collection('courses').doc().set(data);
        res.send(data);
    }
    else {
        const courseslist= [];
        allcourses.forEach(doc => {
            const course = new Course(
                doc.data().name,
                doc.data().code,
                doc.data().description
            );
            courseslist.push(course);
        });
        const data = {
            name: req.body.name,
            code: req.body.code,
            description: req.body.description
        };
        await firestore.collection('courses').doc().set(data);
        res.send(data);
    }
}
//delete a specific course
const course_delete = async (req, res) => {
    try {
        const id = req.params.id;
        await firestore.collection('courses').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//update a specific course
const course_update = async (req, res) => {
    const { error } = Error_validation_for_courses(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    try {
        const id = req.params.id;
        const data = req.body;
        const course =  await firestore.collection('courses').doc(id);
        await course.update(data);
        res.send('Course record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }

}
module.exports = {
    course_index,
    course_details,
    course_create_get,
    course_create_post,
    course_delete,
    course_update
}