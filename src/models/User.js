const db = require('../config/database');

class User {

    id;
    name;
    avatar;
    username;
    email;
    password;
    created_at;
    updated_at;


    constructor({ id, name, email, avatar, username, password, created_at, updated_at }) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.username = username;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                else if (results.length === 0) {
                    resolve(null);
                } else {
                    const user = new User(results[0]);
                    resolve(user);
                }
            });
        });
    }

    static findByUsername(username) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                else if (results.length === 0) {
                    resolve(null);
                } else {
                    const user = new User(results[0]);
                    resolve(user);
                }
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ?', [id], function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    const user = new User(results[0]);
                    resolve(user);
                }
            });
        });
    }

    save() {
        const { name, username, email, avatar, password } = this;
        return db.query('INSERT INTO users SET ?', {
            name,
            username,
            email,
            avatar,
            password
        }, function (error, results, fields) {
            if (error) throw error;
            this.id = results.insertId;
            return results;
        });
    }

    update() {
        const { name, username, email, avatar } = this;
        db.query('UPDATE users SET ?', this, function (error, results, fields) {
            if (error) throw error;
            return results;
        });
    }



    json() {
        return {
            id: this.id,
            name: this.name,
            avatar: this.avatar,
            username: this.username,
            email: this.email,
            created_at: this.created_at,
            updated_at: this.updated_att
        }
    }
}

module.exports = User;