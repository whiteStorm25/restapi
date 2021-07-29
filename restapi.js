const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

// get all users
app.get('/getUsers' , (req,res) =>{
	fs.readFile("./users.txt" , "utf-8" , (err,data) =>{
		data = data ? JSON.parse(data) : [];
		console.log(data)
			res.send(data)
	})
	
})

//get selected user
app.get('/getUsers/:id' , (req,res) =>{
	var id = req.params.id
	console.log(id)
	fs.readFile("./users.txt" , "utf-8" , (err,data) =>{
		data = data ? JSON.parse(data) : [];
		data.forEach(function(users){
			if(users.UserId == id){
				console.log("Id matched")
				res.send(users)
			}
		})
	})
	
})

//delete req
app.delete("/deleteUser/:id" , (req,res) =>{
	var id = req.params.id
	console.log(id)
	fs.readFile("./users.txt" , "utf-8" , (err,data) =>{
		data = data ? JSON.parse(data) : [];
		for(let i =0 ; i<data.length ; i++){
			if(data[i].UserId == id){
				data.splice(i,1)
				console.log("Id deleted")
				console.log(data)
				res.send("User Deleted"+ JSON.stringify(data))
			}
		}
	})
})

//create
app.post("/createUser" , (req,res) =>{
	console.log(req.body)
	let newdata = req.body
	fs.readFile("./users.txt" , "utf-8" , (err,data) =>{
		data = data ? JSON.parse(data) : [];
		data.push(newdata)
		data = JSON.stringify(data)
		fs.writeFile("./users.txt" , data , (err) =>{
			if(err)
			res.send(err)
			res.send(data)
		})
	})
})

//update request

app.put('/Update/:id' , (req,res) =>{
	var id = req.params.id
	console.log(id)
	var newname = req.query.name
	console.log(newname)
	var newage = req.query.age
	console.log(newage)
	fs.readFile("./users.txt" , "utf-8" , (err,data) =>{
		data = data ? JSON.parse(data) : [];
		data.forEach(function(users){
			if(users.UserId == id){
				if(newname)
				users.name = newname
				if(newage)
				users.Age = newage
				console.log("Updated Id")
				res.send(users)
			}
		})
	})
	
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
