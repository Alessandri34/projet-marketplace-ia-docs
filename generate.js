const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..');
const targetDir = __dirname;

const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md')).sort();
const docs = files.map(file => {
    return {
        name: file,
        content: fs.readFileSync(path.join(docsDir, file), 'utf8')
    };
});

const jsonStr = 'const markdownData = ' + JSON.stringify(docs) + ';';

// Write to main viewer
fs.writeFileSync(path.join(targetDir, 'data.js'), jsonStr);
// Write to synthesis viewer
fs.writeFileSync(path.join(targetDir, 'synthesis', 'data.js'), jsonStr);

console.log('Successfully generated data.js with ' + docs.length + ' documents.');
