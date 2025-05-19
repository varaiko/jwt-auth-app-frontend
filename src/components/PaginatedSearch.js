import { useEffect, useState } from 'react';
import { API_BASE } from '../config';
import { authHeader } from '../utils/UtilFunctions';
import api from '../auth/api';

const PaginatedSearch = ({ baseSearchUrl, baseListUrl, sortBy }) => {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const pageSizeOptions = [1, 10, 20, 50];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `${API_BASE}/${baseListUrl}?page=0&size=${pageSize}&sort=${sortBy}`,
          authHeader()
        );
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
        setCurrentPage(0);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [baseSearchUrl, baseListUrl, sortBy, pageSize]);

  const handleSearch = async () => {
    if (search === '') {
      setIsSearchMode(false);
    }
    try {
      const response = await api.get(
        `${API_BASE}/${baseSearchUrl}?keyword=${search}&page=0&size=${pageSize}&sort=${sortBy}`,
        authHeader()
      );
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(0);
      setIsSearchMode(true);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const changeCurrentPage = async (number) => {

    const newPage = currentPage + number;

    if (newPage < 0 || newPage >= totalPages) {
      return;
    }

    try {
      let response;
      if (isSearchMode && search !== '') {
        response = await api.get(
          `${API_BASE}/${baseSearchUrl}?keyword=${search}&page=${newPage}&size=${pageSize}&sort=${sortBy}`,
          authHeader()
        );
      } else {
        response = await api.get(
          `${API_BASE}/${baseListUrl}?page=${newPage}&size=${pageSize}&sort=${sortBy}`,
          authHeader()
        );
      }
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(newPage);
    } catch (err) {
      setError(true);
    }
  };

  const handlePageSizeChange = async (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0);
    setLoading(true);

    try {
      let response;
      if (isSearchMode && search !== '') {
        response = await api.get(
          `${API_BASE}/${baseSearchUrl}?keyword=${search}&page=0&size=${newSize}&sort=${sortBy}`,
          authHeader()
        );
      } else {
        response = await api.get(
          `${API_BASE}/${baseListUrl}?page=0&size=${newSize}&sort=${sortBy}`,
          authHeader()
        );
      }
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    search,
    setSearch,
    currentPage,
    totalPages,
    pageSize,
    loading,
    error,
    handleSearch,
    changeCurrentPage,
    handlePageSizeChange,
    pageSizeOptions,
  };
};

export default PaginatedSearch;
