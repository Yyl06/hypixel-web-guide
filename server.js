const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/farming-guide/pdf', (req, res) => {
  res.sendFile(path.join(__dirname, 'Farming.pdf'));
});

const pageRoutes = {
  '/guides': 'farming-guide',
};

Object.entries(pageRoutes).forEach(([route, folder]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', folder, 'index.html'));
  });
});

// Vercel imports the app as a serverless function; listen only for local runs.
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = app;