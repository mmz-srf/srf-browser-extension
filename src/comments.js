const commentsOpen = document.querySelector('.js-comments-open');
const commentsClosed = document.querySelector('.js-comments-closed');

const commentsNumberContainer = document.querySelector('.js-comments-number-container');
const commentsNumber = document.querySelector('.js-comments-number');

const onCommentsOpen = (publishedComments = 0) => {
  commentsOpen.style.display = '';
  commentsClosed.style.display = 'none';
  commentsNumberContainer.style.display = '';
  commentsNumber.textContent = publishedComments
};

const onCommentsClosed = (publishedComments = 0) => {
  commentsOpen.style.display = 'none';
  commentsClosed.style.display = '';
  commentsNumber.textContent= publishedComments
  commentsNumberContainer.style.display = '';
};

const getCommentInfo = (location, urn) => {
  const [,, contentClass, contentId] = urn.split(':');
  // only get comment info for articles
  if (contentClass !== 'article') {
    return;
  }

  fetch(`${location.origin}/commentsapi/v1/public/srf/threads/${urn}/stats`)
    .then((response) => response.json())
    .then((json) => {
      const isOpen = json?.threadState === 'open';
      const publishedComments = json?.commentsPublished ?? 0;

      if (isOpen) {
        onCommentsOpen(publishedComments);
      } else {
        onCommentsClosed(publishedComments);
      }
    }).catch(() => {
      onCommentsClosed();
    });
};

export default getCommentInfo;
