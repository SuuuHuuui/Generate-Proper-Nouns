const fs = require('fs');
const  {GetExcelData_Function} = require("./xlsxToList");//读取Excel数据的工具

const List = GetExcelData_Function('./All Employees.xlsx');

// 遍历数组
 const Account = [];
 const Name = [];
 const First_Name = [];
 const Last_Name = [];
 const Title = [];
 const City = [];
 const State_Prov = [];
 const Geo = [];
 const Country = [];
 const Building = [];
 const Work_Address = [];
 const Organization_Name = [];
 const Supervisory_Org_Division = [];


 //PEOPLE字段
 List.forEach((element) =>
{
     //Account字段
     Account.push(
         element['Account']
     )
     //Name字段
     Name.push(
         element['Name']
     )
     //First Name字段
     First_Name.push(
         element['First Name']
     )
     //Last Name字段
     if(element['Last Name'] != undefined && Last_Name.indexOf(element['Last Name']) == -1)
     {
        Last_Name.push(
            element['Last Name'] 
        )
     }
     //Title字段
     Title.push(
         element['Title']
     )

     //City字段
     if(City.indexOf(element['City']) == -1)
     {
        City.push(
            element['City']
        )
     }
     //State/Prov字段
     if(element['State/Prov'] != undefined && State_Prov.indexOf(element['State/Prov']) == -1)
     {
        State_Prov.push(
            element['State/Prov']
        )
     }

     //Geo字段
    if(Geo.indexOf(element['Geo']) == -1)
    {
      Geo.push(
         element['Geo']
        )
    }

    //Country字段
    if(Country.indexOf(element['Country']) == -1)
    {
        Country.push(
            element['Country']
        )
    }
    //Building字段
    if(Building.indexOf(element['Building']) == -1)
    {
        Building.push(
            element['Building']
        )
    }
    //Work Address字段
    if(Work_Address.indexOf(element['Work Address']) == -1)
    {
        Work_Address.push(
            element['Work Address']
        )
    }

    //Organization Name
    if(Organization_Name.indexOf(element['Organization Name']) == -1)
    {
        Organization_Name.push(
            element['Organization Name']
        )
    }
    //Supervisory Org/Division字段
    if(Supervisory_Org_Division.indexOf(element['Supervisory Org/Division']) == -1)
    {
        Supervisory_Org_Division.push(
            element['Supervisory Org/Division']
        )
    }
});

module.exports = {
    Account,
    Name,
    First_Name,
    Last_Name,
    Title,
    City,
    State_Prov,
    Geo,
    Country,
    Building,
    Work_Address,
    Organization_Name,
    Supervisory_Org_Division
}