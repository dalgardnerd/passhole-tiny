const fs = require('fs');
const path = require('path');

function extractInlineScript(htmlFilePath) {
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

  // Extract inline <script> tags and their content
  const inlineScripts = htmlContent.match(/<script\b[^>]*>([\s\S]*?)<\/script>/g);

  if (!inlineScripts) {
    console.log('No inline scripts found in the HTML file.');
    return;
  }

  // Remove inline scripts from HTML content
  const htmlContentWithoutScripts = htmlContent.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '<script src="./script.js"></script>');

  // Write modified HTML content back to the file
  fs.writeFileSync(htmlFilePath, htmlContentWithoutScripts);

  // Create a new JavaScript file for extracted scripts
  const scriptFilePath = path.join(path.dirname(htmlFilePath), 'script.js');
  fs.writeFileSync(scriptFilePath, '');

  // Append extracted scripts to the JavaScript file
  inlineScripts.forEach((scriptTag) => {
    const scriptContent = scriptTag.replace(/<\/?script\b[^>]*>/g, '');
    fs.appendFileSync(scriptFilePath, scriptContent);
  });

  console.log('Inline scripts have been extracted and moved to script.js.');
}

// Usage example
const htmlFilePath = path.join(__dirname, 'build/index.html');
extractInlineScript(htmlFilePath);
