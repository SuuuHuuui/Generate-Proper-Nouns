/**
 * 用于传入一个string的缩写或简写补全
 * @param {*} string 
 * @returns 
 */
function StrCompletion(string)
{
    if(string.includes("APAC") == 1)
    {
       let str = string.replace(/APAC/g,"Asia Pacific");
       return str;
    }

    else if(string.includes("Eng.") == 1)
    {
        let str = string.replace(/Eng./g,"Engineering");
        return str;
    }

    else if(string.includes("Sr.") == 1)
    {
        let str = string.replace(/Sr./g,"Senior");
        return str;
    }

    else if(string.includes("Jr.") == 1)
    {
        let str = string.replace(/Jr./g,"Junior");
        return str;
    }

    else if(string.includes("HR")== 1)
    {
        let str = string.replace(/HR/g,"Human Resources");
        return str;
    }

    else if(string.includes("Mgr.")== 1)
    {
        let str = string.replace(/Mgr./g," Manager");
        return str;
    }

    else if(string.includes("Dir.") == 1)
    {
        let str = string.replace(/Dir./g,"Director");
        return str;
    }

    //可继续往下写else if
    else
    {
        let str = string.replace(/[A-Z]{1}[A-Z]{1,4}[]{0,1}|[A-Z]{1}[a-z]{1,5}[.]/g ,"TBD");
        return str;
    }
}

module.exports.Get_StrCompletion = StrCompletion;