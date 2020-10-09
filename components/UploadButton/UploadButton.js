import React from "react";
import { Input, Button, InputGroupAddon, InputGroup } from "reactstrap";

const UploadButton = ({ onFileUploaded, onChangeText, fileContent }) => {
  return (
    <InputGroup>
      <Input
        type="text"
        size="100"
        className="file-input-text"
        value={fileContent}
        onChange={(e) => onChangeText(e.target.value)}
      />
      <InputGroupAddon addonType="append">
        <Button className="upload-button" size="1">
          <Input
            type="file"
            onChange={(e) => onFileUploaded(e.target.files[0])}
            className="custom-file-input"
          />
          <i className="upload-icon fas fa-upload"></i>
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
};
export default UploadButton;
