import React from 'react';

function Pagination({ numPages, currentPage, onPageChange }: { numPages: number, currentPage: number, onPageChange: (index: number) => void }) {
  return (
    <div className="flex justify-center mt-4 ">
      {Array.from({ length: numPages }, (_, index) => (
        <button
          key={index}
          className={`w-4  h-4 mx-2 rounded-full ${
            currentPage === index ? 'bg-primary-color' : 'bg-gray-300'
          }`}
          onClick={() => onPageChange(index)}
        />
      ))}
    </div>
  );
}

export default Pagination;
