const url = require('url')

const myUrl = new URL('https://website.com/home?id=22&statu=live')

// Serialized Url
console.log(myUrl.href)
console.log(myUrl.toString())

// Host (root domain)
console.log(myUrl.hostname)

//Host name (doesnt get the port)
console.log(myUrl.hostname)

//Path name
console.log(myUrl.pathname)

//Serialized query
console.log(myUrl.search)

// params object
console.log(myUrl.searchParams)

// add param
myUrl.searchParams.append('name', "Abderrahmane")
console.log(myUrl.searchParams)

// loop through params
myUrl.searchParams.forEach((value, param) =>{
    console.log(value)
    console.log(param)
})
