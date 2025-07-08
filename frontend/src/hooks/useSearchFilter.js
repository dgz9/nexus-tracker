import { useState, useMemo, useCallback } from 'react';

const useSearchFilter = (items = [], searchKeys = [], filterConfigs = {}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(
    Object.keys(filterConfigs).reduce((acc, key) => ({
      ...acc,
      [key]: filterConfigs[key].defaultValue || 'all'
    }), {})
  );

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = searchQuery === '' || searchKeys.some(key => {
        const value = key.split('.').reduce((obj, k) => obj?.[k], item);
        return value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
      });

      const matchesFilters = Object.keys(filters).every(filterKey => {
        const filterValue = filters[filterKey];
        const filterConfig = filterConfigs[filterKey];
        
        if (!filterConfig || filterValue === 'all') return true;
        
        return filterConfig.filterFn(item, filterValue);
      });

      return matchesSearch && matchesFilters;
    });
  }, [items, searchQuery, searchKeys, filters, filterConfigs]);

  const setFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setFilters(
      Object.keys(filterConfigs).reduce((acc, key) => ({
        ...acc,
        [key]: filterConfigs[key].defaultValue || 'all'
      }), {})
    );
  }, [filterConfigs]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilter,
    filteredItems,
    resetFilters,
    totalItems: items.length,
    filteredCount: filteredItems.length
  };
};

export default useSearchFilter;