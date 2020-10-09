import React, { useEffect ,useState } from "react";
import '../../assets/css/Storage.css'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col, Container
} from "reactstrap";
import Axios from 'axios'
import StorageAccordion from '../../components/Accordion/StorageAccordion'
import PerfectScrollbar from 'perfect-scrollbar'
import Header from "components/Headers/Header.js";
import { authorize } from "passport";
var ps

const calcTotalStorage =(data)=>{
  let sum =0
  for (let i in data){
    sum+=parseInt(data[i].total)
  }
  return sum
}
const calcTotalUsedStorage = (data) => {
  let sum =0
  for (let i in data){
    for (let j in data[i].detail){
      sum += parseInt(data[i].detail[j].size)
    }
  }
  return sum 
}

const Storage= ()=>{
  let [storageData,setStorageData] =useState([]);
  let [open,setOpen]= useState(storageData.map(item =>{ return 0}));
  let toggle=(index) => {
    let newOpen = open.slice()
    newOpen[index] =!newOpen[index]
    setOpen(newOpen)
  }
  
  let total = calcTotalStorage(storageData)
  let used = calcTotalUsedStorage(storageData)
  useEffect(()=>{
    let tables = document.querySelectorAll(".table-responsive");
    for (let i = 0; i < tables.length; i++) {
        console.log(tables[i]);
        ps = new PerfectScrollbar(tables[i]);   
    }
})
      let ListCollapse = storageData.map((item,index)=> {
        
        return <StorageAccordion 
                  data ={item} 
                  isOpen={open[index]} 
                  onClick={()=>toggle(index)}
                  key={index}
                />
      })

  useEffect(()=>{
   

      Axios({
        url:  'http:///localhost:3000/api/getStorageDetail',
        method : 'POST',
        data : {
        },
        headers : {
          "Content-Type" : "application/json",
          authorization :`token ${localStorage.getItem('billing_token')}`
        }
      })
      .then(res=>{
        setStorageData(res.data)
        // console.log(res)
      })
  },[])
    return(
        <>
           <Header/> 
        <Container className="mt--7" fluid>

   
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader><CardTitle tag="h4">Overall
                            </CardTitle></CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                      <tr>
                        <th>Total storage</th>
                        <th>Used</th>
                        <th>Free</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{total} </td>
                        <td>{used}</td>
                        <td>{total-used}</td>      
                      </tr>
                     
                    </tbody>
                            </Table>
                        </CardBody>
                    </Card>

                </Col>
            </Row>
            <Row>
                <Col md="12" >
                    <Card>
                        <CardHeader><CardTitle tag="h4">Detail</CardTitle></CardHeader>
                        <CardBody>

                        <Row>
                          <Col md="12">
                            {ListCollapse}
                          </Col>
                        </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
        </Container>
        </>
    )
}
// Storage.layout = Admin;
export default Storage;