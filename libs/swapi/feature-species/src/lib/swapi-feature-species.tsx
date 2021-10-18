import './swapi-feature-species.module.css';
import { Navbar } from '@starwars/swapi/ui';

/* eslint-disable-next-line */
export interface SwapiFeatureSpeciesProps {}

export function SwapiFeatureSpecies(props: SwapiFeatureSpeciesProps) {
  return (
    <div className="min-h-screen">
      <Navbar activeIndex={1}/>
      <h1 className="text-center font-medium text-xl">SAME AS PEOPLE</h1>
    </div>
  );
}

export default SwapiFeatureSpecies;
