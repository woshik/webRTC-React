import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DOMPurify from 'dompurify';
import marked from 'marked';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useIntl } from 'react-intl';

const linkRenderer = new marked.Renderer();

linkRenderer.link = (href, title, text) => {
  title = title ? title : href;
  text = text ? text : href;

  return `<a target='_blank' href='${href}' title='${title}'>${text}</a>`;
};

const styles = (theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    flexShrink: 0,
    boxShadow: 'none',
    width: '78%',
  },
  selfMessage: {
    marginLeft: 'auto',
    justifyContent: 'flex-end',
  },
  remoteMessage: {
    marginRight: 'auto',
    justifyContent: 'flex-start',
  },
  info: {
    alignSelf: 'flex-end',
    marginRight: '8px',
  },
  text: {
    alignSelf: 'flex-end',
    marginRight: '8px',
    '& p': {
      margin: 0,
    },
  },
  remoteText: {
    alignSelf: 'flex-start',
    '& p': {
      margin: 0,
    },
  },
  content: {
    marginLeft: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    borderRadius: '4px',
    height: '2rem',
    alignSelf: 'end',
  },
});

const Message = (props) => {
  const intl = useIntl();

  const { self, picture, text, time, name, classes } = props;
  console.log(time);
  return (
    <Paper className={classnames(classes.root, self ? classes.selfMessage : classes.remoteMessage)}>
      {self ? (
        <React.Fragment>
          <div className={classes.content}>
            <Typography className={classes.info} variant="caption">
              {time} - Me
            </Typography>
            <Typography
              className={classes.text}
              variant="subtitle1"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked.parse(text, { renderer: linkRenderer }), {
                  ALLOWED_TAGS: ['a'],
                  ALLOWED_ATTR: ['href', 'target', 'title'],
                }),
              }}
            />
          </div>
          <img alt="Avatar" className={classes.avatar} src={picture} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img alt="Avatar" className={classes.avatar} src={picture} />
          <div className={classes.content}>
            <Typography variant="caption">
              {name} - {time}
            </Typography>
            <Typography
              className={classes.remoteText}
              variant="subtitle1"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked.parse(text, { renderer: linkRenderer }), {
                  ALLOWED_TAGS: ['a'],
                  ALLOWED_ATTR: ['href', 'target', 'title'],
                }),
              }}
            />
          </div>
        </React.Fragment>
      )}
    </Paper>
  );
};

Message.propTypes = {
  self: PropTypes.bool,
  picture: PropTypes.string,
  text: PropTypes.string,
  time: PropTypes.object,
  name: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Message);
