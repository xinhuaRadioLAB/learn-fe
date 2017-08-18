// http://www.iteye.com/news/30731

const fs = require('fs');
const esprima = require('esprima');

function analyzeCode(code) {
    const ast = esprima.parse(code);
    console.log('====================================');
    console.log(ast);
    console.log('====================================');
}

console.log('====================================');
console.log(process.argv);
console.log('====================================');

if (process.argv.length < 3) {
    console.log('Usage: index.js file.js');
    process.exit(1);
}

const filename = process.argv[2];
console.log('Reading ' + filename);

const code = fs.readFileSync(filename);

console.log('====================================');
console.log(code);
console.log('====================================');
analyzeCode(code);
console.log('Done');

/*
在上面的代码中： 

1.函数analyzeCode用于执行主要的代码分析工作，这里我们暂时预留下来这部分工作待后面去解决。 
2.我们需要确保用户在命令行中指定了分析文件的具体位置，这可以通过查看process.argv的长度来得到。为什么？你可以参考Node的官方文档： 
引用

The first element will be ‘node’, the second element will be the name of the JavaScript file. The next elements will be any additional command line arguments.
*/