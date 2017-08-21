const fs = require('fs');
const esprima = require('esprima');
const estraverse = require('estraverse');

function analyzeCode(code) {
    var ast = esprima.parse(code);

    var functionsStats = {}; //1 我们创建了一个对象functionStats用来存放函数的调用和声明的统计信息，函数名作为key 

    var addStatsEntry = function (funcName) { //2 函数addStatsEntry用于实现存放统计信息。 
        if (!functionsStats[funcName]) {
            functionsStats[funcName] = { calls: 0, declarations: 0 };
        }
    };

    // 3 遍历AST
    // estraverse.traverse(ast, {
    //     enter: function (node) {
    //         if (node.type === 'FunctionDeclaration') {
    //             addStatsEntry(node.id.name); //4 如果发现了函数声明，增加一次函数声明 
    //             functionsStats[node.id.name].declarations++;
    //         } else if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
    //             addStatsEntry(node.callee.name);
    //             functionsStats[node.callee.name].calls++; //5 如果发现了函数调用，增加一次函数调用
    //         }
    //     }
    // });

    // processResults(functionsStats);

    console.log('====================================');
    console.log(JSON.stringify(ast, null, '  '));
    console.log('====================================');
}

function processResults(results) {
    for (var name in results) {
        if (results.hasOwnProperty(name)) {
            var stats = results[name];
            if (stats.declarations === 0) {
                console.log('Function "', name, '" undeclared');
            } else if (stats.declarations > 1) {
                console.log('Function "', name, '" decalred multiple times');
            } else if (stats.calls === 0) {
                console.log('Function "', name, '" declared but not called');
            }
        }
    }
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

