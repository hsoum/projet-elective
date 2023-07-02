const Article = require('../models/article')
const fs = require('fs');
const path = require('path');
const multer = require('multer');

exports.createArticle = (req, res) => {
    const { name, description, price, type, restaurant_id } = req.body
    // Vérifie si un fichier de photo est disponible

    if (!req.file) {
        return res.status(400).json({ error: 'Photo is required' });
    }
    // Récupère le nom du fichier de la photo
    const photoName = req.file.filename;
    // Récupère l'ID de l'utilisateur connecté
    const userid = req.userid;
    // Créez un nouvel article avec les données fournies
    const article = new Article({
        name,
        description,
        price,
        type,
        photo: photoName, // Enregistre le nom du fichier de la photo
        restaurateur_id: userid, // Ajoutez l'ID de l'utilisateur à l'article
        restaurant_id,
    });
    // Sauvegardez l'article dans la base de données
    article
        .save()
        .then((createdArticle) => {
            return res.status(201).json({ article: createdArticle });
        })
        .catch((error) => {
            // En cas d'erreur, supprimez le fichier de la photo
            fs.unlinkSync(path.join(__dirname, '../public/uploads/images', photoName));
            return res.status(400).json({ error });
        });
};

exports.getOneArticle = (req, res) => {
    const id = req.params.id;

    Article.findOne({ _id: id })
        .then((article) => { return res.status(201).json({ article }) })
        .catch((error) => { return res.status(400).json({ error }) })
}
exports.getAllArticles = (req, res) => {
    Article.find()
        .then((articles) => {
            return res.status(200).json({ articles });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        });
};

exports.updateArticle = (req, res) => {
    const { name, description, price, type } = req.body;
    const { id } = req.params;

    Article.findById(id)
        .then((article) => {
            if (!article) {
                return res.status(404).json({ error: 'Article not found' });
            }

            // Vérifie si un fichier de photo est disponible
            if (req.file) {
                // Récupère le nom du fichier de la nouvelle photo
                const newPhotoName = req.file.filename;
                // Supprime l'ancienne photo du système de fichiers
                // fs.unlinkSync(
                //     path.join(__dirname, '../public/uploads/images', article.photo)
                // );
                // Met à jour le nom de la photo avec le nouveau nom de fichier
                article.photo = newPhotoName;
            }

            // Met à jour les autres champs de l'article
            article.name = name;
            article.description = description;
            article.price = price;
            article.type = type;

            return article.save();
        })
        .then((updatedArticle) => {
            return res.json({ article: updatedArticle });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        });
};

exports.deleteArticle = (req, res) => {
    const { id } = req.params;

    Article.findByIdAndRemove(id)
        .then((article) => {
            if (!article) {
                return res.status(404).json({ error: 'Article not found' });
            }

            // Optionally, you can delete the associated photo from the file system
            // fs.unlinkSync(
            //     path.join(__dirname, '../public/uploads/images', article.photo)
            // );

            return res.json({ message: 'Article deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting article:', error);
            return res.status(400).json({ error });
        });
};



