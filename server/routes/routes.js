const router = require('express').Router();
const redisController = require('../controllers/redisController.js');
const userController = require('../controllers/userController.js');
const postController = require('../controllers/postController');
const likeController = require('../controllers/likesController');
const messageController = require('../controllers/messageController');
const friendController = require('../controllers/friendController');
const categoryController = require('../controllers/categoryController');
const followController = require('../controllers/followController');
const roomstatController = require('../controllers/roomstatController');
const hashController = require('../controllers/hashController');

//redis router?
router.get('/getcache/:id', redisController.getSomething);
router.post('/postcache', redisController.postSomething);

//user routes
router.get('/userid/:id', userController.getUserById);
router.get('/users/:id', userController.getUser);
router.post('/users', userController.addUser);
router.get('/allUsers', userController.getAllUsers);
router.delete('/users:/id', userController.deleteUser);

//posts
router.get('/posts/:id', postController.getPost);
// router.get('/posturl/:id', postController.getPostUrl);
router.post('/posts', postController.addPost);
router.delete('/posts/:id', postController.deletePost);

//likes
router.get('/likes/:id', likeController.getLike);
router.post('/likes', likeController.addLike);
router.delete('/likes/:id', likeController.deleteLike);

//message
router.get('/messages/:id', messageController.getMessage);
router.post('/messages', messageController.addMessage);
router.delete('/messages/:id', messageController.deleteMessage);

//friend
router.get('/friends/:id', friendController.getFriend)
router.post('/friends', friendController.addFriend)
router.delete('/friends/:id', friendController.deleteFriend)

//categories
router.get('/categories/:id', categoryController.getCategory)
router.post('/categories', categoryController.addCategory)
router.delete('/categories', categoryController.deleteCategory)
router.get('/categoryid/:id', categoryController.getCategoryById)

//follows
router.get('/follows/:id', followController.getFollow)
router.post('/follows', followController.addFollow)
router.delete('/follows', followController.deleteFollow)

//roomstat
// router.get('/rooms/:id', roomstatController.getRoomstat)
router.post('/rooms/', roomstatController.addRoomstat)
router.delete('/rooms/:id', roomstatController.deleteRoomstat)
router.put('/rooms/:id', roomstatController.updateRoomstat)
router.get('/rooms/:host_id', roomstatController.getRoomByHost)

//hashes
router.get('/hashes/:id', hashController.getHash)
router.post('/hashes', hashController.addHash)
// router.delete('/hashes', hashController.deleteHash)


//tweets
router.post('/tweets/:id', postController.search)
router.get('/auth', postController.authorize)
router.get('/embed/:id', postController.embed)

//youtube tags
router.get('/youtubetags/:id', postController.youTubeVideoTags)

//instagram
// router.get('/instagram/:id', postController.insta)
router.get('/instagram', postController.insta)

//comments
router.get('/comments/:id', postController.getComments)
//tags
router.get('/tags', postController.getPopularTags);


module.exports = router;