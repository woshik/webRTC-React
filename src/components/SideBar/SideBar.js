import React, { useState } from 'react';
import SmallLogo from '../../images/main_small_logo.png';
import Avator from '../../images/user_avatar.png';
import { withRoomContext } from '../../RoomContext';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { lobbyPeersKeySelector, peersLengthSelector, raisedHandsSelector, makePermissionSelector } from '../Selectors';
import * as roomActions from '../../actions/roomActions';
import * as toolareaActions from '../../actions/toolareaActions';
import * as appPropTypes from '../appPropTypes';
import { permissions } from '../../permissions';

function SideBar(props) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);

  const handleExited = () => {
    setCurrentMenu(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuOpen = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setCurrentMenu(menu);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);

    handleMobileMenuClose();
  };

  const {
    roomClient,
    room,
    peersLength,
    lobbyPeers,
    permanentTopBar,
    drawerOverlayed,
    toolAreaOpen,
    isMobile,
    myPicture,
    loggedIn,
    loginEnabled,
    fullscreenEnabled,
    fullscreen,
    onFullscreen,
    setSettingsOpen,
    setExtraVideoOpen,
    setHelpOpen,
    setAboutOpen,
    setLockDialogOpen,
    toggleToolArea,
    openUsersTab,
    unread,
    canProduceExtraVideo,
    canLock,
    canPromote,
  } = props;

  return (
    <React.Fragment>
      <figure className="image full-logo is-inline-block">
        <span>
          <img src={SmallLogo} />
        </span>
      </figure>
      <div className="meeting-additional-options">
        <div className="icon-item-wrapper" onClick={() => toggleToolArea()}>
          <div className="tooltip is-positioned-right">
            <span>Drawer</span>
          </div>
          {unread > 0 ? <span className="primary-badge">{unread}</span> : ''}
          <span className="button is-rounded is-medium is-clear icon-item">
            <ion-icon class="icon" name="menu"></ion-icon>
          </span>
        </div>

        <div className="bottom-icons">
          <div
            className="icon-item-wrapper"
            onClick={() => {
              if (room.locked) {
                roomClient.unlockRoom();
              } else {
                roomClient.lockRoom();
              }
            }}
          >
            <div className="tooltip is-positioned-right">
              <span>{room.locked ? 'Unlock room' : 'Lock room'}</span>
            </div>
            <span className="button is-rounded is-medium is-clear icon-item">
              <ion-icon class="icon" name={'lock-' + (room.locked ? 'closed' : 'open')}></ion-icon>
            </span>
          </div>

          {lobbyPeers.length > 0 && (
            <div className="icon-item-wrapper" onClick={() => setLockDialogOpen(!room.lockDialogOpen)}>
              <div className="tooltip is-positioned-right">
                <span>Show lobby</span>
              </div>
              <span className="primary-badge">{lobbyPeers.length}</span>
              <span className="button is-rounded is-medium is-clear icon-item">
                <ion-icon class="icon" name="shield"></ion-icon>
              </span>
            </div>
          )}

          <div className="icon-item-wrapper" onClick={() => openUsersTab()}>
            <div className="tooltip is-positioned-right">
              <span>Show participants</span>
            </div>
            <span className="primary-badge">{peersLength + 1}</span>
            <span className="button is-rounded is-medium is-clear icon-item">
              <ion-icon class="icon" name="people"></ion-icon>
            </span>
          </div>

          {fullscreenEnabled && (
            <div
              className="icon-item-wrapper"
              onClick={() => {
                handleMenuClose();
                onFullscreen();
              }}
            >
              <div className="tooltip is-positioned-right">
                <span>{fullscreen ? 'Leave Fullscreen' : 'Enter Fullscreen'}</span>
              </div>
              <span className="button is-rounded is-medium is-clear icon-item">
                <ion-icon class="icon" name="scan"></ion-icon>
              </span>
            </div>
          )}

          <div className="icon-item-wrapper" onClick={() => setSettingsOpen(!room.settingsOpen)}>
            <div className="tooltip is-positioned-right">
              <span>Settings</span>
            </div>
            <span className="button is-rounded is-medium is-clear icon-item">
              <ion-icon class="icon" name="settings-sharp"></ion-icon>
            </span>
          </div>

          <div
            className="icon-item-wrapper"
            onClick={() => {
              handleMenuClose();
              setHelpOpen(!room.helpOpen);
            }}
          >
            <div className="tooltip is-positioned-right">
              <span>Help</span>
            </div>
            <span className="button is-rounded is-medium is-clear icon-item">
              <ion-icon class="icon" name="help-circle"></ion-icon>
            </span>
          </div>

          <div className="icon-item-wrapper" onClick={() => roomClient.close()}>
            <div className="tooltip is-positioned-right">
              <span>Leave</span>
            </div>
            <span className="button is-rounded is-medium is-clear icon-item">
              <ion-icon class="icon" name="log-out"></ion-icon>
            </span>
          </div>
        </div>
        <figure className="image user-avatar is-64x64">
          <span>
            <img className="is-rounded" src={Avator} />
          </span>
        </figure>
      </div>
    </React.Fragment>
  );
}

