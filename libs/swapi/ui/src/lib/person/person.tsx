import './person.module.css';
import { PeopleEntity } from '@starwars/swapi-data-access';

/* eslint-disable-next-line */
export interface PersonProps {
  person: PeopleEntity;
}

export function Person({ person }: PersonProps) {
  return (
    <div className="text-center text-base">
      <div className="w-40 h-40 bg-indigo-400"></div>
      <h3 className="font-medium mt-4">{person.name}</h3>
      <p className="">{person.gender.toUpperCase()}</p>
    </div>
  );
}

export default Person;
