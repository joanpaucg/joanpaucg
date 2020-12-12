const fs=require("fs");
let Parser = require('rss-parser');
let parser = new Parser();
const scrapeIt = require("scrape-it");

const LATEST_ARTICLE_PLACEHOLDER="{{latest-article}}";
const LATEST_BOOKNAME_PLACEHOLDER="{{free-book}}";
const LATEST_BOOKIMAGE_PLACEHOLDER="{{image-book}}";
async function scrapeBook () {

    bookResult= await scrapeIt("https://www.packtpub.com/free-learning", {
        bookName:{
            selector: ".product-info__image img"
            , attr: "alt"
        }
        ,
        bookImage: {
            selector: ".product-info__image img"
            , attr: "src"
        }
    })
    //console.log(bookResult.data);
    return {bookName:bookResult.data.bookName,bookImage:bookResult.data.bookImage};

}
(async () => {

    const {items} = await parser.parseURL('https://lifehacker.com/rss');
    const [lastArticle]=items;
    //console.log(lastArticle.title);
    book= await scrapeBook ();
    //console.log(book);
    lastArticleMarkdown=`[${lastArticle.title}](${lastArticle.link})`;
    console.log(lastArticleMarkdown);
    let bookName="";
    let bookImage=""
    const markdownTemplate= fs.readFile('./README.tpl','utf-8',(err, data) => {
        if (err) throw err;
        var result = data.replace(LATEST_ARTICLE_PLACEHOLDER, lastArticleMarkdown).replace(LATEST_BOOKNAME_PLACEHOLDER, book.bookName).replace(LATEST_BOOKIMAGE_PLACEHOLDER, book.bookImage);
        //console.log(result);
        console.log(result);
        fs.writeFile('./README.md', result, 'utf8', function (err) {
            if (err) return console.log(err);
        });

    });

    //const newMarkdownTemplate=markdownTemplate.replace(LATEST_ARTICLE_PLACEHOLDER,lastArticleMarkdown);
   // console.log(newMarkdownTemplate);
})();