SideBar.propTypes = {
  roomClient: PropTypes.object.isRequired,
  room: appPropTypes.Room.isRequired,
  isMobile: PropTypes.bool.isRequired,
  peersLength: PropTypes.number,
  lobbyPeers: PropTypes.array,
  permanentTopBar: PropTypes.bool.isRequired,
  drawerOverlayed: PropTypes.bool.isRequired,
  toolAreaOpen: PropTypes.bool.isRequired,
  myPicture: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
  loginEnabled: PropTypes.bool.isRequired,
  fullscreenEnabled: PropTypes.bool,
  fullscreen: PropTypes.bool,
  onFullscreen: PropTypes.func.isRequired,
  setToolbarsVisible: PropTypes.func.isRequired,
  setSettingsOpen: PropTypes.func.isRequired,
  setExtraVideoOpen: PropTypes.func.isRequired,
  setHelpOpen: PropTypes.func.isRequired,
  setAboutOpen: PropTypes.func.isRequired,
  setLockDialogOpen: PropTypes.func.isRequired,
  toggleToolArea: PropTypes.func.isRequired,
  openUsersTab: PropTypes.func.isRequired,
  unread: PropTypes.number.isRequired,
  canProduceExtraVideo: PropTypes.bool.isRequired,
  canLock: PropTypes.bool.isRequired,
  canPromote: PropTypes.bool.isRequired,
};

const makeMapStateToProps = () => {
  const hasExtraVideoPermission = makePermissionSelector(permissions.EXTRA_VIDEO);

  const hasLockPermission = makePermissionSelector(permissions.CHANGE_ROOM_LOCK);

  const hasPromotionPermission = makePermissionSelector(permissions.PROMOTE_PEER);

  const mapStateToProps = (state) => ({
    room: state.room,
    isMobile: state.me.browser.platform === 'mobile',
    peersLength: peersLengthSelector(state),
    lobbyPeers: lobbyPeersKeySelector(state),
    permanentTopBar: state.settings.permanentTopBar,
    drawerOverlayed: state.settings.drawerOverlayed,
    toolAreaOpen: state.toolarea.toolAreaOpen,
    loggedIn: state.me.loggedIn,
    loginEnabled: state.me.loginEnabled,
    myPicture: state.me.picture,
    unread: state.toolarea.unreadMessages + state.toolarea.unreadFiles + raisedHandsSelector(state),
    canProduceExtraVideo: hasExtraVideoPermission(state),
    canLock: hasLockPermission(state),
    canPromote: hasPromotionPermission(state),
  });

  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => ({
  setToolbarsVisible: (visible) => {
    dispatch(roomActions.setToolbarsVisible(visible));
  },
  setSettingsOpen: (settingsOpen) => {
    dispatch(roomActions.setSettingsOpen(settingsOpen));
  },
  setExtraVideoOpen: (extraVideoOpen) => {
    dispatch(roomActions.setExtraVideoOpen(extraVideoOpen));
  },
  setHelpOpen: (helpOpen) => {
    dispatch(roomActions.setHelpOpen(helpOpen));
  },
  setAboutOpen: (aboutOpen) => {
    dispatch(roomActions.setAboutOpen(aboutOpen));
  },
  setLockDialogOpen: (lockDialogOpen) => {
    dispatch(roomActions.setLockDialogOpen(lockDialogOpen));
  },
  toggleToolArea: () => {
    dispatch(toolareaActions.toggleToolArea());
    dispatch(toolareaActions.setToolTab('chat'));
  },
  openUsersTab: () => {
    dispatch(toolareaActions.openToolArea());
    dispatch(toolareaActions.setToolTab('users'));
  },
});

export default withRoomContext(
  connect(makeMapStateToProps, mapDispatchToProps, null, {
    areStatesEqual: (next, prev) => {
      return (
        prev.room === next.room &&
        prev.peers === next.peers &&
        prev.lobbyPeers === next.lobbyPeers &&
        prev.settings.permanentTopBar === next.settings.permanentTopBar &&
        prev.settings.drawerOverlayed === next.settings.drawerOverlayed &&
        prev.me.loggedIn === next.me.loggedIn &&
        prev.me.browser === next.me.browser &&
        prev.me.loginEnabled === next.me.loginEnabled &&
        prev.me.picture === next.me.picture &&
        prev.me.roles === next.me.roles &&
        prev.toolarea.unreadMessages === next.toolarea.unreadMessages &&
        prev.toolarea.unreadFiles === next.toolarea.unreadFiles &&
        prev.toolarea.toolAreaOpen === next.toolarea.toolAreaOpen
      );
    },
  })(SideBar)
);
