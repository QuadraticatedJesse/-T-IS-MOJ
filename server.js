// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const app = express();
const port = 3000;

// Serve static files from /static folder and serve images
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/images', express.static(path.join(__dirname, 'images')));


// Redirect bucket for old link /index.html -> /
app.get('/index.html', (req, res) => {
  res.redirect('/');
});

// Serve index.html for root route with Handlebars templating
app.get('/', (req, res) => {
  try {
    // Read the template file
    const templatePath = path.join(__dirname, 'index.html');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    console.log('Template source:', templateSource.substring(0, 100) + '...');

    // Compile the template
    const template = handlebars.compile(templateSource);

    // Data to pass to the template
    const data = {
      user: 'test user'
    };

    // Render the template with data
    const html = template(data);
    console.log('Rendered HTML length:', html.length);

    // Send the rendered HTML
    res.send(html);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

const allowedPages = ['T', 'M', 'O', 'J'];

const renderAboutPage = (res, page) => {
  if (!allowedPages.includes(page)) {
    return res.status(404).send('Page not found');
  }

  try {
    const templatePath = path.join(__dirname, 'aboutPages', `${page}.html`);
    if (!fs.existsSync(templatePath)) {
      return res.status(404).send('Page not found');
    }

    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    const data = { user: 'test user' };
    const html = template(data);
    res.send(html);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
};

app.get('/:page', (req, res) => {
  renderAboutPage(res, req.params.page);
});

app.get('/aboutPages/:page', (req, res) => {
  renderAboutPage(res, req.params.page);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});