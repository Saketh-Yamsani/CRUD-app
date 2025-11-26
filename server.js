const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let students = [];

app.post('/students', (req, res) => {
    const student = req.body;
    students.push(student);
    res.status(201).send(student);
    console.log("posted successfuly")
});

app.get('/students', (req, res) => {
    res.send(students);
    console.log("retrieved successfully")
});

app.get('/student/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));
    if (student) {
        res.send(student);
    } else {
        res.status(404).send({ message: 'Student not found' });
    }
    console.log("retrieved successfully")
});

app.put('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === Number(req.params.id));
    if (index !== -1) {
        students[index] = req.body;
        res.send(students[index]);
    } else {
        res.status(404).send({ message: 'Student not found' });
    }
    console.log("updated successfully")
});

app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === Number(req.params.id));
    if (index !== -1) {
        const deletedStudent = students.splice(index, 1);
        res.send(deletedStudent);
    } else {
        res.status(404).send({ message: 'deleted successfully' });
    }
    console.log("deleted successfully")
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});