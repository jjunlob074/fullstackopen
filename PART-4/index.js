const app = require('./app');
const connectToDatabase = require('./utils/mongoose');
const { PORT, MONGODB_URI } = require('./utils/config');

connectToDatabase(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
