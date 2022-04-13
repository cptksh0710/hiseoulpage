import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Button,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import axios from 'axios';

export const MemberListResults = ({ members,setMemData, ...rest }) => {
  const [selectedMemberNOs, setSelectedMemberNOs] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [memno, setMemno] = useState();
  const handleSelectAll = (event) => {
    let newSelectedMemberNOs;

    if (event.target.checked) {
      newSelectedMemberNOs = members.map((member) => member.no);       
    } else {
      newSelectedMemberNOs = [];
    }
    setSelectedMemberNOs(newSelectedMemberNOs);
  };

  const handleSelectOne = (event, no) => {
    const selectedIndex = selectedMemberNOs.indexOf(no);
    let newSelectedMemberNOs = [];

    if (selectedIndex === -1) {
      newSelectedMemberNOs = newSelectedMemberNOs.concat(selectedMemberNOs, no);
    } else if (selectedIndex === 0) {
      newSelectedMemberNOs = newSelectedMemberNOs.concat(selectedMemberNOs.slice(1));
    } else if (selectedIndex === selectedMemberNOs.length - 1) {
      newSelectedMemberNOs = newSelectedMemberNOs.concat(selectedMemberNOs.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedMemberNOs = newSelectedMemberNOs.concat(
        selectedMemberNOs.slice(0, selectedIndex),
        selectedMemberNOs.slice(selectedIndex + 1)
      );
    }
    setMemno(no);
    setSelectedMemberNOs(newSelectedMemberNOs);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value,10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };  
  setMemData(selectedMemberNOs); // checkbox리스트 보내기.
  //console.log(selectedMemberNOs)
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedMemberNOs.length === members.length}
                    color="primary"
                    indeterminate={
                      selectedMemberNOs.length > 0
                      && selectedMemberNOs.length < members.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  NO
                </TableCell>
                <TableCell>
                  WriteDate
                </TableCell>
                <TableCell>
                  PERM
                </TableCell>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  NAME
                </TableCell>
                <TableCell>
                  EMAIL
                </TableCell>
                <TableCell>
                  INSTANCE
                </TableCell>
                <TableCell>
                  ACTIVE
                </TableCell>
                <TableCell>
                  AUTH
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {members.slice(page * limit, (page + 1) * limit).map((member) => (
                <TableRow
                  hover
                  key={member.no}
                  selected={selectedMemberNOs.indexOf(member.no) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedMemberNOs.indexOf(member.no) !== -1}
                      onChange={(event) => handleSelectOne(event, member.no)}
                      value="true"
                    />
                  </TableCell>
                  

                  <TableCell>
                    {member.no}
                  </TableCell>
                  <TableCell>
                    {member.writedate}
                  </TableCell>
                  <TableCell>
                    {member.permission}
                  </TableCell>
                  <TableCell>
                    {member.id}
                  </TableCell>
                  <TableCell >
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {member.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {member.email}
                  </TableCell>
                  <TableCell>
                    {member.instanceyn}
                  </TableCell>
                  <TableCell>
                    {member.activeyn}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row'
                        }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                        sx={{ ml: 1 }}
                      >
                        {member.auth}
                      </Typography>
                    </Box>  
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={members.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MemberListResults.propTypes = {
  members: PropTypes.array.isRequired
};
