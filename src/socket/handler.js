function connectionHandler() {
  console.log("connected");
}
function disconnectHandler() {
  console.log("disconnected");
}
function errorHandler(msg) {
  console.log("error");
  return (msg) => {
    console.log("received end game event");
    gameState.notification.add(`error`);
  };
}
function textResponseMessageHandler() {
  console.log("message");
}
function endGame(gameState) {
  return (msg) => {
    console.log("received end game event");
    gameState.notification.add(`🎴 Game has ended`);
  };
}

function playCard(playedCards, gameState) {
  console.log("Play Card");
  // console.log(msg);

  return (msg) => {
    const cardInstanceId = msg.data.card_instance.id_;
    const cardId = msg.data.card_instance.card.id_;

    try {
      if (playedCards.includes(cardId)) {
        gameState.notification.add(`🎴 played card received again. Ignoring`);
      } else {
        const card = {
          id: cardInstanceId,
          cardId,
          cardInstanceId,
          title: msg.data.card_instance.card.title,
          description: msg.data.card_instance.card.description,
          recipients: msg.data.recipients,
          allowedActions: msg.data.allowed_actions,
          fakeCardId: msg.data.card_instance.card.fakes[0].id_,
          validTopicsForCancel: msg.data.valid_topics_for_cancel,
        };
        gameState.card.set(card);
        //gameState.mode.set('cancel_player',payload)
      }
    } catch (err) {
      gameState.notification.add(`Error Receiving Play Card`);
      console.error(err);
    }
  };
}

function heartBeatHandler() {
  return (msg) => {
    console.log("received end game event");
    gameState.notification.add(`❤️ ${msg.count}`);
  };
}

export default {
  connectionHandler,
  disconnectHandler,
  errorHandler,
  textResponseMessageHandler,
  endGame,
  playCard,
  heartBeatHandler,
};
