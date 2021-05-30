const Joi = require('joi');
const path = require('path');
const firebase = require('../db');
const Student = require('../models/student')
const firestore = firebase.firestore();

//we will get it from database
// let students = [
//     {id:1 , name:'John', code:'1235673'},
//     {id:2 , name:'Carla' ,code:'1569820'}
// ];

// helper Functions --> Error validation functions for student intity
function Error_validation_for_students(msg) {
    var reg = /^([a-zA-Z]||'||-)*$/;
    const schema = Joi.object({
        name: Joi.string().regex(reg).required(),
        code: Joi.string().length(7).required()
    });
    const result = schema.validate(msg);
    return result;
}
//to get the details of all the students
const student_index = async (req, res) => {
    const students = await firestore.collection('students');
    const data = await students.get();
    const studentsList= [];
    if(data.empty) {
        res.status(404).send('No student record found');
    }
    else {
        data.forEach(doc => {
            const student = new Student(
                doc.id,
                doc.data().name,
                doc.data().code,
            );
            studentsList.push(student);
        });
        res.send(studentsList);
    }
}
//to get the details of specific studnet
const student_details = async (req, res) => {
    try {
        const id = req.params.id;
        const student = await firestore.collection('students').doc(id);
        const data = await student.get();
        if(!data.exists) {
            res.status(404).send('Student with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//to create new student
const student_create_get = (req, res) => {
    let reqPath = path.join(__dirname, '../website');
    res.sendFile('student_intity.html', { root: reqPath });


}

const student_create_post = async (req, res) => {
    const { error } = Error_validation_for_students(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const students = await firestore.collection('students');
    const allstudents = await students.get();
    if(allstudents.empty) {
        const data = {
            name: req.body.name,
            code: req.body.code
        };
        await firestore.collection('students').doc().set(data);
        res.send(data);
    }
    else {
        const studentsList= [];
        allstudents.forEach(doc => {
            const student = new Student(
                doc.id,
                doc.data().name,
                doc.data().code,
            );
            studentsList.push(student);
        });
        const data = {
            name: req.body.name,
            code: req.body.code
        };
        await firestore.collection('students').doc().set(data);
        res.send(data);
    }


}
//delete a specific student
const student_delete = async (req, res) => {

    try {
        const id = req.params.id;
        await firestore.collection('students').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }


}
//update a specific studnet
const student_update = async (req, res) => {
    const { error } = Error_validation_for_students(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    try {
        const id = req.params.id;
        const data = req.body;
        const student =  await firestore.collection('students').doc(id);
        await student.update(data);
        res.send('Student record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
    


}

module.exports = {
    student_index,
    student_details,
    student_create_get,
    student_create_post,
    student_delete,
    student_update
}