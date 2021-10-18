import { PeopleEntity } from '@starwars/swapi-data-access';
import axios from 'axios';

const API_URL = 'https://swapi.dev/api';

interface PeopleResponse {
  results: PeopleEntity[];
}

export async function getPeople(page: number) {
  console.log('page:', page);
  const { data } = await axios.get<PeopleResponse>(`${API_URL}/people`, { params: { page } });
  return data.results;
}
