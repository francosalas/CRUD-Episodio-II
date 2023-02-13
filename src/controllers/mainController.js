const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic
		let productsInSale = products.filter(product => product.category === "in-sale");
		let productsVisited = products.filter(product => product.category === "visited");

		res.render("index", {
			title: "Mercado Liebre",
			productsVisited,
			productsInSale,
			toThousand
		})
	},
	search: (req, res) => {
		// Do the magic
		const {keywords} = req.query
		const results = products.filter(product => product.name.tolowerCase() == keywords.tolowerCase())

		//res.send(keywords)
		res.send(keywords)
		res.render('results', {
			keywords,
			results,
			toThousand,
		})
	},
};

module.exports = controller;
