# scanr
come back later

##install
1. add `config/secrets.js` file with:
```javascript
module.exports = {
  MONGODB_URI: 'your mongo uri',
  CRYPT_KEY: 'choose random key to crypt'
}
```
2. start the server  
`supervisor -x iojs index.js`  
or  
`gulp s`
