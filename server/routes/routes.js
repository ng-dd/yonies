const router = require('express').Router();
const redisController = require('../controllers/redisController.js');
const userController = require('../controllers/userController.js');
const postController = require('../controllers/postController');
const likeController = require('../controllers/likesController');
const messageController = require('../controllers/messageController');
const friendController = require('../controllers/friendController');
const categoryController = require('../controllers/categoryController');
const roomstatController = require('../controllers/roomstatController');
const hashController = require('../controllers/hashController');

//redis router?
router.get('/getcache/:id', redisController.getSomething);
router.post('/postcache', redisController.postSomething);

//user routes
router.get('/users/:id', userController.getUser);
router.post('/users', userController.addUser);
router.delete('/users', userController.deleteUser);

//posts
router.get('/posts/:id', postController.getPost);
router.post('/posts', postController.addPost);
router.delete('/posts', postController.deletePost);

//likes
router.get('/likes/:id', likeController.getLike);
router.post('/likes', likeController.addLike);
router.delete('/likes', likeController.deleteLike);

//message
router.get('/messages/:id', messageController.getMessage);
router.post('/messages', messageController.addMessage);
router.delete('/messages', messageController.deleteMessage);

//friend
router.get('/friends/:id', friendController.getFriend)
router.post('/friends', friendController.addFriend)
router.delete('/friends', friendController.deleteFriend)

//categories
router.get('/categories/:id', categoryController.getCategory)
router.post('/categories', categoryController.addCategory)
router.delete('/categories', categoryController.deleteCategory)

//roomstat
router.get('/rooms/:id', roomstatController.getRoomstat)
router.post('/rooms', roomstatController.addRoomstat)
router.delete('/rooms', roomstatController.deleteRoomstat)

//hashes
router.get('/hashes/:id', hashController.getHash)
router.post('/hashes', hashController.addHash)
// router.delete('/hashes', hashController.deleteHash)

//tweets
router.get('/tweets/:id', postController.getTweets)

module.exports = router;