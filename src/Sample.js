import styled from '@emotion/styled';

const StyledDiv = styled.div`
  background-color: gray;
  color: black;
  width: 100%;
  height: 600px;
`;

const Sample = () => {
  return (
    <StyledDiv>
      <label>Name</label>
      <input type="text" style={{ height: '50px', width: '300px' }}></input>
    </StyledDiv>
  );
};

export default Sample;
