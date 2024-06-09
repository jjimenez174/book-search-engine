async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Mongoose connected to the database');
    } catch (error) {
      console.error('Mongoose connection error:', error);
    }
  }
  
  connectToDatabase();
  
  module.exports = mongoose.connection;
