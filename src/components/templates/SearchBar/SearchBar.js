import React, { useRef, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import queryString from 'query-string';
import searchIcon from 'static/images/search-icon-navy.png';
import cancelIcon from 'static/images/cancel.png';

import TagList from 'atoms/TagList';
import useSetState from 'hooks/useSetState';
import { searchAPI } from 'lib/api/search';
import { SearchBarContainer, SearchBarWrapper } from './SearchBar.styled';

/* ==== search bar debounce ==== */
const searchAPIDebounced = AwesomeDebouncePromise (searchAPI, 500);

const SearchBar = ({ isOpen, options }) => {
  const isMounted = useRef (true);
  useEffect (() => () => { isMounted.current = false; }, []);
  const history = useHistory ();
  const [state, setState, onChangeHandler] = useSetState ({
    search: '',
    zaboSearch: [],
    uploaderSearch: [],
    keywordSearch: [],
    searchResults: {},
    searchFocused: false,
  });

  const {
    search, zaboSearch, searchResults, uploaderSearch, keywordSearch, searchFocused,
  } = state;

  const _updateResults = data => {
    const { zabos, groups, categories } = data;
    setState ({
      zaboSearch: zabos,
      uploaderSearch: groups,
      keywordSearch: categories,
    });
  };

  const _handleChange = e => {
    const { value: query } = e.target;
    setState ({ search: query });
    if (searchResults[query]) {
      // load from caching : show temporal search cached results
      _updateResults (searchResults[query]);
      // donot return; TO get new updated search result
    }
    searchAPIDebounced (query)
      .then (data => {
        if (!isMounted.current) return;
        _updateResults (data);
        setState (prevState => ({
          searchResults: {
            [query]: data,
          },
        }));
      }).catch (err => console.log ('change error'));
  };

  const _handleKeyDown = e => {
    const stringified = queryString.stringify ({ query: search });
    if (e.key === 'Enter') {
      setState ({
        searchFocused: false,
      });
      history.push (`/search?${stringified}`);
    }
  };

  const _handleFocus = useCallback (e => {
    e.stopPropagation ();
    e.nativeEvent.stopImmediatePropagation ();
    setState ({
      searchFocused: true,
    });
  }, [setState]);

  const _handleBlur = useCallback (e => {
    e.stopPropagation ();
    e.nativeEvent.stopImmediatePropagation ();
    setState ({
      searchFocused: false,
    });
  }, [setState]);

  const onTagClick = useCallback (e => {
    const { value: query } = e.target.value;
    setState ({ search: query });
  }, [setState]);

  const onCancelClick = e => {
    setState ({ search: '' });
  };

  const isZaboSearchEmpty = zaboSearch.length === 0;
  const isUploaderSearchEmpty = uploaderSearch.length === 0;
  const isResultsEmpty = isZaboSearchEmpty && isUploaderSearchEmpty;

  const searchWithTagComponent = (
    <div>
      <h3>태그로 검색하기 (현재 지원하지 않는 기능입니다)</h3>
      <TagList onClick={onTagClick} />
    </div>
  );

  const searchResultComponent = (
    <div>
      {!isZaboSearchEmpty && (
        <div>
          <h3>자보</h3>
          <ul>
            {zaboSearch.map ((zabo, idx) => (
              <li key={idx}>
                <Link to={`/zabo/${zabo._id}`}>{zabo.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!isUploaderSearchEmpty && (
        <div>
          <h3>그룹</h3>
          <ul>
            {uploaderSearch.map ((uploader, idx) => (
              <li key={idx}>
                <Link to={`/${uploader.name}`}>{uploader.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <h3>Keyword</h3>
      <ul>
        {keywordSearch.map ((keyword, idx) => (
          <li key={idx}>
            <Link to="/">{keyword}</Link>
          </li>
        ))}
      </ul> */}
    </div>
  );

  return (
    <SearchBarContainer onClick={_handleFocus}>
      {searchFocused ? <div id="dimmer" onClick={_handleBlur}> </div> : ''}
      <SearchBarWrapper searchFocused={searchFocused}>
        <SearchBarWrapper.Header>
          <SearchBarWrapper.Header.SearchBar searchFocused={searchFocused}>
            <input
              autoComplete="off"
              id="search-input"
              type="text"
              placeholder="자보, 그룹, #태그 검색"
              value={search}
              onChange={_handleChange}
              onKeyDown={_handleKeyDown}
              {...options}
            />
          </SearchBarWrapper.Header.SearchBar>
          <img className="search-icon" src={searchIcon} alt="search icon" />
          { search ? <img className="cancel-icon" onClick={onCancelClick} src={cancelIcon} alt="cancel icon" /> : '' }
        </SearchBarWrapper.Header>
        {searchFocused ? <div className="divider"> </div> : ''}
        <SearchBarWrapper.Body
          search={search}
          searchFocused={searchFocused}
          isResultsEmpty={isResultsEmpty}
        >
          {
            !search
              ? searchWithTagComponent
              : searchResultComponent
          }
        </SearchBarWrapper.Body>
      </SearchBarWrapper>
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

SearchBar.defaultProps = {};

export default SearchBar;
