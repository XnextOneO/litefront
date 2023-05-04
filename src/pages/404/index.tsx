import React, { useCallback } from 'react';
import styled from 'styled-components';

const SpotlightWrap = styled.div`
  background: url(${getRandomBackgroundImage()}) no-repeat center center;
  background-size: cover;
  height: 100vh;
  position: relative;
`;

const SpotlightLink = styled.span`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-shadow: 0 0 10px whitesmoke, 0 0 20px whitesmoke, 0 0 30px whitesmoke,
    0 0 40px whitesmoke;
  font-size: 1.5rem;
  text-decoration: none;

  &:hover {
    color: #fff;
  }
`;

const Spotlight = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: radial-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));
`;

const ButtonErrorLink = styled.button`
  background-color: white;
  border: none;
  color: black;
  padding: 16px 32px;
  text-align: center;
  font-size: 16px;
  margin: 4px 2px;
  opacity: 0.6;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  border-radius: 1em;
  &:hover {
    opacity: 1;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

function getRandomBackgroundImage() {
  const images = [
    'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg',
    'https://img.freepik.com/free-vector/cartoon-galaxy-background-with-planets_23-2148966504.jpg?w=1380&t=st=1683232024~exp=1683232624~hmac=45a627a18a93b40901bc9290ac7d517940b212715711e83ac299243340fddf9f',
  ];

  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

function SpotlightComponent() {
  const onMouseMove = useCallback((event: React.MouseEvent) => {
    const spotlight = document.querySelector('.spotlight') as HTMLElement;
    if (spotlight && spotlight.offsetWidth) {
      const w = spotlight.offsetWidth;
      const h = spotlight.offsetHeight;
      const t = event.pageY - spotlight.offsetTop;
      const l = event.pageX - spotlight.offsetLeft;
      const dx = Math.abs(event.pageX - window.innerWidth / 2);
      const dy = Math.abs(event.pageY - window.innerHeight / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Set the radius of the gradient based on the distance from the center
      const radius =
        500 -
        (distance * 300) /
          Math.sqrt(
            window.innerWidth * window.innerWidth +
              window.innerHeight * window.innerHeight,
          );

      // Update the spotlight style
      spotlight.style.backgroundImage = `radial-gradient(circle at ${
        (l / w) * 100
      }% ${(t / h) * 100}%, transparent 80px, rgba(0, 0, 0, 0.99) ${radius}px)`;
    }
  }, []);

  return (
    <SpotlightWrap onMouseMove={onMouseMove}>
      <ContentWrap>
        <SpotlightLink>Page not found</SpotlightLink>
        <ButtonErrorLink>Back to mainpage :(</ButtonErrorLink>
      </ContentWrap>
      <Spotlight className="spotlight" />
    </SpotlightWrap>
  );
}
export default SpotlightComponent;
