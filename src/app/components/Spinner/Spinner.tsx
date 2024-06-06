import styled from "styled-components";

const SpinnerStyled = styled.div`
  border: 6px solid #e2e8f0;
  border-top: 6px solid #082f49;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function Spinner() {
  return (
    <SpinnerContainer>
      <SpinnerStyled></SpinnerStyled>
    </SpinnerContainer>
  );
}
