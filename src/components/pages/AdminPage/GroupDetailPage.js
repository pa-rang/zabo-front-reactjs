import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';

import ProfileStats from 'organisms/ProfileStats';
import StyledQuill from 'organisms/StyledQuill';
import { Page } from 'pages/ProfilePage/Profile.styled';

import { getLabeledTimeDiff } from 'lib/utils';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import GridContainer from './components/Grid/GridContainer';
import UserCard from './UserCard';

const GroupDetailPage = ({ match }) => {
  const { name } = match.params;
  const groupIm = useSelector (state => state.getIn (['admin', 'groupsMap', name]));
  const group = useMemo (() => (groupIm ? groupIm.toJS () : null), [groupIm]);
  if (!group) return null;
  const {
    profilePhoto, members, recentUpload, description, subtitle,
  } = group;

  return (
    <div>
      <Page.Header>
        <Page.Header.Left>
          <Page.Header.Left.ProfilePhoto>
            {
              profilePhoto
                ? <img src={profilePhoto} alt="profile photo" />
                : <img src={groupDefaultProfile} alt="default profile img" />
            }
          </Page.Header.Left.ProfilePhoto>
          <Page.Header.Left.UserInfo>
            <h1>{name}</h1>
            <Tooltip title={subtitle}>
              <p>{subtitle || '아직 소개가 없습니다.'}</p>
            </Tooltip>
          </Page.Header.Left.UserInfo>
        </Page.Header.Left>
      </Page.Header>
      <Page.Body>
        <Page.Body.Group>
          <StyledQuill
            theme="bubble"
            readOnly
            value={description}
          />
        </Page.Body.Group>
        <h3>Members</h3>
        <GridContainer>
          {members.map (member => (
            <UserCard user={member.user} />
          ))}
        </GridContainer>
      </Page.Body>
    </div>
  );
};

export default GroupDetailPage;
