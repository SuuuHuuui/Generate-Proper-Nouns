/**名称：Step3-List2txt
 * 功能：将数组内的数据导出为txt
 * 版本：1.1
 * 更新：1.将undefine的数组元素删除；
 *      2.重写了数组push数据的方式，解决了最后一个元素总是没有自己的属性这一问题
 * 问题：只导出了ner.txt这一个文件
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
 
 //4.遍历List里的所有对象，读对象{}里的属性[]，用特定数组存放
 //PEOPLE字段
 const people = []
 //TITLE字段
 const title = []
 
 //LOCATION字段
 const location = []
 
 //ORGANIZATION字段
 const organization = []
 
 List.forEach((element) =>
 {
     //放置符合条件的数据
      people.push(
          //认为还可以再改进改进，有些名字重复的
          element['Account'] + ',PEOPLE',
          element['Name'] + ',PEOPLE',
          element['First Name'] + ',PEOPLE',
          element['Last Name'] + ',PEOPLE'
      )
 
      title.push(
          element['Title'] + ',TITLE'
      )
 
      location.push(
          element['City'] + ',LOCATION',
          element['State/Prov'] + ',LOCATION',
          element['Geo'] + ',LOCATION',
          element['Country'] + ',LOCATION',
          element['Building'] + ',LOCATION',
          element['Work Address'] + ',LOCATION',
          element['Supervisory Org/Division'] + ',LOCATION'
      )
 
      organization.push(
          element['Organization Name'] + ',ORGANIZATION'
     )
 
 })
 
 //把个别数组的空值去掉
 let PEOPLE = people.filter(item => item)
 
 let LOCATION = location.filter(item => item)
 
 
 //5.各个数组放入txt1中,join可以用的，但是先弄好了再放进去会好一些
     ner.write(
         PEOPLE.join('\r\n') + 
         title.join('\r\n') + 
         LOCATION.join('\r\n') + 
         organization.join('\r\n')
     )
 
     console.log("ner.txt导出成功！注意查收")
 