import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { Phrase } from '../models/phrase';
import sharp from 'sharp';
import { unlink } from 'fs/promises';  

export const ping = (req: Request, res: Response) => {
    res.json({
        pong: true,
    });
}

export const random = (req: Request, res: Response) => {
    const nRand: Number = Math.floor(Math.random() * 10);

    res.json({
        Number: nRand,
    });
}

export const name = (req: Request, res: Response) => {
    const name: String = req.params.name;

    res.json({
        name: `Seu nome é ${name}`,
    })

}

export const createPhrase = async (req: Request, res: Response) => {
    let { author, txt } = req.body;

    let newPhrase = await Phrase.create({
        author,
        txt,
    });

    res.status(201)
    res.json({
        id: newPhrase.id,
        author,
        txt,
    });
}


export const getPhrases = async (req: Request, res: Response) => {
    const phrases = await Phrase.findAll();

    res.status(200)
    res.json(phrases);
}

export const getPhrase = async (req: Request, res: Response) => {
    const { id } = req.params;

    const phrase = await Phrase.findByPk(id);

    if (phrase) {
        res.status(200)
        res.json(phrase);
    } else {
        res.json({ error: 'frase nao encontrada' })
    }
}

export const updatePhrase = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { author, txt } = req.body;
    const phrase = await Phrase.findByPk(id);

    if (phrase) {
        phrase.author = author;
        phrase.txt = txt;
        await phrase.save();

        res.json({ phrase: phrase });
    } else {
        res.json({ error: 'frase nao encontrada' });
    }


}

export const deletePhrase = async (req: Request, res: Response) => {
    const { id } = req.params;
    const phrase = await Phrase.findByPk(id);

    if (phrase) {
        phrase.destroy();
        phrase.save();
        res.json({ delete: 'deletado com sucesso' });
    } else {
        res.json({ error: 'frase nao enconrtada' });
    }


}

export const getRandomPhrase = async (req: Request, res: Response) => {
    const phrase = await Phrase.findOne({
        order: [
            Sequelize.fn('RAND'),
        ]
    });

    if (phrase) {
        res.json({ phrase });
    } else {
        res.json({ error: 'nao ha frases cadastradas' })
    }
}

export const fileUpload = async (req: Request, res: Response) => {
    if(req.file) {
        const filename = req.file.filename + '.jpg';

        await sharp(req.file.path)
            .resize(500)
            .toFormat('jpeg')
            .toFile(`./public/media/${filename}.jpg`);

        await unlink(req.file.path);

        res.json({ image: `${filename}.jpg` })
    }else {
        res.json({error: "Arquivo não recebido."})
    }
}