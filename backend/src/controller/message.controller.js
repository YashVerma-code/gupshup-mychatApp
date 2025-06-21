import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";

export const fetchUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error occured during fetchUsers controller : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: receiverId } = req.params;
    // console.log("Call to getmessage api \n");
    // console.log(`Id : recieverId ${receiverId} and userId: ${userId}`);
    if (!userId || !receiverId) {
      return res.status(400).json({ message: "All fields are required " });
    }
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    // console.log("Error occured during getMessages controller : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl = "";
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message: text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      console.log(`Sending realtime mssg to ${receiverSocketId}`);
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error occured during sendMessage controller : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
