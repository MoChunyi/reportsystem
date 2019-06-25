import $ from 'jquery';
var myUtils = {
    getOriginFileObjs: function(fileList) {
        var originFileObjs = [];
        fileList.map((item) => {
            originFileObjs.push(item.originFileObj);
        })
        return originFileObjs
    },
    jsonFileToObj: function(jsonFile) {
        var dataobj;
        var reader = new FileReader();
        reader.readAsText(jsonFile);
        reader.onload = function() {

        }
        reader.onloadend = function() {
            dataobj = $.parseJSON(reader.result);
            console.log("funcdata", dataobj)
            return dataobj;
        }       
    }
}

export default myUtils;