import React, { useMemo, useState } from "react";
import styled from "styled-components";

import { IMovie, IPerson, ITVShow } from "../../api/movie";
import { TVShowColumns, movieColumns } from "../../public/data";
import CardControl from "../CardControl";
import TableControl from "../TableControl";

const Container = styled.div``;

const PersonBox = styled.div`
  display: flex;
  padding: 20px;
  overflow: auto;
  white-space: nowrap;
`;

const TableBox = styled.div`
  height: 30vh;
  margin-top: 3.4rem;
  border-top: solid 0.5px;
  padding: 10px 0;
`;

const PersonCard = styled.div`
  cursor: pointer;
  margin-left: 10px;
`;

const Title = styled.h1`
  font-weight: 600;
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
          <TableBox>
            <Title>{"Movie"}</Title>
            <TableControl columns={movieColumns} datas={movieData} />
          </TableBox>

          <TableBox>
            <Title>{"TV"}</Title>
            <TableControl columns={TVShowColumns} datas={tvShowData} />
          </TableBox>
        </>
      ) : null}
    </Container>
  );
};

export default PersonLayout;
