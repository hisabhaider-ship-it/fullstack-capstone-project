// index.js - Sentiment Analysis
const natural = require('natural');

function analyzeSentiment(text) {
    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(text);
    return analyzer.getSentiment(tokens);
}

module.exports = analyzeSentiment;
