import {
  fetchPeople,
  peopleActions,
  selectAllPeople,
  selectCurrentPage,
  selectPagesCount,
  selectPeopleStatus,
} from '@starwars/swapi-data-access';
import { Navbar, Person } from '@starwars/swapi/ui';
import { stringIncludes } from '@starwars/swapi/util-filter';
import { sortByStringProperty } from '@starwars/swapi/util-sort';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface SwapiFeatureSearchProps {}

export function SwapiFeaturePeople(props: SwapiFeatureSearchProps) {
  const currentPage = useSelector(selectCurrentPage);
  const [peopleQuery, setPeopleQuery] = useState('');
  const pageSize = 10;
  const dispatch = useDispatch();
  const people = useSelector(selectAllPeople).slice(
    currentPage * pageSize - pageSize,
    currentPage * pageSize
  );
  const peopleStatus = useSelector(selectPeopleStatus);
  const pagesCount = useSelector(selectPagesCount);
  const [areSortedByName, setSortedByName] = useState(false);
  const [areSortedByGender, setSortedByGender] = useState(false);

  console.log(currentPage);

  useEffect(() => {
    if (currentPage > pagesCount) {
      dispatch(fetchPeople(currentPage));
    }
  }, [currentPage]);

  const handlePrev = () => {
    dispatch(peopleActions.prevPage());
  };

  const handleNext = () => {
    dispatch(peopleActions.nextPage());
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPeopleQuery(event.target.value);

  const handleDebouncedQueryChange = useMemo(
    () => _.debounce(handleQueryChange, 300),
    []
  );

  const handleToggleSortByName = () =>
    setSortedByName((areSortedByName) => !areSortedByName);

  const handleToggleSortByGender = () =>
    setSortedByGender((areSortedByGender) => !areSortedByGender);

  const sortPeople = () => {
    let sortedPeople = people;
    if (areSortedByName) {
      sortByStringProperty(sortedPeople as [], 'name');
    }
    if (areSortedByGender) {
      sortByStringProperty(sortedPeople as [], 'gender');
    }
    return sortedPeople;
  };

  return (
    <div className="min-h-screen">
      <Navbar activeIndex={0} />
      <div className="mb-24 grid grid-cols-3">
        <input
          placeholder="Search people..."
          className="rounded-sm p-4 border border-gray-400 focus:outline-none col-start-2"
          onChange={handleDebouncedQueryChange}
        />
        <div className="flex items-center space-x-2 col-start-3 justify-end">
          <p>SORT BY</p>
          <button
            className={classNames('p-2 bg-red-400 text-white rounded', {
              'bg-red-700': areSortedByName,
            })}
            onClick={handleToggleSortByName}
          >
            NAME
          </button>
          <button
            className={classNames('p-2 bg-gray-600 text-gray-200 rounded', {
              'bg-gray-900': areSortedByGender,
            })}
            onClick={handleToggleSortByGender}
          >
            GENDER
          </button>
        </div>
      </div>
      <div className="flex flex-wrap space-x-4 space-y-4 justify-center">
        {peopleStatus === 'loading' ? (
          <p className="font-bold text-xl">LOADING...</p>
        ) : (
          sortPeople()
            .filter((person) =>
              peopleQuery ? stringIncludes(person.name, peopleQuery) : person
            )
            .map((person) => <Person key={person.name} person={person} />)
        )}
      </div>
      <div className="text-center space-x-4 mt-24">
        <button
          className={classNames({ 'opacity-40': currentPage === 1 })}
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          PREV
        </button>
        <button
          className={classNames({ 'opacity-40': people.length < pageSize })}
          onClick={handleNext}
          disabled={people.length < pageSize}
        >
          NEXT
        </button>
        <p className="text-sm mt-4">{`PAGE ${currentPage}`}</p>
      </div>
    </div>
  );
}

export default SwapiFeaturePeople;
