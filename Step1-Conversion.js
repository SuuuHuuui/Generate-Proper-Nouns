/*js名称：Conversion.js
* 更新功能：
1.xlxs数据标题行自行读入数组，不再使用手动对照增加
2.所得数组用module导出，不需要变成json
* 版本号2.2
*/
const xlsx = require("node-xlsx")
const fs = require("fs")

// 读取xlsx

function GetExcelData(Path)
{
    // 读取xlsx
    const sheets = xlsx.parse(Path)
    // 获取xlsx第一个标签栏的数据
    const sheetData = sheets[0].data

    // 定义数据列表

    const List = [] //装标题行+数据行

    const Title = sheetData[0]//读入标题行
    
    // 循环拼装数据
    sheetData.forEach((item, index) => 
    {
        //整一个新对象
        vot = {}
        if (index == 0)
            {
                return
            } 
                
        else 
            {
                  for(var i = 0 ; i < Title.length ; i++)
                  {
                        vot[Title[i]] = item[i]
                  }
                    
                  List.push(vot)
            }
        
    })
    return List
}

module.exports.GetExcelData_Function = GetExcelData