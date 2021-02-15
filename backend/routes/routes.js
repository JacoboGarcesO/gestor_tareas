const {Router}=require('express');
const router=Router();

const {login, register, sendEmail, registerTask, getTasks, updateTasks}=require('./controller');

router.post('/login', login);
router.post('/signup', register);
router.post('/send-email', sendEmail);
router.post('/tasks', registerTask);
router.post('/get-tasks', getTasks);
router.post('/update-tasks/:id_tarea', updateTasks);



module.exports=router;