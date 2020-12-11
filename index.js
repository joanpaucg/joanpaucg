const fs=require("fs");
let Parser = require('rss-parser');
let parser = new Parser();

const LATEST_ARTICLE_PLACEHOLDER="{{latest-article}}";


(async () => {

    const {items} = await parser.parseURL('https://lifehacker.com/rss');
    const [lastArticle]=items;
    //console.log(lastArticle.title);
    lastArticleMarkdown=`[${lastArticle.title}](${lastArticle.link})`;
    console.log(lastArticleMarkdown);
    const markdownTemplate= fs.readFile('./README.tpl','utf-8',(err, data) => {
        if (err) throw err;
        var result = data.replace(LATEST_ARTICLE_PLACEHOLDER, lastArticleMarkdown);
        console.log(result);
        fs.writeFile('./README.md', result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
    //const newMarkdownTemplate=markdownTemplate.replace(LATEST_ARTICLE_PLACEHOLDER,lastArticleMarkdown);
   // console.log(newMarkdownTemplate);
})();


