import React from 'react'
import {
    Row,
    Col,
    Collapse,
    CardBody
} from 'reactstrap'
import Classname from 'classnames'
import TableFilter from '../TableFilter/TableFilter'

const Accordion =(props)=>{
    
    return (<>
                <Row>
                    <Col md="10" className="item-table-container">

                        <Row className="item-title-row" onClick={props.onClick}>
                            <Col md="12">
                                
                                    <div className="title-content-container"><p className="title-content">Date: {new Date(props.Date).toLocaleDateString()}</p></div>
                                    <div className="dropdown-icon"><i className={Classname("fas",{"fa-angle-up":!props.isOpen,"fa-angle-down":props.isOpen})}></i></div>
                            </Col>
                        </Row>                   
                        <Collapse isOpen={props.isOpen}>
                            <CardBody>

                        <Row  className="item-table">
                            <Col md="12">
                                <div>
                                    <TableFilter data={props.data}/>
                                </div>    
                            </Col>   
                        </Row>
                        </CardBody>
                    </Collapse>
                </Col>                
            </Row>
        </>
    )
}
export default Accordion