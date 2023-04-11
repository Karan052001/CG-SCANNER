import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
  Typography,
  Input,
} from "@mui/material";

const StyledTable = styled(Table)`
  width: 100%;
  margin: 30px auto 0 auto;
  // display:flex;
  // flex-direction:column;
  // align-items: center;
  // justify-content:center;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #000000;
    color: #ffffff;
  }
`;

const Heading = styled(Typography)`
  margin: 50px 0 0 0;
  text-align: center;
`;

const initialFindings = {
  type: "",
  ruleId: "",
  location: "",
  description: "",
  severity: "",
};
const FindingsTable = (props) => {
  const [findings, setFindings] = useState([]);
  const [newFinding, setNewFinding] = useState(initialFindings);
  // eslint-disable-next-line
  const [inputFindings, setinputFindings] = useState(props.data)
  // eslint-disable-next-line
  const [dataComing, setdataComing] = useState(props.state);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewFinding({
      ...newFinding,
      [name]: value,
    });
  };
  const handleAddFinding = () => {
    setFindings([...findings, newFinding]);
    setNewFinding(initialFindings);

    props.data([...findings, newFinding]);
  };
  return (
    <>
      <Heading variant="h4">FINDINGS</Heading>
      <StyledTable>
        <TableHead>
          <THead>
            {/* <TableCell>Id</TableCell> */}

            <TableCell>Type</TableCell>
            <TableCell>RuleID</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Severity</TableCell>
            <TableCell>Action</TableCell>
          </THead>
        </TableHead>

        <TableBody>
          {dataComing
            ? inputFindings.map((finding, index) => (
                <TableRow key={index}>
                  <TableCell>{finding.type}</TableCell>
                  <TableCell>{finding.ruleId}</TableCell>
                  <TableCell>{finding.location}</TableCell>
                  <TableCell>{finding.description}</TableCell>
                  <TableCell>{finding.severity}</TableCell>
                </TableRow>
              ))
            : findings.map((finding, index) => (
                <TableRow key={index}>
                  <TableCell>{finding.type}</TableCell>
                  <TableCell>{finding.ruleId}</TableCell>
                  <TableCell>{finding.location}</TableCell>
                  <TableCell>{finding.description}</TableCell>
                  <TableCell>{finding.severity}</TableCell>
                </TableRow>
              ))}

          <TableRow>
            <TableCell>
              <Input
                type="text"
                name="type"
                value={newFinding.type}
                onChange={handleInputChange}
              />
            </TableCell>
            <TableCell>
              <Input
                type="text"
                name="ruleId"
                value={newFinding.ruleId}
                onChange={handleInputChange}
              />
            </TableCell>
            <TableCell>
              <Input
                type="text"
                name="location"
                value={newFinding.location}
                onChange={handleInputChange}
              />
            </TableCell>
            <TableCell>
              <Input
                type="text"
                name="description"
                value={newFinding.description}
                onChange={handleInputChange}
              />
            </TableCell>
            <TableCell>
              <Input
                type="text"
                name="severity"
                value={newFinding.severity}
                onChange={handleInputChange}
              />
            </TableCell>
            <TableCell>
              <Button
                onClick={handleAddFinding}
                color="success"
                variant="contained"
                style={{ margin: "auto" }}
              >
                Add
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </StyledTable>
    </>
  );
};

export default FindingsTable;
