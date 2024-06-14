const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    login: async (parent, { username, password }) => {
        const user = await User.findOne({ username });
        if (!user) {
          throw AuthenticationError;
        }
        const correctPw = await profile.isCorrectPassword(password);
        if (!correctPw) {
          throw AuthenticationError;
        }
        const token = signToken(user);
        return { token, user };
      },
      addUser: async (parent, { email, username, password }) => {
        const user = await User.create({ email, username, password });
        const token = signToken(user);
        return { token, user };
      },
      saveBook: async (parent, { authors, description, bookId, image, link, title }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $addToSet: { books: {authors, description, bookId, image, link, title} },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        throw AuthenticationError;
      },
      removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { books: {bookId} } },
            { new: true }
          );
        }
        throw AuthenticationError;
      },
  }
};
module.exports = resolvers;