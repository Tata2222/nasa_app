import React, { useMemo} from 'react';
import cn from 'classnames';
import './NeoCard.scss'

type NeoCardProps = {
  neo: DataPerDay;
  isDangerous: boolean;
};

export const NeoCard: React.FC<NeoCardProps> = ({ neo, isDangerous }) => {
  const { near_earth_objects, element_count } = neo;
  const date = Object.keys(near_earth_objects)[0];

  const nearestNeo = useMemo(() => {
    return Math.round(Math.min(...near_earth_objects[date]
      .map(el => Number(el.close_approach_data[0].miss_distance.kilometers))
    ))
  },[near_earth_objects]);

  const fastestNeo = useMemo(() => {
    return Math.round(Math.max(...near_earth_objects[date]
      .map(el => Number(el.close_approach_data[0].relative_velocity.kilometers_per_hour))
    ))
  },[near_earth_objects])

  const maxNeoDiameter = useMemo(() => {
    return Math.max(...near_earth_objects[date]
      .map(el => Number(el.estimated_diameter.kilometers.estimated_diameter_max))).toFixed(3);
  },[near_earth_objects]);

  const hazardousNeoCount = useMemo(() => {
    return near_earth_objects[date]
      .filter(el => el.is_potentially_hazardous_asteroid).length
  },[near_earth_objects])

  return (
    <li className="neocard">
      <div className={cn('neocard__container',{'dangerous': isDangerous})}>
       <div className="neocard__info">
          <p className="neocard__date">
            {date}
          </p>
          <p  className="neocard__neo-count">
            {element_count} neos
          </p>
        </div>
        <div className="neocard__parameters">
          <div className="neocard__parameters-item">
            <p>Nearest NEO</p>
            <p>{nearestNeo} km</p>
          </div>
          <div className="neocard__parameters-item">
            <p>Fastest NEO</p>
            <p>{fastestNeo} km/h</p>
          </div>
          <div className="neocard__parameters-item">
            <p>Potentially hazardous NEOs</p>
            <p>{hazardousNeoCount} neo(s)</p>
          </div>
          <div className="neocard__parameters-item">
            <p>Max estimated NEO diameter</p>
            <p>{maxNeoDiameter} km</p>
          </div>
        </div>
      </div>
    </li>
  );
};
