export function stripScript (content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

export function stripStyle (content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

export function stripTemplate (content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

//获取索引值
export function getIndex(type,list){
  let index;
  for(let i=0;i<list.length;i++){
    if(list[i].type===type){
      index=i
      console.log(i)
      break;
    }
  }
  return index
}