/**名称：Step3-List2txt
 * 功能：将数组内的数据导出为txt
 * 版本：1.0
 * 存在问题：1.只导出了txt1(ner.txt)；
 *          2.最后一个元素总是没有自己的属性
 */
 const fs = require('fs')
 //1.调用Step1的函数
 const  {GetExcelData_Function} = require("./Step1-xlsx2List")
 
 //2.输入一个路径并使用List接收返回的变量
 const List = GetExcelData_Function('D://Autodesk/Ives_data/employee_data.xlsx')
  
 //3.准备好txt文件
 let ner = fs.createWriteStream('./result.txt', {
     encoding: 'utf8'
 })
 
 //4.遍历List里的所有对象，读对象{}里的属性[]
 //PEOPLE字段
 const people = []
 //TITLE字段
 const title = []
 
 //LOCATION字段
 const location = []
 
 List.forEach((element) =>
 {
     //放置符合条件的数据
      people.push(
          //认为还可以再改进改进，有些名字重复的
          element['Account'],
          element['Name'],
          element['First Name']
      )
 
      title.push(
          element['Title']
      )
 
      location.push(
          element['City'],
          element['State/Prov'],
          element['Geo'],
          element['Country'],
          element['Building'],
          element['Work Address'],
          element['Organization Name'],
          element['Supervisory Org/Division']
 
      )
 
 })
 //5.各个数组放入txt1中
     ner.write(
         people.join(',' + 'PEOPLE' + '\r\n') + 
         title.join(',' + 'TITLE' + '\r\n') +
         location.join(',' + 'LOCATION' + '\r\n')
     )
     console.log("ner.txt导出成功,注意查收")
 