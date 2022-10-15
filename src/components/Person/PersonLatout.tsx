import React, { useMemo, useState } from "react";
import styled from "styled-components";

import { IMovie, IPerson, ITVShow } from "../../api/movie";
import { TVShowColumns, movieColumns } from "../../public/data";
import CardControl from "../CardControl";
import Paging from "../Paging";
import Table from "../Table";

const Container = styled.div``;

const PersonBox = styled.div`
  display: flex;
  padding: 20px;
  overflow: auto;
  border: 1px solid #000;
  white-space: nowrap;
`;

const PersonCard = styled.div`
  cursor: pointer;
  margin-left: 10px;
`;

interface IPersonLayoutProps {
  peopleData: IPerson[];
}

const PersonLayout = ({ peopleData }: IPersonLayoutProps) => {
  const [person, setPerson] = useState<IPerson | undefined>();

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;

    const peopleDataCopy = [...peopleData];
    const selectedPerson = peopleDataCopy.find(
      person => person.id.toString() === target.id,
    );

    setPerson(selectedPerson);
  };

  const dataFiltering = (data: any[], mediaType: string) => {
    return data.filter(
      (media: IMovie | ITVShow) => media.media_type === mediaType,
    );
  };

  const movieData = useMemo(
    () => (person ? dataFiltering(person.known_for, "movie") : []),
    [person],
  );

  const tvShowData = useMemo(
    () => (person ? dataFiltering(person.known_for, "tv") : []),
    [person],
  );

  return (
    <Container>
      {peopleData ? (
        <>
          <PersonBox>
            {peopleData.map(person => (
              <PersonCard
                key={person.id}
                id={person.id.toString()}
                onClick={handleCardClick}
              >
                <CardControl
                  id={person.id}
                  title={person.name}
                  imgPath={`https://image.tmdb.org/t/p/w342/${person.profile_path}`}
                  description={person.known_for_department}
                />
              </PersonCard>
            ))}
          </PersonBox>
          {"Movie"}
          <Table columns={movieColumns} datas={movieData} />
          {"TV"}
          <Table columns={TVShowColumns} datas={tvShowData} />
        </>
      ) : null}
    </Container>
  );
};

export default PersonLayout;
function useSelector(): [any, any] {
  throw new Error("Function not implemented.");
}
