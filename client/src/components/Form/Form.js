import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '',
  serveur: '', console: '',
  compte: '', action1: '',
  action2: '', action3: '',
  action4: '', demande: '',
  traitement: '', nom: '',
  tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '',
    serveur: '', console: '',
    compte: '', action1: '',
    action2: '', action3: '',
    action4: '', demande: '',
    traitement: '', nom: '',
    tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Enregistrez-vous ou connectez-vous pour voir le contenu
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editer "${post?.title}"` : 'Ajouter un ticket'}</Typography>
        <TextField name="title" variant="outlined" label="Ticket" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth  rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="traitement" variant="outlined" label="Traitement" fullWidth value={postData.traitement} onChange={(e) => setPostData({ ...postData, traitement: e.target.value })} />
        <TextField name="nom" variant="outlined" label="Nom" fullWidth  rows={4} value={postData.nom} onChange={(e) => setPostData({ ...postData, nom: e.target.value })} />
        <TextField name="demande" variant="outlined" label="Demande" fullWidth value={postData.demande} onChange={(e) => setPostData({ ...postData, demande: e.target.value })} />
        <TextField name="serveur" variant="outlined" label="serveur" fullWidth  rows={4} value={postData.serveur} onChange={(e) => setPostData({ ...postData, serveur: e.target.value })} />
        <TextField name="console" variant="outlined" label="console" fullWidth value={postData.console} onChange={(e) => setPostData({ ...postData, console: e.target.value })} />
        <TextField name="compte" variant="outlined" label="compte" fullWidth  rows={4} value={postData.compte} onChange={(e) => setPostData({ ...postData, compte: e.target.value })} />
        <TextField name="action1" variant="outlined" label="action1" fullWidth value={postData.action1} onChange={(e) => setPostData({ ...postData, action1: e.target.value })} />
        <TextField name="action2" variant="outlined" label="action2" fullWidth  rows={4} value={postData.action2} onChange={(e) => setPostData({ ...postData, action2: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button variant="contained" className={classes.orange} size="large" type="submit" fullWidth>Soumettre</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Effacer</Button>
      </form>
    </Paper>
  );
};

export default Form;
