 const xlsx = require("node-xlsx")
 const fs = require("fs")
  
 function GetExcelData(Path)
 {
     // 读取xlsx路径
     const sheets = xlsx.parse(Path)
     // 获取xlsx第一个标签栏的数据
     const sheetData = sheets[0].data  
     // 定义数据列表
     const testList = [] 
     const testTitle = sheetData[0]

     // 循环拼装数据
     sheetData.forEach((item, index) => 
     {
         // 整一个新对象
         NewVot = {}
         if (index == 0) 
         {
             return 
         } 
         else 
          {
             
             for( i = 0 ; i < testTitle.length ; i++ )
              {
                 NewVot[testTitle[i]] = item[i]
              }
 
              testList.push(NewVot)
          }
     })
     return testList
 }
 
 module.exports.GetExcelData_Function = GetExcelData



 



