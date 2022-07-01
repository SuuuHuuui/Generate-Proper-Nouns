/**
 * Some functions of cut the string
 */

/**
 * 用于切割缩写
 * @param {*} Arry 
 * @returns 
 */
function AbbreviationCut(Arry)
{
  let regex = /[A-Z]{1}[a-z]{1,5}[.]/g; //首字母大写+小写字母1-5个左右+特殊符号"."
  const Abbreviation_Arry = [];
  Arry.forEach((element)=>
  {
    if(regex.test(element))
    {
        let Temp = element.match(regex);
        Temp.forEach((element) => 
        {
            if(Abbreviation_Arry.indexOf(element)==-1)
            {
                Abbreviation_Arry.push(element);
            }
        });
    }
  });
  return Abbreviation_Arry;
}

/**
 * 用于切割Name这个特殊字段，用于synonyms.txt中
 * @param {*} Arry 
 * @returns 
 */
function NameCutByLanguage(Arry)
{
  const NameCut_Arry = [];
  const Name_regex_with_bracket = /[ ]{1}[（]{1}|[ ]{1}[(]{1}/;
  Arry.forEach((element) => {
     if(Name_regex_with_bracket.test(element))
     {
        // 第一次切割，切 “(”，“（”和“-”
        let element1 = element.replace(/[ ]{1}[（]{1}|[ ]{1}[(]{1}|[ ]{1}[-]{1}[ ]{1}/g , ",");
        // 第二次切割，切“）”和“)”
        let element2 = element1.replace(/[）]{1}|[)]{1}/g,"");
        // 保存切割好的数据
        NameCut_Arry.push(element2);
     }
     else
     {
        NameCut_Arry.push(element);
     }
});
  return NameCut_Arry;
}


/**
 * 用于切割WorkAddress，分成最小单位，并且此处已经要加上",LOCATION"了
 * @param {*} Arry 
 * @returns 
 */
function WorkAddressCut(Arry)
{
   const WorkAddressCut_Arry = [];
   Arry.forEach((element) => 
  {
     let Temp = element.split(" - ");
     Temp.forEach((element)=>
     {
         if(WorkAddressCut_Arry.indexOf(element)==-1)
         {
             WorkAddressCut_Arry.push(element + ",LOCATION");
         }
     });
  });
  return  WorkAddressCut_Arry;
}

/**
 * 用来切割同一个Employee中的不同语言的Name字段，用于ner.txt中
 * @param {*} Arry 
 * @returns 
 */
function NameCut(Arry)
{
   const NameWihtLanguage = [];
   Arry.forEach((element) => 
  {
    let Temp = element.split(",");
    Temp.forEach((element)=>
    {
        if(NameWihtLanguage.indexOf(element)==-1)
        {
            NameWihtLanguage.push(element + ",PEOPLE");
        }
    });
  });
   return NameWihtLanguage;
}


/**
 * 获取简写的数据，并且完成简写的补全
 * @param {*} Arry 
 * @returns 
 */
function Shorthand(Arry)
{
  let StringCompletion = require("./StringCompletion");//补全函数
  let regx = /[A-Z]{1}[A-Z]{1,4}/;
  const OriginalShorthand = [];
  const Shorthand = [];
  Arry.forEach((element) => 
  {
     if(regx.test(element))
     {
       OriginalShorthand.push(element);
       let shortElementFirst = StringCompletion.Get_StrCompletion(element);//第一次调用
       let shortElementSecond = StringCompletion.Get_StrCompletion(shortElementFirst);//第二次调用
       Shorthand.push(shortElementSecond);
     }
  });
  const CombinationShorthand = [];
  for(i = 0 ; i < OriginalShorthand.length ; i++)
  {
      let elemengt = OriginalShorthand[i] + "," + Shorthand[i];
      CombinationShorthand.push(elemengt);
  }
  return CombinationShorthand;
}

module.exports = {
    AbbreviationCut,
    NameCutByLanguage,
    WorkAddressCut,
    NameCut,
    Shorthand
}