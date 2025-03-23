import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import { useCallback } from "react";
import debounce from "lodash.debounce";
import s from "./SearchBox.module.css";

function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilterChange = useCallback(
    debounce((value) => dispatch(changeFilter(value)), 300),
    [dispatch]
  );

  return (
    <div className={s.searchBox}>
      <input
        type="text"
        placeholder="Search"
        defaultValue={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
        className={s.input}
        autoFocus
      />
      {filter && (
        <button
          className={s.clearButton}
          onClick={() => dispatch(changeFilter(""))}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBox;