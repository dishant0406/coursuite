import React from 'react';
import './Pagination.css';
import Pagination from 'react-responsive-pagination';

const Paagination = ({postsPerPage, totalPosts, paginate, currentPage}) => {
  const pageNumbers= [];
  
  for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++) {
    pageNumbers.push(i);
  }
  
 

  return (
    <div className="paagination">
      <Pagination
      current={currentPage}
      total={pageNumbers.length}
      onPageChange={(number)=> paginate(number)}
    /> 
    </div>
  )
}

export default Paagination