/**js名称：Conversion.js
 * 实现功能：将xlxs转化成json
 * 版本号1.0
 */

const xlsx = require("node-xlsx")
const fs = require("fs")
 
// 读取xlsx
const sheets = xlsx.parse("./Employee_data.xlsx")

// 获取xlsx第一个标签栏的数据,注意是从0开始的
const sheetData = sheets[0].data
//console.log(sheets[0].data)

// 定义数据列表
let testList = [] //装标题行+数据行


// 循环拼装数据
sheetData.forEach((item, index) => 
{
     if (index == 0)
         {
            return
         } 
     //读数据行
     else 
         {
             testList.push({
                ID: item[0],
                Account: item[1],
                Name: item[2],
                'First Name': item[3],
                'Last Name': item[4],
                Title: item[5],
                City: item[6],
                'State/Prov': item[7],
                Geo: item[8],
                Country: item[9],
                Building: item[10],
                'Work Address':item[11],
                'Organization Name': item[12],
                'Supervisory Org/Division': item[13]
             })
           
            
         }
        
})

console.log(testList)
 
//const jsonObj = testList
 
// 不压缩的情况
// fs.writeFileSync('./Test_Employee1.json',JSON.stringify(jsonObj, null, "\t"));
 
// 压缩的情况
//fs.writeFileSync("./Employee_result.json", JSON.stringify(jsonObj))
 
//console.log('文件转换完成')
