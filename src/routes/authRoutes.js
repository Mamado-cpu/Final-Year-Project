const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const gpsController = require('../controllers/gpsController');
const { auth: ensureAuth } = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-2fa', authController.verify2fa);
router.post('/resend-2fa', authController.resend2fa);
router.get('/me', ensureAuth, authController.me);
// Route for collectors to update their location
router.post('/gps/update', ensureAuth, gpsController.updateLocation);
// Route for collectors to deactivate location sharing
router.post('/gps/deactivate', ensureAuth, gpsController.deactivateCollector);

module.exports = router;