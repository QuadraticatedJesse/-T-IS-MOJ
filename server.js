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

// Route for e1
app.get('/e1', (req, res) => {
  try {
    // Read the template file
    const templatePath = path.join(__dirname, 'e1.html');
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

// Route for e2
app.get('/e2', (req, res) => {
  try {
    // Read the template file
    const templatePath = path.join(__dirname, 'e2.html');
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});