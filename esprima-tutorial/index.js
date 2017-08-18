const fs = require('fs');
const esprima = require('esprima');
const estraverse = require('estraverse');

function analyzeCode(code) {
    // 1  
    const ast = esprima.parse(code);
    estraverse.traverse(ast, {
        enter: function (node) {
            console.log(node.value);
        }
    });
    // console.log('====================================');
    // console.log(JSON.stringify(ast, null, '  '));
    // console.log('====================================');
}

// 2  
if (process.argv.length < 3) {
    console.log('Usage: index.js file.js');
    process.exit(1);
}

// 3  
const filename = process.argv[2];
console.log('Reading ' + filename);
const code = fs.readFileSync(filename, 'utf-8');

analyzeCode(code);
console.log('Done');  
