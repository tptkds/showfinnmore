'use client';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import SearchModalContents from './search/SearchModalContents';
import Modal from './Modal';
import { toggleModal } from '../../utils/modal';

const Search: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="relative flex w-full items-center " role="search">
        <button
          aria-label="검색"
          onClick={() => toggleModal(isModalOpen, setIsModalOpen)}
          className="p-4 text-xl sm:text-[46px]"
        >
          <FiSearch />
        </button>
      </div>
      <Modal
        toggleModal={() => toggleModal(isModalOpen, setIsModalOpen)}
        isModalOpen={isModalOpen}
      >
        <SearchModalContents
          toggleModal={() => toggleModal(isModalOpen, setIsModalOpen)}
        />
      </Modal>
    </>
  );
};

export default Search;
