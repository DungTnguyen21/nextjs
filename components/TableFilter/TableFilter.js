import React, { useState } from "react";
import {
  Input,
  Label,
  FormGroup,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";

import ListFilter from "../ListFilter/ListFilter";
const uniqueList = (list, key) => {
  return [
    ...new Set(
      list.map((item) => {
        return item[key];
      })
    ),
  ];
};

// const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
const TableFilter = ({ data }) => {
  // let [filteredData, setFilteredData] = useState([]);
  let [option, setOption] = useState({
    action: "--",
    filetype: "--",
    user: "--",
    size: "--",
    time: "--",
  });
  let [timeModal, setTimeModal] = useState({ start: 0, end: 0 });
  let [sizeModal, setSizeModal] = useState({ start: 0, end: 0 });
  let [modal1, setModal1] = useState(false);
  let [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const toggle1 = () => setModal1(!modal1);
  const handleFromToOption = () => {
    // console.log("modal");
    toggle();
  };
  const handleTimeLower = (e) => {
    let newOption = timeModal;
    newOption.start = parseInt(e.target.options[e.target.selectedIndex].value);
    setTimeModal(newOption);
  };
  const handleTimeUpper = (e) => {
    let newOption = timeModal;
    // console.log(e.target.options[e.target.selectedIndex].value);
    newOption.end = parseInt(e.target.options[e.target.selectedIndex].value);
    // console.log(newOption);
    setTimeModal(newOption);
  };
  const setSizeLower = (e) => {
    let newOption = sizeModal;
    newOption.start = parseInt(
      e.target.options[e.target.selectedIndex].value
    );
    setSizeModal(newOption);
  };
  const setSizeUpper = (e) => {
    let newOption = sizeModal;
    newOption.end = parseInt(e.target.options[e.target.selectedIndex].value);
    setSizeModal(newOption);
  };
  const setSizeFilter = (e) => {
    e.preventDefault();
    let newOption = Object.assign({}, option);
    newOption.size = {
      type: "range",
      start: sizeModal.start,
      end: sizeModal.end,
    };
    setOption(newOption);
    toggle1();
  };
  const setTimeFilter = (e) => {
    e.preventDefault();
    let newOption = Object.assign({}, option);

    newOption.time = {
      type: "range",
      start: timeModal.start,
      end: timeModal.end,
    };
    setOption(newOption);
    toggle();
  };

  const handleOptionChange = (e) => {
    let newOption = Object.assign({}, option);
    // console.log(e.target.selectedIndex);
    // console.log("new state !");
    if (e.target.name === "time" || e.target.name === "size") {
      newOption[e.target.name] = {
        type: "value",
        value: e.target.options[e.target.selectedIndex].value,
      };
    } else {
      newOption[e.target.name] = e.target.value;
    }
    setOption(newOption);
  };
  return (
    <>
      <div>
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Action</Label>
            <Input
              name="action"
              type="select"
              onChange={(event) => {
                handleOptionChange(event);
              }}
            >
              <option value>--</option>
              {uniqueList(data, "_type").map((item, index) => {
                return (
                  <option key={`action-option-${index}`}>
                    {item === "1" ? "Upload" : "Download"}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">File type</Label>
            <Input
              name="filetype"
              type="select"
              onChange={(event) => {
                handleOptionChange(event);
              }}
            >
              <option>--</option>
              {uniqueList(data, "filetype").map((item, index) => {
                return <option key={`file-type-${index}`}>{item}</option>;
              })}
            </Input>
          </FormGroup>
        </Form>
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Size</Label>
            <Input
              name="size"
              type="select"
              onChange={(event) => {
                if (event.target.value === "From...to") toggle1();
                else handleOptionChange(event);
              }}
            >
              <option value="--">--</option>
              {uniqueList(data, "size").map((item, index) => {
                return (
                  <option value={`${item}`} key={`option-filesize-${index}`}>
                    {item}
                  </option>
                );
              })}
              <option>From...to</option>
            </Input>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">User</Label>
            <Input
              name="user"
              type="select"
              onChange={(event) => {
                if (event.target.value === "From...to") handleFromToOption();
                else handleOptionChange(event);
              }}
            >
              <option>--</option>
              {uniqueList(data, "user").map((item, index) => {
                return <option key={`user-option-${index}`}>{item}</option>;
              })}
            </Input>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Time</Label>
            <Input
              name="time"
              type="select"
              onChange={(event) => {
                if (event.target.value === "From...to") handleFromToOption();
                else handleOptionChange(event);
              }}
            >
              <option>--</option>
              {uniqueList(data, "time").map((item, index) => {
                return (
                  <option value={`${parseInt(item)*1000}`} key={`time-option-${index}`}>
                    {new Date(parseInt(item)*1000).toLocaleTimeString()}
                  </option>
                );
              })}
              <option>From...to</option>
            </Input>
          </FormGroup>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>Set range</ModalHeader>
            <ModalBody>
              <Form inline onSubmit={(e) => setTimeFilter(e)}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label className="mr-sm-2">From</Label>
                  <Input
                    type="select"
                    className="modal-input"
                    onChange={(event) => handleTimeLower(event)}
                  >
                    <option>--</option>
                    {uniqueList(data, "time").map((item, index) => {
                      // console.log(item)
                      return (
                        <option value={`${parseInt(item)}`} key={`time-option-${index}`}>
                          {new Date(parseInt(item)).toLocaleTimeString()}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label className="mr-sm-2">to</Label>
                  <Input
                    type="select"
                    className="modal-input"
                    onChange={(event) => handleTimeUpper(event)}
                  >
                    <option>--</option>
                    {uniqueList(data, "time").map((item, index) => {
                      return (
                        <option value={`${item}`} key={`time-option-${index}`}>
                          {new Date(item).toLocaleTimeString()}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <FormGroup className="mr-sm-2">
                  <Input type="submit" value="View" className="modal-button" />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </Modal>
          <Modal isOpen={modal1} toggle={toggle1}>
            <ModalHeader>Set range</ModalHeader>
            <ModalBody>
              <Form inline onSubmit={(e) => setSizeFilter(e)}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label className="mr-sm-2">From</Label>
                  <Input
                    type="select"
                    className="modal-input"
                    onChange={(event) => setSizeLower(event)}
                  >
                    <option value="--">--</option>
                    {uniqueList(data, "size").map((item, index) => {
                      return (
                        <option
                          value={`${item}`}
                          key={`option-filesize-${index}`}
                        >
                          {item}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label className="mr-sm-2">to</Label>
                  <Input
                    type="select"
                    className="modal-input"
                    onChange={(event) => setSizeUpper(event)}
                  >
                    <option value="--">--</option>
                    {uniqueList(data, "size").map((item, index) => {
                      return (
                        <option
                          value={`${item}`}
                          key={`option-filesize-${index}`}
                        >
                          {item}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>

                <FormGroup className="mr-sm-2">
                  <Input type="submit" value="View" className="modal-button" />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </Modal>
        </Form>
        <Table className="tablesorter" responsive>
          <thead className="text-primary">
            <tr>
              <th>Action</th>
              <th>File type</th>
              <th>User</th>
              <th>Size</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <ListFilter data={data} option={option} />
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default TableFilter;
