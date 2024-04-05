const Review = require('../../models/Review');

const router = require('express').Router();

async function read(req, res) {
    try {

        const { id } = req.params;

        console.log(id);

        let reviews = null;

        if(id) {
            const review = await Review.findById(id);
            if (!review) {
                return res.status(400).json({ message: 'Review not found' });
            }
            reviews = [review.json()];
        } else {
            reviews = await Review.getAll();
            reviews = reviews.map((review) => review.json());
        }

        return res
        .status(201)
        .json({
            message: 'Review found successfully!', 
            data: {
                reviews: reviews,
            }
        });

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

router.get('/:id?', read);

module.exports = router;