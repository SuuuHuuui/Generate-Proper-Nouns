/**名称：Step3-List2txt
 * 功能：将数组内的数据导出为txt
 * 版本：1.2
 * 更新：1.做了数据筛选，包括去掉undefine的数据和第一次去重
 *       2.push完数据后进行了第二次去重
 *      
 * 问题:1.只导出了ner.txt这一个文件;2.等待发现问题
 */

 const fs = require('fs')
 //1.调用Step1的函数
 const  {GetExcelData_Function} = require("./Step1-xlsx2List")
 
 //2.输入一个路径并使用List接收返回的变量
 const List = GetExcelData_Function('D://Autodesk/Ives_data/employee_data.xlsx')
 
 //4.准备好txt文件
 let ner = fs.createWriteStream('./result.txt', {
     encoding: 'utf8'
 })
 
 //5.遍历List里的所有对象，读对象{}里的属性[]，用特定数组存放
 //并且进行数据筛选，包含了：去掉undefine和第一次去重(按行去重)
 
 const people = [] //PEOPLE字段
 
 const title = []  //TITLE字段
 
 const location = [] //LOCATION字段
 
 const organization = [] //ORGANIZATION字段
 
 List.forEach((element) =>
 {
     ///PEOPLE数据出现的情况：
      ////情况1：'Last Name'为空 与 'First Name'和'Name'内容一致
      if(element['Last Name'] == undefined && element['First Name'] == element['Name'])
      {
          people.push(
              element['Account'] + ',PEOPLE',
              element['Name'] + ',PEOPLE'
          )
      }
      ////情况2：'Last Name'为空 但是 'First Name'和'Name'内容不一致
      else if(element['Last Name'] == undefined && element['First Name'] != element['Name'])
      {
          people.push(
              element['Account'] + ',PEOPLE',
              element['Name'] + ',PEOPLE',
              element['First Name'] + ',PEOPLE'
          )
      }
      else
      {
          people.push(
              element['Account'] + ',PEOPLE',
              element['Name'] + ',PEOPLE',
              element['First Name'] + ',PEOPLE',
              element['Last Name'] + ',PEOPLE'
          )
      }
      ///TITLE目前没有情况
      title.push(
          element['Title'] + ',TITLE'
      )
 
     ///LOCATTION出现的情况：
      ////情况1：'State/Prov'为空 与 'City'和'Country'内容一致
      if(element['State/Prov'] == undefined && element['City'] == element['Country'])
      {
          location.push(
              element['City'] + ',LOCATION', 
              element['Geo'] + ',LOCATION',
              element['Building'] + ',LOCATION',
              element['Work Address'] + ',LOCATION'
          )
      }
       ////情况2：'State/Prov'为空，但是'City'和'Country'内容不一致
      else if(element['State/Prov'] == undefined && element['City'] != element['Country'])
      {
          location.push(
              element['City'] + ',LOCATION',
              element['Geo'] + ',LOCATION',
              element['Country'] + ',LOCATION',
              element['Building'] + ',LOCATION',
              element['Work Address'] + ',LOCATION'
          )
      }
      else
      {
          location.push(
              element['City'] + ',LOCATION',
              element['State/Prov'] + ',LOCATION',
              element['Geo'] + ',LOCATION',
              element['Country'] + ',LOCATION',
              element['Building'] + ',LOCATION',
              element['Work Address'] + ',LOCATION'
          )
      }
      ///ORGANAIZATION目前没有情况
      organization.push(
          element['Organization Name'] + ',ORGANIZATION',
          element['Supervisory Org/Division'] + ',LOCATION'
     )
 
 })
 
 ///数组的第二次去重
 const PEOPLE = deduplication(people)
 
 const TITLE = deduplication(title)
 
 const LOCATION = deduplication(location)
 
 const ORGANAIZATION = deduplication(organization)
 
 ////去重函数
 function deduplication(arr)
 {
    let s1 = new Set(arr)
    let arr2 = []
    for(let item of s1)
    {
     arr2.push(item)
    }
    return arr2
 }
 
 //6.各个数组放入txt1中
     ner.write(
         PEOPLE.join('\r\n') + 
         ('\r\n') + 
         TITLE.join('\r\n') + 
         ('\r\n') + 
         LOCATION.join('\r\n') + 
         ('\r\n') + 
         ORGANAIZATION.join('\r\n')
     )
 
     console.log("ner.txt导出成功！注意查收")
 