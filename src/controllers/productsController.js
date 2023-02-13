const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = (products) => {
	fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8')
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render('products',{
		products,
		toThousand,
	    })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		const { id } = req.params
		const product = product.find(product => product.id == Number(id))
		res.send(product)
		res.render('detail', 
		product)

	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const {name, price,discount, category, description} = req.body
		const id = Math.max(...products.map(el => el.id))
		const newProduct = {
			id : id + 1,
			name,
			price,
			discount,
			category,
			description,
			image : 'default-image.png'
		}

		products.push(newProduct)
		writeJson(products)
		res.send(products)
		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		res.render('product-edit-form')
	},
	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params
		const product = products.find(produc => product.id === +id)
		if(!product){
			return res.send('no existe el producto')
		}
		const { name, price, discount, category, description} = req.body
		products.forEach(product => {
			if(product.id == id) {
				
			}
		})
		res.redirect('/products')
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;