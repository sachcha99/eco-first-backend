const express = require('express');
const router = express.Router();
const shedDetailsController = require('../controller/shedDetails.controller');

module.exports = function () {
    router.get('/', shedDetailsController.getAllShedDetails);
    router.post('/create', shedDetailsController.createShed);
    router.get('/:id', shedDetailsController.getShedById);
    router.put('/update/:id', shedDetailsController.updateShed);
    router.delete('/delete/:id', shedDetailsController.deleteShed);

    return router;
}
