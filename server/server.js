require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routeRoutes = require('./routes/routeRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');
const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/route', routeRoutes);
app.use('/api/suggestions', suggestionRoutes);

const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
