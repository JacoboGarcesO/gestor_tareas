const {Router}=require('express');
const router=Router();

const {login, register, sendEmail}=require('./controller');

router.post('/login', login);
router.post('/signup', register);
router.post('/send-email', sendEmail);


module.exports=router;