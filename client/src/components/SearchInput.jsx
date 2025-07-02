import { useEffect, useRef, useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const cache = useRef({});
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const normalized = query.trim().toLowerCase();
      if (cache.current[normalized]) {
        onSearch(normalized, cache.current[normalized]);
      } else {
        onSearch(normalized, null); // Trigger fetch on parent
      }
    }, 100); // debounce delay

    return () => clearTimeout(debounceRef.current);
  }, [query, onSearch]);

  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchInput;
