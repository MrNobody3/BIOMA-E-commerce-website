//import React from "react";

import React, { useEffect } from "react";

function Pagination(props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const mystyle = {
    color: "white",
    backgroundColor: "#fe980f"
  };
  return (
    <>
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              {/* <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a> */}
              <a onClick={() => props.paginate(number)} style={number == props.currentNumber ? mystyle : {}}>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
// const Pagination = ({ postsPerPage, totalPosts, paginate, currentNumber }) => {

//   return (
//     <nav>
//       <ul className="pagination">
//         {pageNumbers.map(number => (
//           <li key={number} className="page-item">
//             {/* <a onClick={() => paginate(number)} className="page-link">
//               {number}
//             </a> */}
//             <a onClick={() => paginate(number)} style={number == currentNumber ? mystyle : {}}>
//               {number}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;
