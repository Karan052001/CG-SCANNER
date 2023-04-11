import { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled, Typography } from '@mui/material'
import { getScans, deleteScan } from '../api';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
    width: 70%;
    margin: 50px auto 0 auto;
    // display:flex;
    // flex-direction:column;
    // align-items: center;
    // justify-content:center;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
        
        
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
       
    }
`;

const Heading = styled(Typography)`
margin: 50px 0 0 0;
  text-align:center;
`;

const Allscans = () => {
    const [scans, setscans] = useState([]);
    useEffect(  () => {
      getAllscans();   
    }, []);
    const deletescanData = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await deleteScan(id);
            getAllscans();
          }
          else{
            getAllscans();
          }

    }

    const getAllscans = async () => {
        const response= await getScans();
         setscans(response.data);
        }
    return (
      <>
      <Heading variant="h4">SCAN RESULTS</Heading>
        <StyledTable>
            <TableHead>
                <THead>
                    
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Findings</TableCell>
                    <TableCell>TimeStamp</TableCell>
                    <TableCell>Actions</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {scans && scans.map((scan,index) => (
                    <TRow key={scan._id}>                        
                        <TableCell>{scan.repoName}</TableCell>
                        <TableCell>{scan.status}</TableCell>
                        <TableCell>{scans[index].inputFindings.length}</TableCell>
                        <TableCell>{scan.queuedAt}</TableCell>
                        <TableCell>
                            <Button color="info" variant="contained" style={{marginRight:10}} component={Link} to={`/scan-detail/${scan._id}`}>View</Button> 
                            <Button color="secondary" variant="contained" style={{marginRight:10}} component={Link} to={`/edit/${scan._id}`}>Edit</Button> {/* change it to scan.id to use JSON Server */}
                            <Button color="error" variant="contained" onClick={() => deletescanData(scan._id)}>Delete</Button> {/* change it to scan.id to use JSON Server */}
                        </TableCell>
                    </TRow>
                ))}
            </TableBody>
        </StyledTable>
        </>
    )
}

export default Allscans;