import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    margin: auto;
    font-size: 3em;
  }
`;

const Title = ({name}) => (
    <Wrapper>
        <h1>{name ? `${name}'s ` : "My "} Chat Room</h1>
    </Wrapper>
);

export default Title