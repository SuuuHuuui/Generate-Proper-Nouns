/*js名称：Conversion.js
* 更新功能：
1.xlxs数据标题行自行读入数组，不再使用手动对照增加
2.所得数组用module导出，不需要变成json
* 版本号2.0
*/
const xlsx = require("node-xlsx")
const fs = require("fs")

// 读取xlsx
const sheets = xlsx.parse("./Employee_data.xlsx")

// 获取xlsx第一个标签栏的数据,注意是从0开始的
const sheetData = sheets[0].data

// 定义数据列表
let testTitle =  [] //装标题行

let testList = [] //装标题行+数据行

testTitle = sheetData[0]//读入标题行

// 循环拼装数据
sheetData.forEach((item, index) => 
{
    if (index == 0)
        {
           return
        } 
    //数据行和标题行做拼接
    else 
        {
            for(i = 0 ;i < testTitle.length ; i++)
            {
                testList.push({

                    [testTitle[i]] : item[i]

                })
            }
           
        }
       
})
module.exports.testList = testList