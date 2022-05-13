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

module.exports.Get_deduplication = deduplication