import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import API from 'config';
import DropdownItem from 'components/Nav/Dropdown';
import customHttp from 'utils/Axios';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IFetchResultData } from 'components/LoginStep/loginStep.types';

const LoginUser = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<IFetchResultData>();

  /**
   * @todo 불필요한 요소 삭제 & 타입단언 수정
   */

  // const token = {
  //   access: localStorage.getItem('accessToken'),
  //   refresh: localStorage.getItem('refreshToken'),
  // };

  // const getUserImageUrl = useCallback(async () => {
  //   const { data } = await customHttp.get(`${API.userDellModify}`, {
  //     headers: {
  //       access: `${token.access}`,
  //       refresh: `${token.refresh}`,
  //     },
  //   });
  //   setUser(data);
  //   if (user === undefined) return;
  // }, [token.access]);

  // useEffect(() => {
  //   getUserImageUrl();
  // }, []);

  const imageUrl = window.localStorage.getItem('imageUrl') as string;

  if (!imageUrl)
    useEffect(() => {
      const handleCloseMenu = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node))
          setMenuVisible(false);
      };

      document.addEventListener('click', handleCloseMenu);
      return () => document.removeEventListener('click', handleCloseMenu);
    }, [menuRef]);

  return (
    <>
      <ProfileSection
        ref={menuRef}
        onClick={() => setMenuVisible(!menuVisible)}
      >
        <img alt="userImg" src={imageUrl} />
        <ArrowIcon size={20} />
      </ProfileSection>
      {menuVisible && <DropdownItem />}
    </>
  );
};

export default LoginUser;

const ProfileSection = styled.div`
  cursor: pointer;

  img {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
  }
`;

const ArrowIcon = styled(IoMdArrowDropdown)`
  transform: translateY(5px);
  color: grey;
  transition: all 0.2s ease-in;
  transform-origin: center 60%;
`;
