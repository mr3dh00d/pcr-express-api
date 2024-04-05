const router = require('express').Router();
const Review = require('../../models/Review');

async function create(request, response) {
    try {
        const { 
            description,
            score,
            movie_id,
            user_id,
        } = request.body;

        console.log({
            description,
            score,
            movie_id,
            user_id,
        });

        if(!description || !score || !movie_id || !user_id) {
            return response.status(400).json({ message: 'Faltan campos por completar' });
        }

        const newReview = await Review.create({
            description,
            score,
            movie_id,
            user_id,
        });

        newReview.save();

        return response
        .status(201)
        .json({
            message: 'Review creada correctamente', 
            data: {
                review: newReview.json(),
            }
        });

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal server error', error: error.message });    }

}

router.post('/', create);

module.exports = router;