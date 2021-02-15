const {Router}=require('express');
const router=Router();

const {login, register, sendEmail, registerTask}=require('./controller');

router.post('/login', login);
router.post('/signup', register);
router.post('/send-email', sendEmail);
router.post('/tasks', registerTask);



module.exports=router;