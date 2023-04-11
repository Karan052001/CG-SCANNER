import styled from "@emotion/styled";
import {
  FormControl,
  FormGroup,
  MenuItem,
  Select,
  Typography,
  Input,
} from "@mui/material";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { addScan } from "../api";
import { useNavigate } from "react-router-dom";
import FindingsTable from "../utils/FindingsTable";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 30px auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const Inp = styled(Input)`
  margin: 20px 0 20px 0;
`;

const defaultValue = {
  status: "",
  repoName: "",
  queuedAt: "",
  scanningAt: "",
  finishedAt: "",
};

const statusOptions = ["Queued", "In Progress", "Success", "Failed"];

const Addscan = () => {
  const [scan, setScan] = useState(defaultValue);

  const { status, repoName, queuedAt, scanningAt, finishedAt } = scan;

  let navigate = useNavigate();

  const onValueChange = (e) => {
    setScan({ ...scan, [e.target.name]: e.target.value });
  };

  const addscanDetails = async () => {
    const result = { ...scan, inputFindings };

    await addScan(result);

    navigate("/");
    alert("Added successfully");
    
  };
  const handleFindingsAdd = (newData) => {
    setScan((prevState) => ({
      ...prevState,
      findings: [...prevState.findings, newData],
    }));
  };

  const [inputFindings, setInputFindings] = useState([]);
  const getData = (input) => {
    setInputFindings(input);
  };
  return (
    <>
      <Container>
        <Typography style={{ margin: "auto" }} variant="h4">
          SUBMIT SCAN RESULT
        </Typography>

        <FormControl>
          <>Status</>
          <Select
            value={status}
            onChange={(e) => onValueChange(e)}
            name="status"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <>Repository Name</>
          <Inp
            onChange={(e) => onValueChange(e)}
            name="repoName"
            value={repoName}
          />
        </FormControl>

        <FormControl>
          <>Queued At</>
          <Inp
            type="datetime-local"
            onChange={(e) => onValueChange(e)}
            name="queuedAt"
            value={queuedAt}
          />
        </FormControl>

        <FormControl>
          <>Scanning At</>
          <Inp
            type="datetime-local"
            onChange={(e) => onValueChange(e)}
            name="scanningAt"
            value={scanningAt}
          />
        </FormControl>

        <FormControl>
          <>Finished At</>
          <Inp
            type="datetime-local"
            onChange={(e) => onValueChange(e)}
            name="finishedAt"
            value={finishedAt}
          />
        </FormControl>

        <FindingsTable
          data={getData} //function name getDAta(input)=>{clg(input)}
          state={false}
          onRowAdd={handleFindingsAdd}
          
        />
        

        <br />
        <br />
        
        <FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addscanDetails()}
          >
            Add scan
          </Button>
        </FormControl>
      </Container>
    </>
  );
};

export default Addscan;
