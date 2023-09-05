
export const findPublicId =(url)=>{
    // console.log(url.split("/")[url.split("/").length-1].split(".")[0])
    return url.split("/")[url.split("/").length-1].split(".")[0]
    
}