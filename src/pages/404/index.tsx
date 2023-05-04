import React, { useCallback } from 'react';
import styled from 'styled-components';

const SpotlightWrap = styled.div`
  background: url('https://static-cse.canva.com/blob/846900/photo1502082553048f009c37129b9e1583341920812.jpeg')
    no-repeat center center;
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

function SpotlightComponent() {
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const spotlight = document.querySelector('.spotlight') as HTMLElement;
    if (spotlight) {
      const w = spotlight.offsetWidth;
      const h = spotlight.offsetHeight;
      const t = event.pageY - spotlight.offsetTop;
      const l = event.pageX - spotlight.offsetLeft;
      const distanceFromCenter = Math.sqrt((l - w / 2) ** 2 + (t - h / 2) ** 2);
      const radius = Math.sqrt(w ** 2 + h ** 2) / 2;
      const newRadius = Math.max(radius - distanceFromCenter, 2);
      spotlight.style.backgroundImage = `radial-gradient(circle at ${
        (l / w) * 100
      }% ${
        (t / h) * 100
      }%, transparent ${newRadius}px, rgba(0, 0, 0, 0.99) 400px)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const spotlight = document.querySelector('.spotlight') as HTMLElement;
    if (spotlight) {
      spotlight.style.backgroundImage = 'none';
    }
  }, []);

  return (
    <SpotlightWrap
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ContentWrap>
        <SpotlightLink>Page not found</SpotlightLink>
        <ButtonErrorLink>Back to mainpage :(</ButtonErrorLink>
      </ContentWrap>
      <Spotlight className="spotlight" />
    </SpotlightWrap>
  );
}

export default SpotlightComponent;
