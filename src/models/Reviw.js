const db = require('../config/database');
const { getRandomNumber } = require('../utils');
const User = require("./User");

class Review {
    id;
    description;
    score;
    user;
    likes;
    movie_id;
    created_at;
    updated_at;

    constructor(id, description, score, user, movie_id) {
        this.id = id;
        this.description = description;
        this.score = score;
        this.user = user;
        this.likes = getRandomNumber(0, 375);
        this.movie_id = movie_id;
    }

    static async create({id, description, score, user_id, movie_id}) {
        const user = await User.findById(user_id);
        return new Review(id, description, score, user, movie_id);
    }
    
    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM reviews', async function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    const reviewsPromises = results.map(result => Review.create(result));
                    const reviews = await Promise.all(reviewsPromises);
                    resolve(reviews);
                }
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM reviews WHERE id = ?', [id], async function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                else if (results.length === 0) {
                    resolve(null);
                } else {
                    const review = await Review.create(results[0]);
                    resolve(review);
                }
            });
        });
    }

    save() {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO reviews (description, score, user_id, movie_id) VALUES (?, ?, ?, ?)', [this.description, this.score, this.user.id, this.movie_id], function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            db.query('UPDATE reviews SET description = ?, score = ?, user_id = ?, movie_id = ? WHERE id = ?', [this.description, this.score, this.user.id, this.movie_id, this.id], function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM reviews WHERE id = ?', [this.id], function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    
    }

    json() {
        return {
            id: this.id,
            description: this.description,
            score: this.score,
            likes: this.likes,
            user: this.user.json(),
            movie_id: this.movie_id,
        }
    }

}

module.exports = Review;