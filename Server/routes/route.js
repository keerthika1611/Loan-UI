import express ,{Router} from 'express';
import {NewLoan,getUsers,getUser,profileData,deleteUser} from '../controller/user-controller.js'

const router=express.Router();


router.post('/newloan', NewLoan);
router.get('/', getUsers);
router.get('/:_id', getUser);
router.post('/:_id', profileData);
router.delete('/:_id',deleteUser);

export default router;
