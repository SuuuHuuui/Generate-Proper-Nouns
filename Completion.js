/**
 * 名称：Completion.js
 * 功能：用于一些补全操作
 * PS：1.这是可以发展的；2.是会更替的
 * 有些不确定的都补全成TBD(To Be Determined)，往后再继续
 * PPS：一定要保证后边的return ArryX和紧贴它的ArryX.push()一定要保持一致，不然就不是最新的数组了
 * 要加
 * 
 */
function Complettions(Arry)
{
    const Arry1 = []
    Arry.forEach(element => 
    {
        let temporary_array = element.replace(/APAC/g,"Asia Pacific")

        Arry1.push(temporary_array)
    })

    const Arry2 = []
    Arry1.forEach((element)=>
    {
        let temporary_array = element.replace(/Eng./g,"Engineering")

        Arry2.push(temporary_array)
    })

    const Arry3 = []
    Arry2.forEach((element)=>
    {
        let temporary_array = element.replace(/Sr./g,"Senior")

        Arry3.push(temporary_array)
    })

    const Arry4 = []
    Arry3.forEach((element)=>
    {
        let temporary_array = element.replace(/Jr./g,"Junior")

        Arry4.push(temporary_array)
    })

    const Arry5 = []
    Arry4.forEach((element)=>
    {
        let temporary_array = element.replace(/HR/g,"Human Resources")

        Arry5.push(temporary_array)
    })

    const Arry6 = []
    Arry5.forEach((element)=>
    {
        let temporary_array = element.replace(/Mgr./g," Manager")

        Arry6.push(temporary_array)
    })

    const Arry7 = []
    Arry6.forEach((element)=>
    {
        let temporary_array = element.replace(/Dir./gi,"Director")

        Arry7.push(temporary_array)
    })

    //在下方添加增加新补全词的语句

    //结束
    /**
     * 此处若有新的语句，要记得修改ArryX1下方的Arry.forEach()的Arry名称，以保证它是最新数据
     * 建议
     */
    const ArryX1 = []
    Arry7.forEach((element)=>
    {
        let temporary_array = element.replace(/[A-Z]{1}[A-Z]{1,4}[]{0,1}/g ,"TBD")

        ArryX1.push(temporary_array)
    })

    const ArryX2 = []
    ArryX1.forEach((elemengt)=>
    {
        let temporary_array = elemengt.replace(/[A-Z]{1}[a-z]{1,5}[.]/g , "TBD")

        ArryX2.push(temporary_array)
    })

    return ArryX2
}

module.exports.Get_Complettions = Complettions