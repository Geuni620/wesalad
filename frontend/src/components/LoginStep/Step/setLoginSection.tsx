import React, { useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import loginAsync from 'redux/actions/loginAsync';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { ITitle, ModalProps } from 'components/LoginStep/loginStep.types';
import { nextStep, setSignUpInfo } from 'redux/reducers/loginSlice';
import BackButton from 'components/BackButton';
import GoogleButton from 'components/LoginStep/google_btn/googleBtn';
import axios from 'axios';

const setLoginSection = ({ handleClose }: ModalProps) => {
  const loginStep = useSelector((state: RootState) => state.login.currentStep);
  const dispatch = useDispatch<AppDispatch>();

  /*
  const googleLogin = useCallback(async () => {
    try {
      const result = await dispatch(loginAsync()).unwrap();
      const token = result.token;
      const googleAccountId = result.id;
      const imageUrl = result.google_account.image_url;

      if (token.access === undefined) {
        localStorage.setItem('accessToken', token.access);
        localStorage.setItem('refreshToken', token.refresh);

        // 만료시간?
        localStorage.setItem('expiredTime', result.updated_at);

        // axios.defaults.headers.common['x-access-token'] = token.access;
        handleClose();
      } else {
        dispatch(
          setSignUpInfo({
            key: 'imageUrl',
            value: imageUrl,
          }),
        );

        dispatch(
          setSignUpInfo({
            key: 'id',
            value: googleAccountId,
          }),
        );

        dispatch(nextStep(loginStep));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  */

  const handleTestLogin = () => {
    console.log('hi');
    axios
      .get('https://wesalad.net/users/google', {})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <LoginSection>
        <BackButton />
        <Title fontSize="80px" marginBottom="40px">
          환영합니다!
        </Title>
        <SubTitle fontSize="24px" marginBottom="70px">
          우선, 로그인부터 해볼까요?
        </SubTitle>
        <BtnSection>
          {/* <GoogleButton /> */}
          <button onClick={handleTestLogin}>로그인</button>
        </BtnSection>
      </LoginSection>
    </>
  );
};

export default setLoginSection;

const TitleHightLight = keyframes`
  0% {
    width:0%;
    box-shadow: inset 0 -25px #2de466;
  }
  50% {
    width:30%;
    box-shadow: inset 0 -25px #2de466;
  }
  100% {
    width:60%;
    box-shadow: inset 0 -25px #2de466;
  }
`;

const SubTitleHightLight = keyframes`
  0% {
    width:0%;
    box-shadow: inset 0 -25px #2de466;
  }
  50% {
    width:20%;
    box-shadow: inset 0 -25px #2de466;
  }
  100% {
    width:40%;
    box-shadow: inset 0 -25px #2de466;
  }
`;

const LoginSection = styled.div`
  padding: calc(198px / 2) 70px;
`;

const Title = styled.h1<ITitle>`
  margin-bottom: ${({ marginBottom }) => marginBottom};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 800;

  &:after {
    content: '';
    display: block;
    width: 60%;
    height: 40px;
    position: absolute;
    background: #2de466;
    transform: translateY(-40px);
    z-index: -100;
    animation: ${TitleHightLight} 1.5s linear;
  }
`;

const SubTitle = styled.h1<ITitle>`
  margin-bottom: ${({ marginBottom }) => marginBottom};
  height: 40px;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ theme }) => theme.weightBold};

  &:after {
    content: '';
    display: block;
    width: 40%;
    height: 20px;
    position: absolute;
    transform: translateY(-10px);
    z-index: -100;
    animation: ${SubTitleHightLight} 1.5s linear;
    animation-delay: 1s;
    animation-fill-mode: forwards;
  }
`;

const BtnSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: none;
  cursor: pointer;
`;

/*
const LoginBtn = styled.button`
  ${({ theme }) => theme.flexMixIn('center', 'center')};
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.fontMedium};
  font-weight: ${({ theme }) => theme.weightBold};
  cursor: pointer;

  div {
    height: 50px;
    margin-left: 5px;
    line-height: 50px;
    font-family: 'Jua', sans-serif;
  }
`;
*/
