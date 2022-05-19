/**名称：Synonyms-export.js
 * 功能：进行数据的补全操作
 * 再拼接缩写补全那一组
 */
 const fs = require('fs')
 
 //1.调用函数
 const  {GetExcelData_Function} = require("./Step1-xlsx2List")//读入数据函数
 
 const  {Get_deduplication} = require("./deduplication") //去重函数
 
 const {Get_Complettions} = require("./Completion")//补全函数
 
 //2.输入一个路径并使用List接收返回的变量
 //const List = GetExcelData_Function('D://Autodesk/Ives_data/employee_data.xlsx')
 const List = GetExcelData_Function('D://Autodesk/Ives_task/Employees/Employees/All Employees.xlsx')
 
 //4.准备好txt文件
 let synonyms = fs.createWriteStream('./synonyms.txt', {
     encoding: 'utf8'
 })
 
 //5.遍历List,找出符合条件的数据
 const shorthand_LIST1 = []//放简写
 
 const Abbreviation_LIST1 = []//放缩写
 
 const Name = [] //用来放Account和Name的拼接数据
 
 List.forEach((element) =>{
 
     if(element['Last Name'] == undefined && element['First Name'] == element['Name'])
       {
         Abbreviation_LIST1.push(
               element['Account'],
               element['Name']
           )
       }
       
       else if(element['Last Name'] == undefined && element['First Name'] != element['Name'])
       {
         Abbreviation_LIST1.push(
               element['Account'],
               element['Name'],
               element['First Name']
           )
       }
       else
       {
         Abbreviation_LIST1.push(
               element['Account'],
               element['Name'],
               element['First Name'],
               element['Last Name']
           )
       }
     
       ///TITLE目前没有情况，先匹配title的
       shorthand_LIST1.push(
           element['Title']
       )
       Abbreviation_LIST1.push(
         element['Title']
     )
     
       ///
       if(element['State/Prov'] == undefined && element['City'] == element['Country'])
       {
         shorthand_LIST1.push(
               element['City'], 
               element['Geo'],
               element['Building'],
               element['Work Address']
           )
 
         Abbreviation_LIST1.push(
             element['City'], 
             element['Geo'],
             element['Building'],
             element['Work Address']
         )
       }
        ////情况2：'State/Prov'为空，但是'City'和'Country'内容不一致
       else if(element['State/Prov'] == undefined && element['City'] != element['Country'])
       {
         shorthand_LIST1.push(
               element['City'],
               element['Geo'],
               element['Country'],
               element['Building'],
               element['Work Address']
           )
 
         Abbreviation_LIST1.push(
             element['City'],
             element['Geo'],
             element['Country'],
             element['Building'],
             element['Work Address']
         )
       }
       else
       {
         shorthand_LIST1.push(
               element['City'],
               element['State/Prov'],
               element['Geo'] ,
               element['Country'] ,
               element['Building'],
               element['Work Address']
           )
         Abbreviation_LIST1.push(
             element['City'],
             element['State/Prov'],
             element['Geo'] ,
             element['Country'] ,
             element['Building'],
             element['Work Address']
         )
       }
 
       shorthand_LIST1.push(
         element['Organization Name'],
         element['Supervisory Org/Division']
      )
      Abbreviation_LIST1.push(
         element['Organization Name'],
         element['Supervisory Org/Division']
     )
  
      //用来放Account和Name的拼接数据
      Name.push(
 
          element['Account'] + ',' + element['Name']
      )
     
  })
  //6.匹配字符并进行切割
  ///(1)简写shorthand部分：
  let shorthand_LIST2 = Get_deduplication(shorthand_LIST1) //用来装shorthand_LIST1里经过去重的数据
  
  shorthand_LIST2.unshift("$$")
  
  shorthand_LIST2.push("$$")
  
  let shorthand_LIST3 = shorthand_LIST2.join("$$")
  
  ////观察到的简写特性:首字母大写+第二个字母也大写，但是是要分出来一个数据，所以具体可看copy.js
  const shorthand_regex =/[$][$][A-Z]{1}[A-Z]{1,4}[ ]{0,1}[-]{0,1}[ ]{0,1}[a-zA-Z]{0,}[,]{0,1}[ ]{0,1}[a-zA-Z]{0,}[ ]{0,1}[&]{0,1}[ ]{0,1}[a-zA-Z]{0,}[ ]{0,1}[-]{0,1}[ ]{0,1}\w{0,}[,]{0,1}[ ]{0,1}\w{0,}[ ]{0,1}[-]{0,1}[ ]{0,1}\w{0,}[,]{0,1}[ ]{0,1}[&]{0,1}[ ]{0,1}\w{0,}[ ]{0,1}[-]{0,1}[ ]{0,1}\w{0,}[,]{0,1}[ ]{0,1}[&]{0,1}[ ]{0,1}\w{0,}|[$][$]\w{0,}[ ]{0,}[&]{0,1}[ ]{0,1}\w{0,}[ ]{0,}[&]{0,1}[ ]{0,1}\w{0,}[ ]{0,}[&]{0,1}[ ]{0,1}[/]{0,1}[,]{0,1}[ ]{0,1}[A-Z]{1}[A-Z]{1,4}/g
  //切割字符串
  let shorthand_Arry1 = shorthand_LIST3.match(shorthand_regex)
  
  ///(2)简写abbreviation部分：
 
  let Abbreviation_LIST2 = Get_deduplication(Abbreviation_LIST1)//用来装Abbreviation_LIST2里经过去重的数据
 
  let Abbreviation_LIST3 = Abbreviation_LIST2.join("$$")
  
  /////观察到的缩写特性：首字母大写+小写字母1-5个左右+特殊符号"."，集体看copy.js
  const abbreviation_regex = /[$][$][A-Z]{1}[a-z]{1,5}[.][ ]{0,1}\w{0,}[,]{0,1}[ ]{0,1}[/]{0,1}\w{0,}[.]{0,1}[ ]{0,1}[,]{0,1}[ ]{0,1}\w{0,}[ ]{0,1}\w{0,}[.]{0,1}/g
  
  ////字符串切割
  let abbreviation_Arry1 = Abbreviation_LIST3.match(abbreviation_regex)
  
  
  //7.进行一些符号的去除操作
  ///(1)对于简写：
  const shorthand_Arry2 = []//用于放置shorthand_Arry1去掉$$符号的数据
  shorthand_Arry1.forEach((element)=>
  {
      let shorthand_temporary_array = []
      shorthand_temporary_array = element.slice(2,element.length)
      shorthand_Arry2.push(shorthand_temporary_array)
      
  })
 
  ///(2)对于缩写：
  const abbreviation_Arry2 = []////用于放置abbreviation_Arry1去掉$$符号的数据
  abbreviation_Arry1.forEach((element)=>
  {
     let abbreviation_temporary_array = []
     abbreviation_temporary_array = element.slice(2,element.length)
     abbreviation_Arry2.push(abbreviation_temporary_array)
  })
 
  //8.将两个数组拼接在一起
 
  const shorthand_abbreviation_unCompletion = shorthand_Arry2.concat(abbreviation_Arry2)
 
  //9.开始进行补全替换
 
  const shorthand_abbreviation_Completion = Get_Complettions(shorthand_abbreviation_unCompletion)
 
  //10.进行一些拼接活动(此处容易出错)
  const shorthand_abbreviation_input = []
 
  
  for(i = 0 ; i < shorthand_abbreviation_unCompletion.length ; i++)
     {
         shorthand_abbreviation_input.push(
 
             shorthand_abbreviation_unCompletion[i] + "," + shorthand_abbreviation_Completion[i]
 
          )
     }
  
  //9.各个数组放入abbreviation.txt中
  synonyms.write(
 
   Name.join('\r\n') +
 
   '\r\n' +
   
   shorthand_abbreviation_input.join('\r\n')
 
   )
     console.log("导出成功！注意查收")
 
 
 
 
 
 