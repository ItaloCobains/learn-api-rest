import { Router, Request, Response } from 'express';
import * as ApiController from '../controllers/apiControllers';

const router = Router();

router.get('/ping', ApiController.ping);
router.get('/random', ApiController.random);
router.get('/frases', ApiController.getPhrases);
router.get('/frase/aleatoria', ApiController.getRandomPhrase);
router.get('/nome/:nome', ApiController.name);
router.get('/frase/:id', ApiController.getPhrase);



router.post('/frases', ApiController.createPhrase)


router.put('/frase/:id', ApiController.updatePhrase)

router.delete('/frase/:id', ApiController.deletePhrase)

export default router;