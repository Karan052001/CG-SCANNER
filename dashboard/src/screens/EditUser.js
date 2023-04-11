import { useState, useEffect } from "react";

import {
  FormGroup,
  FormControl,
  Input,
  Button,
  styled,
  Typography,
  MenuItem,
  Select,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
// eslint-disable-next-line
import { getScans, editScan } from "../api";

const initialValue = {
  status: "",
  repoName: "",
  queuedAt: "",
  scanningAt: "",
  finishedAt: "",
};
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
const statusOptions = ["Queued", "In Progress", "Success", "Failed"];

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

const Inp = styled(Input)`
  margin: 20px 0 20px 0;
`;

const EditUser = () => {
  const [scan, setScan] = useState(initialValue);
  const { status, repoName, queuedAt, scanningAt, finishedAt, inputFindings } = scan;
  // eslint-disable-next-line
  const [inputFindingsNew, setinputFindingsNew] = useState([inputFindings]);

  const { id } = useParams();

  let navigate = useNavigate();
  useEffect(() => {
    const link =  fetch(`http://localhost:8000/${id}`);
    link
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((result) => {
        console.log(result);
        setScan(result);
      })
      .catch((err) => console.log(err));
  }, [id]);

  //   const loadUserDetails = async () => {
  //     const response = await getScans(id);
  //     setScan(response.data);
  //   };

  const editUserDetails = async () => {
    // eslint-disable-next-line no-unused-vars
    await editScan(id, scan);
    navigate("/");
  };

  const onValueChange = (e) => {
    console.log(e.target.value);
    setScan({ ...scan, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line
  const handleFindingsAdd = (newData) => {
    const findings = [...scan.findings];
    findings.push(newData);
    setScan({ ...scan, findings });
  };

  // eslint-disable-next-line
  const handleFindingsUpdate = (newData, oldData) => {
    if (oldData) {
      const findings = [...scan.findings];
      findings[findings.indexOf(oldData)] = newData;
      setScan({ ...scan, findings });
    }
  };

  // eslint-disable-next-line
  const handleFindingsDelete = (oldData) => {
    const findings = [...scan.findings];
    findings.splice(findings.indexOf(oldData), 1);
    setScan({ ...scan, findings });
  };

  return (
    <Container>
      <Typography variant="h4">Edit Information</Typography>
      <FormControl>
        <>Status</>
        <Select value={status} onChange={(e) => onValueChange(e)} name="status">
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
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <>Queued At</>
        <Inp
          type="datetime-local"
          onChange={(e) => onValueChange(e)}
          name="queuedAt"
          value={queuedAt}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <>Scanning At</>
        <Inp
          type="datetime-local"
          onChange={(e) => onValueChange(e)}
          name="scanningAt"
          value={scanningAt}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <>Finished At</>
        <Inp
          type="datetime-local"
          onChange={(e) => onValueChange(e)}
          name="finishedAt"
          value={finishedAt}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      {/* {inputFindings ? (
        <FindingsTable
          data={inputFindings}
          state={true}
          onRowAdd={handleFindingsAdd}
          onRowUpdate={handleFindingsUpdate}
          onRowDelete={handleFindingsDelete}
        />
      ) : (
        ""
      )} */}
      {/* <FindingsTable
                data={inputF}
                state={true}
                onRowAdd={handleFindingsAdd}
                onRowUpdate={handleFindingsUpdate}
                onRowDelete={handleFindingsDelete}
                /> */}

      <Heading variant="h4">FINDINGS</Heading>
      <StyledTable>
        <TableHead>
          <THead>


            <TableCell>Type</TableCell>
            <TableCell>RuleID</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Severity</TableCell>
            {/* <TableCell>Action</TableCell> */}
          </THead>
        </TableHead>

        <TableBody>
          {inputFindings &&
            inputFindings.map((finding, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{finding.type}</TableCell>
                  <TableCell>{finding.ruleId}</TableCell>
                  <TableCell>{finding.location}</TableCell>
                  <TableCell>{finding.description}</TableCell>
                  <TableCell>{finding.severity}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </StyledTable>

      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => editUserDetails()}
        >
          Edit Scan
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditUser;
