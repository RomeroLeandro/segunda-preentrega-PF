const express = require('express');
const messageRouter = express.Router();
const MessageManager = require('../dao/manager/message-manager');

const messageManager = new MessageManager();

messageRouter.get('/new', (req, res) => {
  res.render('messageForm', { message: {} });
});

messageRouter.get('/edit/:id', async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await messageManager.getMessageById(messageId);
    res.render('messageForm', { message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

messageRouter.get('/', async (req, res) => {
  try {
    const messages = await messageManager.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

messageRouter.post('/', async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = await messageManager.createMessage(user, message);
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

messageRouter.put('/:id', async (req, res) => {
  try {
    const messageId = req.params.id;
    const { user, message } = req.body;
    const updatedMessage = await messageManager.updateMessage(
      messageId,
      user,
      message
    );
    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

messageRouter.delete('/:id', async (req, res) => {
  try {
    const messageId = req.params.id;
    await messageManager.deleteMessage(messageId);
    res.json({ message: 'Mensaje eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = messageRouter;