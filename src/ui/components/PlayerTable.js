// import React from 'react';

// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// import PlayerCell from './PlayerCell';

// const PlayerTable = ({ 
//   players, 
//   inProgress, 
//   blend 
// }) => {
//   const dashboard = Object.values(players).map(player => (
//     <PlayerCell
//       key={player.address}
//       player={player}
//       inProgress={inProgress}
//       blend={blend}
//     />
//   ));
//   return (
//     <Paper style={{width: '80%', margin: '3em auto'}}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>
//               Cool pseudonym
//             </TableCell>
//             <TableCell>
//               Token
//             </TableCell>
//             <TableCell>
//               Score
//             </TableCell>
//             <TableCell>
//               Blend
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody> 
//           { dashboard }
//         </TableBody>
//       </Table>
//     </Paper>
//   )
// }

// export default PlayerTable;


import React from 'react';

import PlayerCell from './PlayerCell';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const th = {
    fontSize: '1.15em'
}

const PlayerTable = ({   
  currentPlayer,
  players, 
  inProgress, 
  blend }) => {
  const dashboard = Object.values(players).map((player, index) => (
    <PlayerCell
      key={player.address}
      currentPlayer={currentPlayer}
      player={player}
      inProgress={inProgress}
      blend={blend}
      index={index}
    />
  ));

  return (
    <Paper style={{width: '80%', margin: '3em auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={th}>
              Cool pseudonym
            </TableCell>
            <TableCell style={th}>
              Current token
            </TableCell>
            <TableCell style={th}>
              Price ( Ξ )
            </TableCell>
            <TableCell style={th}>
              The lower the closer
            </TableCell>
            <TableCell style={th}>
              Blend
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboard}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default PlayerTable;