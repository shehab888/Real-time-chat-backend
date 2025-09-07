const mongoose = require("mongoose");

const chatShema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
      required: [true, "the name of the chat is required"],
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "the chats must has users"],
      },
    ],
    groupOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [
        function () {
          return this.isGroupChat; // required only if it's a group chat
        },
        "It must be that the chat has an owner user", // custom error message
      ],
    },
    groupAdmins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: [
        //   function () {
        //     return this.isGroupChat; // required only if it's a group chat
        //   },
        //   "It must be that the chat has an admin user", // custom error message
        // ],
      },
    ],
    groupDescription: {
      type: String,
      maxlength: 500,
    },
    groupPicture: {
      type: String,
      default: "",
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    pinnedMessages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    chatSettings: {
      muteNotifications: {
        type: Boolean,
        default: false,
      },
      allowOnlyAdminsToSend: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatShema);

module.exports = Chat;
