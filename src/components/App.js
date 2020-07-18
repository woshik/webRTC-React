import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import JoinDialog from './JoinDialog';
import LoadingView from './LoadingView';

const Room = React.lazy(() => import('./Room'));

const App = (props) => {
  const { room, match } = props;

  if (!room.joined) {
    return <JoinDialog roomId={match.params.id} />;
  } else {
    return (
      <Suspense fallback={<LoadingView />}>
        <Room />
      </Suspense>
    );
  }
};

App.propTypes = {
  room: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  room: state.room,
});

export default connect(mapStateToProps, null, null, {
  areStatesEqual: (next, prev) => {
    return prev.room === next.room;
  },
})(App);
