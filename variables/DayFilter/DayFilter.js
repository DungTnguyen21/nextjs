
const median = arr => {
  let mid = Math.ceil(arr.length/2)
  if (arr.length==0) return 0
  return arr.length%2 ===0? (arr[mid] +arr[mid-1])/2 : arr[mid]
}
const calcSum = arr =>{
  if (arr.length==0) return 0
  return arr.reduce((accumulator, curr)=>accumulator+curr,0)
}
const DayFilter =  (date_begin,date_end,data) => {
  let arr = [];

  
  for (let i = date_begin; i < date_end; i += 86400000) {
    let daydataarr = [];  
      let dayarr =  data.filter((val) => {
        return  ( ( parseInt(val.time)<i+86400000&&parseInt(val.time)>i));
      });
      
      for (let j = i; j < i + 86400000; j += 3600000) {
        let hourarr = dayarr.filter(
          (val) => j <= parseInt(val.time) && parseInt(val.time) < j + 3600000
          );
          //console.log(hourarr)
          
          let num_1xx = hourarr
          .map((item) =>item? parseInt(item.num_1xx):0)
          .sort((a, b) => a - b);
          let num_2xx = hourarr
          .map((item) => item? parseInt(item.num_2xx):0)
          .sort((a, b) => a - b);
          let num_3xx = hourarr
          .map((item) => item? parseInt(item.num_3xx):0)
          .sort((a, b) => a - b);
          let num_4xx = hourarr
          .map((item) => item? parseInt(item.num_4xx):0)
          .sort((a, b) => a - b);
          let num_5xx = hourarr
          .map((item) => item? parseInt(item.num_5xx):0)
          .sort((a, b) => a - b);
          //console.log(hourarr)
          daydataarr.push({
            time: `${j + 1800000}`,
            num_1xx: [median(num_1xx),calcSum(num_1xx)],
            num_2xx: [median(num_2xx),calcSum(num_2xx)],
            num_3xx: [median(num_3xx),calcSum(num_3xx)],
            num_4xx: [median(num_4xx),calcSum(num_4xx)],
            num_5xx: [median(num_4xx),calcSum(num_4xx)],
            //total :calcSum(num_1xx)+calcSum(num_2xx)+calcSum(num_3xx)+calcSum(num_4xx)+calcSum(num_5xx)
          });
        }
        if(daydataarr.map(item=>item.num_1xx[1]+item.num_2xx[1]+item.num_3xx[1]+item.num_4xx[1]+item.num_5xx[1]).reduce((a,v)=>a+v)>0){

          arr.push({
            date: `${i}`,
            daydataarr,
            
          });
        } 
      }
      return arr;
    };
    export default DayFilter;
    