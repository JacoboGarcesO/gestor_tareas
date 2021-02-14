const {Router}=require('express');
const router=Router();

const {login, register}=require('./controller');

router.post('/login', login);
router.post('/signup', register);


module.exports=router;