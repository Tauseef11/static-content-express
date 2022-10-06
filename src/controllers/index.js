const path = require('path');
const fs = require('fs');
const HTMLParser = require('node-html-parser');
const Handlebars = require('handlebars');
const {
  extractSubHeadingFromString,
  removeSubHeading,
  capitalizeFirstLetter,
  formatString,
} = require('./../utils/Utils');

const getResponse = (res, pathExists, heading, month, topic) => {
  let data = '';
  const HTML = path.join(__dirname, './../template.html');
  const document = HTMLParser.parse(fs.readFileSync(HTML)).toString();
  const temp = Handlebars.compile(document);

  if (fs.existsSync(pathExists)) {
    const fileContent =
      fs.readFileSync(pathExists, { encoding: 'utf8', flag: 'r' }) || 'NO DATA';
    const subHeading = extractSubHeadingFromString(
      fileContent,
      capitalizeFirstLetter(month),
      capitalizeFirstLetter(topic)
    );

    data = {
      content: formatString(removeSubHeading(fileContent, subHeading)),
      heading: capitalizeFirstLetter(heading),
      subheading: subHeading,
    };

    res.status(200).send(temp(data));
  } else {
    if (heading === 'baseURL') {
      data = {
        content: 'Home',
      };
      res.status(200).send(temp(data));
    } else {
      data = { content: 'Sorry, requested page not found.' };
      res.status(404).send(temp(data));
    }
  }
};

const getBase = (req, res) => {
  const baseURL = 'baseURL';
  getResponse(res, null, baseURL);
};

const getPage = (req, res) => {
  const page = req.params.page;
  const pathExists = path.join(__dirname, `./../content/${page}/index.md`);
  getResponse(res, pathExists, page);
};

const getBlog = (req, res) => {
  const heading = 'blog';
  const month = req.params.month;
  const topic = req.params.topic;
  const pathExists = path.join(
    __dirname,
    `./../content/blog/${month}/${topic}/index.md`
  );
  getResponse(res, pathExists, heading, month, topic);
};

module.exports = { getPage, getBlog, getResponse, getBase };
