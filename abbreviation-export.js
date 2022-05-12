/**
 * 程序目标：遍历所有数据，将找出缩写，并且输出到abbreviation.txt中
 * 程序描述：
 * 1.去重了
 * 2.可以找缩写
 */
const fs = require('fs')
 
//1.调用一些工具
const  {GetExcelData_Function} = require("./Step1-xlsx2List")//读取Excel数据的工具

const  {Get_deduplication} = require("./deduplication") //去重工具

//2.输入文件路径并使用List接收返回的变量
const List = GetExcelData_Function('D://Autodesk/Ives_data/employee_data.xlsx')

//4.准备好txt文件
let abbreviation = fs.createWriteStream('./abbreviation.txt', {
    encoding: 'utf8'
})

//5.遍历数组

 const LIST1 = [] //用来装List里边经过第一次去重的数据

 List.forEach((element) =>{

    if(element['Last Name'] == undefined && element['First Name'] == element['Name'])
      {
        LIST1.push(
              element['Account'],
              element['Name']
          )
      }
      ////情况2：'Last Name'为空 但是 'First Name'和'Name'内容不一致
      else if(element['Last Name'] == undefined && element['First Name'] != element['Name'])
      {
        LIST1.push(
              element['Account'],
              element['Name'],
              element['First Name']
          )
      }
      else
      {
        LIST1.push(
              element['Account'],
              element['Name'],
              element['First Name'],
              element['Last Name']
          )
      }
      ///TITLE目前没有情况
      LIST1.push(
          element['Title']
      )
 
     ///LOCATTION出现的情况：
      ////情况1：'State/Prov'为空 与 'City'和'Country'内容一致
      if(element['State/Prov'] == undefined && element['City'] == element['Country'])
      {
        LIST1.push(
              element['City'], 
              element['Geo'],
              element['Building'],
              element['Work Address']
          )
      }
       ////情况2：'State/Prov'为空，但是'City'和'Country'内容不一致
      else if(element['State/Prov'] == undefined && element['City'] != element['Country'])
      {
        LIST1.push(
              element['City'],
              element['Geo'],
              element['Country'],
              element['Building'],
              element['Work Address']
          )
      }
      else
      {
        LIST1.push(
              element['City'],
              element['State/Prov'],
              element['Geo'] ,
              element['Country'] ,
              element['Building'],
              element['Work Address']
          )
      }
      ///ORGANAIZATION目前没有情况
      LIST1.push(
          element['Organization Name'],
          element['Supervisory Org/Division']
     )

 })
 ///做个去重操作
 let LIST2 = Get_deduplication(LIST1) //用来装LIST1里经过去重的数据

 //6.开始匹配工作
 ///(1)数组全部变成一条字符串
 let LIST3 =  LIST2.join(' ') //用来装变成一条字符串的LIST2
 
 ///(2)对特定字符串进行正则表达式的匹配
 ////观察到的缩写特性：首字母大写+小写字母1-3个左右+特殊符号"."
 let regex = /[A-Z]{1}[a-z]{1,3}[.]/g

 ///(3)将匹配出来的缩写放入新数组中
 let Abbreviation = LIST3.match(regex)
 
 ///(4)去重
 const Abbreviation_Arry = Get_deduplication(Abbreviation)
 
 //7.各个数组放入abbreviation.txt中
 abbreviation.write(
        
        Abbreviation_Arry.join('\r\n')
    )
    console.log("导出成功！注意查收")