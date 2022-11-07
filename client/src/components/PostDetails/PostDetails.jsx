import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const WhiteTextTypography = withStyles({
  root: {
    color: "#FF6600",
    fontFamily:'sans serif'
  }
})(Typography);


const Post = () => {
  const formatPseudo = pseudo => /[aeiouy]/i.test(post.demande[0]) ? `l'${post.demande}` : `la ${post.demande}`
  const formatP = pseudo => /[aeiouy]/i.test(post.demande[0]) ? `d'${post.demande}` : `de ${post.demande}`
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = event => {
    // 👇️ toggle visibility
    setIsVisible(current => !current);
  };
  const [Visible, setVisible] = useState(false);
  const handleClickV = event => {
    // 👇️ toggle visibility
    setVisible(current => !current);
  };

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <div className={classes.section_head}>
          <Typography variant="h4" component="h3">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          <Typography gutterBottom variant="h5" component="p">{post.message}</Typography>
          <Typography variant="body1">
           Traité par:
            <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#FF6600' }}>
              {` ${post.name}`}   {moment(post.createdAt).fromNow()}
            </Link>
          </Typography>
          <Typography variant="body1">{post.createdAt}</Typography>
          </div>
          <Divider style={{ margin: '20px 0' }} />
{/*Mails*/}
<FormControlLabel
          control={<Switch onChange={handleClick} aria-label="login switch" />}
          label={!isVisible ? 'Afficher les mails' : 'Cacher les mails'}
        />
        { isVisible && <>
<div className={classes.remarquesOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <WhiteTextTypography gutterBottom variant="h6" >Mail de suspension</WhiteTextTypography>
          <div>Bonjour { post.nom} ,</div>
            <br/>
                                <div>Je fais suite à votre demande sous la référence "{post.title}" par rapport à {post.demande}</div>
                              
            <br/><div>Le traitement de votre demande est effectif.</div>
              <br />       <div>Des tests et vérification ont été réalisés de notre côté. Tout est bien fonctionnel.
              <br />  </div>
                            <br/>    <div>De votre côté, pourriez-vous s’il vous plaît effectuer un test et nous faire un retour ?</div>
                            <br/>   <div>En vous remerciant, par avance de votre collaboration.</div>
                               <br/>
            <div>Dans l’attente, je procède à la suspension de votre ticket.</div>
            <br/>
                                <div>Au plaisir de vous aider, n’hésitez pas à revenir vers nous en cas de besoin</div>
                             
            <br />
                        <div>Cordialement,</div>
        </div>
        
        <div style={{ width: '50%' }}>
          <WhiteTextTypography gutterBottom variant="h6">Mail de suspension</WhiteTextTypography>
          <div>Bonjour M. { post.nom},</div>
            <br/>
                                <div>Je fais suite à votre demande sous la référence "{post.title}" par rapport à {post.demande}</div>
                              
            <br/><div>Le traitement a pris fin. Des tests et vérification ont été réalisés de notre côté.</div>

                            <br/>    <div>Tout est bien fonctionnel. De votre côté, pouvez-vous s'il vous plaît effectuer un test et nous faire un retour par la suite ?</div>
                            <br/>  <div>En vous remerciant, par avance de votre collaboration.</div>
                               <br/>
            <div>Dans l’attente, je procède à la suspension de votre ticket.</div>
            <br/>
                                <div>Au plaisir de vous aider, n’hésitez pas à revenir vers nous en cas de besoin</div>
                             
            <br />
                        <div>Cordialement,</div>
                        
        </div>
      </div>
{/*Fin des Mails*/}
 <Divider style={{ margin: '20px 0' }} />
 {/*Mails*/}
<div className={classes.remarquesOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <WhiteTextTypography gutterBottom variant="h6">Mail de fin de suspension</WhiteTextTypography>
       
        <br/>  <div>Bonjour{post.nom},</div>
                             <br/>   <div>Je reviens vers vous par rapport à votre demande {formatP(post.demande)} ticket sous la référence " { post.title} " </div>
                             <br/>   <div>Le nécessaire a été effectué concernant votre demande.</div>
              <br />    <div>Suite à votre confirmation, {formatP(post.demande)} est effective</div>
                           <br/>     <div>De ce fait, je me permets de mettre fin à la suspension de ce ticket pour clôture.</div>
                          <br/>      <div>Je vous remercie de nous avoir sollicité, je me tiens à votre disposition pour d’éventuelles questions.</div>
                        <br />    <div>Cordialement,</div>
                        </div>
        <div style={{ width: '50%' }}>
          <WhiteTextTypography gutterBottom variant="h6">Mail de fin de suspension</WhiteTextTypography>
          <br/>     <div>Bonjour{post.nom},</div>
                             <br/>   <div>Je reviens vers vous par rapport à votre demande {formatP(post.demande)} ticket sous la référence " { post.title} " </div>
                             <br/>   <div>Le nécessaire a été effectué concernant votre demande.</div>
              <br />    <div>Suite à votre confirmation, {formatP(post.demande)} est effective</div>
                           <br/>     <div>De ce fait, je me permets de mettre fin à la suspension de ce ticket pour clôture.</div>
                          <br/>      <div>Je vous remercie de nous avoir sollicité, je me tiens à votre disposition pour d’éventuelles questions.</div>
                        <br />    <div>Cordialement,</div>
        </div>
      </div>
{/*Fin des Mails*/}
{/*Mails*/}
<Divider style={{ margin: '20px 0' }} />
<div className={classes.remarquesOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <WhiteTextTypography gutterBottom variant="h6">Mail de cloture</WhiteTextTypography>
          <br/>  <div>Je fais suite à votre demande sous la référence <strong>{ post.title}</strong>  au sujet de "{formatPseudo(post.demande) }".</div>
                              <br/>  <div>{ post.demande} est bien effective. </div>
                             <br/>   <div>De ce fait, je procède donc à la clôture de ce ticket.</div>
                             <br/>   <div>Je vous remercie d’avoir sollicité le support Orange Business Services et reste à votre disposition en cas de besoin.</div>
                             <br/>   <div>Cordialement,</div>
        </div>
       
        <div style={{ width: '50%' }}>
          <WhiteTextTypography gutterBottom variant="h6">Mail de cloture</WhiteTextTypography>
          <br/>
                              <br/>  <div>Je reviens vers vous concernant la demande "{formatP(post.demande)} " référencée sur le ticket <strong>{ post.title}</strong></div>
                             <br/>   <div>Suite à votre confirmation, le nécessaire a été effectué concernant votre demande.</div>
                             <br/>   <div>Par conséquent, je procède donc à la clôture de ce ticket.</div>
                             <br/>   <div>Je vous remercie d’avoir sollicité le support Orange Business Services et reste à votre disposition en cas de besoin.</div>
                        <br />   <div>Cordialement,</div>
        </div>
      </div>
{/*Fin des Mails*/}
</>}

<Divider style={{ margin: '20px 0' }} />
<FormControlLabel
variant="outlined"
          control={<Switch onChange={handleClickV} aria-label="login switch" />}
          label={!Visible ? 'Afficher ATD' : 'Cacher ATD'}
        />
{ Visible && <>
<WhiteTextTypography gutterBottom variant="h6">ATD</WhiteTextTypography>
<div className='codeGame'>
       
<code>
       
          {`<div style="font-family: 'Times New Roman', sans-serif !important; font-size: 12pt; ">`}  <br />
          {`<div style="margin-top:15px;">Objet du traitement<strong style="color: #FF8C00;margin-bottom:15px"> `}  { post.traitement} {`</strong></div>`}  <br />
          {` <ol>`}  <br />
          {`<li style="margin-bottom:15px;">Accès au serveur<strong style="color: #3b5998;margin-bottom:15px"> : `}  { post.serveur} {`</strong></li>`}  <br />
          {`   <li style="margin-bottom:15px;">Outil<strong style="color: #3b5998;"> :`}  { post.console} {`</strong></li>`}  <br />
         {`   <li style="margin-bottom:15px;">Compte<strong style="color: #3b5998;"> :`}  { post.compte} {`</strong></li>`}  <br />
         {`    <li style="margin-bottom:15px;">Outils de gestion<strong style="color: #3b5998;"> : Console __ </strong></li>`}  <br />
           {`  <li style="margin-bottom:10px;" >Actions menées</li>`}  <br />
           {`  <ul>`}  <br />
          
         {`     <div style="color: #556B2F;margin-bottom:15px;"> ✳ <strong style="margin-bottom:15px;"> Sur `}  { post.outils} {`:</strong>`}   <br />
           {`   <ul>`}   <br />
         {`        <div style="margin-top:15px;">✔ `} {post.action1};{`</div>`}  <br />
             {`        <div style="margin-top:15px;">✔ `} {post.action2};{`</div>`}  <br />

       {`     </ul>`}  <br />
         {`    </div>`}  <br />
         {`    <div style="color: #556B2F;"> ✳ <strong style="margin-bottom:15px;"> Sur `}  { post.outils2} {`: </strong>`}  <br />
           {`    <ul>`}  <br />
           {`      <div style="margin-top:15px;">✔ `} {post.action3};{`</div>`}  <br />
                   {`       <div style="margin-bottom:15px;">✔ `} {post.resultat};{`</div>`}  <br />
             {`    </ul>`}  <br />
           {`     </ul>`}  <br />
             {`     </ol>`}  <br />
             {`   </div>`}  <br />
             {`  <div><img  style="border : 1px outset ; margin:25px 0;"`}{`src="`} {`" alt="A65" border="0"></div>`} 
         {`</div>`}  <br /> 
  
       
              </code>
              </div>
              </>}
          <Divider style={{ margin: '20px 0' }} />
        </div>
      </div>
      {!recommendedPosts.length && (
        <div className={classes.section}>
          <WhiteTextTypography gutterBottom variant="h5">D'autres tickets:</WhiteTextTypography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;
