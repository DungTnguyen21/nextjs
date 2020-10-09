import client from "../../libs/Redis/Redis"
import jwt, { decode, verify } from "jsonwebtoken"
import Axios from "axios"
import Record from "../../libs/Redis/RedisRecord"
import {getBandwith} from "../../libs/API/fetchData"
import DayFilter from "../../variables/DayFilter/DayFilter"
import { parse, resolve } from "path"
export default async (req,res)=>{
    if (req.method !=='POST') res.statusCode=404
    else {
        const {authorization}= req.headers
        if (authorization){ 
            if (verify(authorization.split(" ")[1],process.env.SECRET_KEY)){
                const {date_begin,date_end,type}=req.body
                // console.log({date_begin,date_end})
                // console.log(decode(authorization.split(" ")[1])) 
                let {biz_id}=decode(authorization.split(" ")[1])
                
                   await client.get(biz_id,async(err,record)=>{
                        // console.log("this")
                        if (record){
                            let recordObject = await JSON.parse(record)
                                let bandwidth =[]
                                let request =[]
                                //console.log(recordObject)
                                if (recordObject.date_begin>date_begin||recordObject.date_end<date_end){
                                    if (recordObject.date_begin>date_begin) {
                                        console.log("first")
                                        let {data} = await getBandwith(date_begin,recordObject.date_begin,biz_id)    
                                        // console.log(`data : ${data}`)
                                        let data_begin = await data
                                        bandwidth=bandwidth.concat(data_begin.bandwidth)
                                        request=request.concat(data_begin.request_status)
                                    }
                                    bandwidth.concat(recordObject.bandwidth)
                                    request.concat(recordObject.request_status)
                                    if (recordObject.date_end<date_end){
                                        console.log("append")
                                        let {data} =await getBandwith(recordObject.date_end,date_end,biz_id)
                                        let data_end=await data
                                        bandwidth.concat(await data_end.bandwidth)
                                        request.concat(await data_end.request_status)
                                    } 
                                    await client.setex(biz_id,3600,JSON.stringify(Record({
                                        bandwidth,
                                        request_status:request,
                                        date_begin:date_begin,
                                        date_end:date_end
                                    },biz_id)))
                                    // console.log(bandwidth)
                                    res.json({
                                        data : type==="bandwidth"? bandwidth.filter(item=> parseInt(item.date)>=date_begin&&parseInt(item.date)<=date_end) : DayFilter(date_begin,date_end,request_status)
                                    })
                                    
                                } else {
                                    console.log("then this")
                                    //console.log(DayFilter(recordObject.request_status,date_begin,date_end))
                                    await res.json({
                                        data : type==="bandwidth"?recordObject.bandwidth.filter(item=> parseInt(item.date)>=date_begin&&parseInt(item.date)<=date_end) : DayFilter(date_begin,date_end,recordObject.request_status)
                                    })
                                
                                }
                            
                        } else {
                            console.log("get raw")
                            let {data} =await getBandwith(date_begin,date_end,biz_id)
                            client.setex(biz_id,3600,JSON.stringify(Record({
                                bandwidth: data.bandwidth,
                                request_status:data.request_status,
                                date_begin,
                                date_end
                            },biz_id)))
                            res.json({
                                data : type ==="bandwidth" ? data.bandwidth.filter(item=> parseInt(item.date)>=date_begin&&parseInt(item.date)<=date_end) : DayFilter(data.request_status,date_begin,date_end)
                            })
                            
                        }
                    })
                } else res.status(400).end()
                
            } else res.status(400).end()
    }
    
} 
