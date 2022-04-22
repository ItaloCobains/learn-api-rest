import { Router, Request, Response } from 'express';

import multer from 'multer';
import * as ApiController from '../controllers/apiControllers';


// const configStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './tmp');
//     },
//     filename: (req, file, cb) => {
//         const randomName = Math.floor(Math.random() * 99999);
//         cb(null, `${randomName}.jpg`);
//     }
// });

const upload = multer({
    // storage: configStorage,
    // storage: multer.memoryStorage(),
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
        cb(null, allowed.includes( file.mimetype ));
    }
});

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

router.post('/upload', upload.single("avatar"), ApiController.fileUpload);

export default router;