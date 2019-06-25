import {saveAs} from 'file-saver';
var  OhSheet = {
    getRow: function(rowIndex, columnNumber, sheet) {
        var row = [];
        for(var i = 0; i < columnNumber; i++) {
            row.push(sheet.getValue(rowIndex - 1, i));
        }
        return row;       
    },

    getRows: function(indexOfFirstRow, rowNumbers, columnNumber, sheet) {
        var rows = [];
        for (var i = 0; i < rowNumbers; i++) {
            rows.push(this.getRow(i, columnNumber, sheet));
        }
        return rows;
    },
    getColumnHeaders: function(sheet) {
        var columnHeaders = [];
        var columnCount = sheet.getColumnCount();
        sheet.getArray(0,0,1,columnCount)[0].forEach(element => {
            if(element) {
                columnHeaders.push(element);
            }
        });      
        return columnHeaders;
    },
    getFilterResults: function() {

    },

    saveAsJson: function(spread) {
        var sheetNum = spread.getSheetCount();
        var WorkbookData = {
            "sheetNum": sheetNum,
            "sheetsData" : []
        }
        // var sheetsData = [];
        
        
        for (var i = 0; i < sheetNum; i++) {
            var sheetData = {
                "sheetName":null,
                "sheetHeader": [],
                "sheetHeaderType":[],
                "data": []
            };
            //引入正则表达式测试数据的类型
            var regu = "^([0-9])[0-9]*(\\.\\w*)?$";//判断是否为数字
            var re = new RegExp(regu);
            var sheetHeader = [];
            var data = [];
            var sheetHeaderType =[];
            var currentSheet = spread.getSheet(i);
            sheetHeader = this.getColumnHeaders(currentSheet);
            for (var j = 0; j < sheetHeader.length; j++) {
                var colData = [];
                for (var k = 1; k < currentSheet.getRowCount(); k++) {
                    colData.push(currentSheet.getValue(k, j));
                }
                data.push(colData);
            }

            for (var m =0;m<sheetHeader.length;m++)
            {
                var colFirstData =currentSheet.getValue(1,m);
                if (re.test(colFirstData))
                {
                    sheetHeaderType.push('number')
                }
                else
                {
                    sheetHeaderType.push('string')

                }
            }

            sheetData.sheetHeader = sheetHeader;
            sheetData.sheetName = currentSheet.name();
            sheetData.data = data;
            sheetData.sheetHeaderType = sheetHeaderType;
            WorkbookData.sheetsData.push(sheetData);
            
        }

        var blob = new Blob([JSON.stringify(WorkbookData)], { type: "" });
        saveAs(blob, "WorkbookData.json");
    },

    saveAsJsonByRow: function(spread) {
        var sheetNum = spread.getSheetCount();
        var WorkbookData = {
            "sheetNum": sheetNum,
            "sheetsData": []
        }

        for (var i = 0; i < sheetNum; i++) {
            var sheetData = {
                "sheetName": null,
                "sheetHeader": [],
                "sheetHeaderType": [],
                "data": []
            }

            //引入正则表达式测试数据的类型
            var regu = "^([0-9])[0-9]*(\\.\\w*)?$";//判断是否为数字
            var re = new RegExp(regu);

            var sheetHeader = [];
            var sheetHeaderType = [];
            var data = [];

            var currentSheet = spread.getSheet(i);
            sheetHeader = this.getColumnHeaders(currentSheet);

            for (var m =0;m<sheetHeader.length;m++)
            {
                var colFirstData =currentSheet.getValue(1,m);
                if (re.test(colFirstData))
                {
                    sheetHeaderType.push('number')
                }
                else
                {
                    sheetHeaderType.push('string')

                }
            }

            for (var rowIndx = 1; rowIndx < currentSheet.getRowCount(); rowIndx++) {
                var row_data = {};
                for (var colIndex = 0; colIndex < sheetHeader.length; colIndex++) {
                    row_data[sheetHeader[colIndex]] = currentSheet.getValue(rowIndx, colIndex);
                }

                data.push(row_data);
            }

            sheetData.sheetHeader = sheetHeader;
            sheetData.sheetName = currentSheet.name();
            sheetData.data = data;
            sheetData.sheetHeaderType = sheetHeaderType;
            WorkbookData.sheetsData.push(sheetData);

        }

        var blob = new Blob([JSON.stringify(WorkbookData)], { type: "" });
        saveAs(blob, "WorkbookData_ROW.json");
    }
}

export default OhSheet;
