const fs = require('fs');
const GetData = require('./GetData');//获取经过处理的String
const FunctionOfCut = require("./FunctionOfCut");

////abbreviation.txt
// 特殊数据列的操作：先切割，再拼接
const Abbreviation_Arry = FunctionOfCut.AbbreviationCut(GetData.Title);//获得Title里的缩写


////synonyms.txt
// 特殊数据列的操作：先切割，再拼接
const NameCutByLanguage_Arry = FunctionOfCut.NameCutByLanguage(GetData.Name);//获得切割好的Name数据
const ShorthandOfTitle = FunctionOfCut.Shorthand(GetData.Title);//获得简写/缩写补全的Title数据
const ShorthandOfGeo = FunctionOfCut.Shorthand(GetData.Geo);//获得简写/缩写补全的Geo数据
const ShorthandOfBuilding = FunctionOfCut.Shorthand(GetData.Building);//获得简写/缩写补全的Building数据
const ShorthandOfOrganization_Name = FunctionOfCut.Shorthand(GetData.Organization_Name);//获得简写/缩写补全的Organization_Name数据
const ShorthandOfSupervisory_Org_Division = FunctionOfCut.Shorthand(GetData.Supervisory_Org_Division);
const SynonymsArry = NameCutByLanguage_Arry.concat(ShorthandOfTitle,ShorthandOfGeo,ShorthandOfBuilding,ShorthandOfOrganization_Name,ShorthandOfSupervisory_Org_Division);

////ner.txt
// 常规数据列操作：直接拼接
const Account = [];
(GetData.Account).forEach((element)=>{
    Account.push(element + ",PEOPLE");
});

const First_Name = [];
(GetData.First_Name).forEach((element) => {
    First_Name.push(element + ",PEOPLE");
});

const Last_Name = [];
(GetData.Last_Name).forEach((element) => {
    Last_Name.push(element + ",PEOPLE");
});

const Title = [];
(GetData.Title).forEach((element) => {
    Title.push(element + ",TITLE");
})

const City = [];
(GetData.City).forEach((element) => {
    City.push(element + ",LOCATION");
})

const State_Prov = [];
(GetData.State_Prov).forEach((element) => {
    State_Prov.push(element + ",LOCATION");
});

const Geo = [];
(GetData.Geo).forEach((element) => {
    Geo.push(element + ",LOCATION");
});

const Country = [];
(GetData.Country).forEach((element) => {
    Country.push(element + ",LOCATION");
});

const Building = [];
(GetData.Building).forEach((element) => {
    Building.push(element + ",LOCATION");
});

const Organization_Name = [];
(GetData.Organization_Name).forEach((element) => {
    Organization_Name.push(element + ",ORGANIZATION");
});

const Supervisory_Org_Division = [];
(GetData.Supervisory_Org_Division).forEach((element) => {
    Supervisory_Org_Division.push(element + ",ORGANIZATION");
});
// 特殊数据列的操作：先切割，再拼接
const Work_Address = FunctionOfCut.WorkAddressCut(GetData.Work_Address);//获得切割好的Work_Address
const Name = FunctionOfCut.NameCut(NameCutByLanguage_Arry);//获得同一个Employee下不同语言的Name数据
//连接ner
const NerArry = Account.concat(First_Name,Last_Name,Title,City,State_Prov,Geo,Country,Building,Organization_Name,Supervisory_Org_Division,Work_Address,Name);


//开始将符合目标的数据写入txt
const txtAbbreviationFile = './abbreviation.txt';
fs.writeFileSync(txtAbbreviationFile, Abbreviation_Arry.join('\r\n'), 'utf8');

const txtNerFile = './ner.txt';
fs.writeFileSync(txtNerFile,NerArry.join('\r\n'), 'utf8');

const txtSynonymsFile = './synonyms.txt';
fs.writeFileSync(txtSynonymsFile,SynonymsArry.join('\r\n'), 'utf8');
