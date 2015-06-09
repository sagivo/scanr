var fs = require('fs');
var models_path = require('path').resolve(__dirname,'../app/models');

for (file in models_path){
	require(file)
}
#load models
require  consts.MODELS_PATH+'/'+model for model in fs.readdirSync(consts.MODELS_PATH)	