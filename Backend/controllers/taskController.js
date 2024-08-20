const db = require('../models/db');

exports.createTask = (req, res) => {
    const { title, description, assigned_to } = req.body;

    db.query(
        'INSERT INTO tasks (title, description, assigned_to) VALUES (?, ?, ?)',
        [title, description, assigned_to],
        (err, results) => {
            if (err) return res.status(500).send('Error creating task');
            res.status(200).send('Task created successfully');
        }
    );
};

exports.getTasks = (req, res) => {
    let query = 'SELECT * FROM tasks';
    if (req.user.role === 'User') {
        query += ' WHERE assigned_to = ?';
    }

    db.query(query, [req.user.id], (err, results) => {
        if (err) return res.status(500).send('Error fetching tasks');
        res.status(200).json(results);
    });
};

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, status, assigned_to } = req.body;

    db.query(
        'UPDATE tasks SET title = ?, description = ?, status = ?, assigned_to = ? WHERE id = ?',
        [title, description, status, assigned_to, id],
        (err, results) => {
            if (err) return res.status(500).send('Error updating task');
            res.status(200).send('Task updated successfully');
        }
    );
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Error deleting task');
        res.status(200).send('Task deleted successfully');
    });
};
