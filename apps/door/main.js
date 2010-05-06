
var Door = SC.Application.create({
  NAMESPACE: 'Door',
  VERSION: '0.1.0',
}) ;

// responders

Door.CLOSED = SC.Responder.create({
  // state entry action
  didBecomeFirstResponder: function() {
    Door.setPath('mainPage.mainPane.stateLabel.value', 'CLOSED');
    Door.setPath('mainPage.mainPane.openButton.isEnabled', YES);
    Door.setPath('mainPage.mainPane.closeButton.isEnabled', NO);
    Door.setPath('mainPage.mainPane.knockButton.isEnabled', YES);
  },

  // state exit action
  willLoseFirstResponder: function() {
  },

  // actions
  openDoor: function() {
    Door.makeFirstResponder(Door.OPENED);
  },

  knockDoor: function() {
    Door.setPath('mainPage.mainPane.stateLabel.value', '*KNOCK KNOCK*');
    (function() {
      Door.setPath('mainPage.mainPane.stateLabel.value', 'CLOSED');
    }).invokeLater(this, 1000);
  }
});

Door.OPENED = SC.Responder.create({
  // entry action
  didBecomeFirstResponder: function() {
    Door.setPath('mainPage.mainPane.stateLabel.value', 'OPENED');
    Door.setPath('mainPage.mainPane.openButton.isEnabled', NO);
    Door.setPath('mainPage.mainPane.closeButton.isEnabled', YES);
    Door.setPath('mainPage.mainPane.knockButton.isEnabled', NO);
  },

  // exit action
  willLoseFirstResponder: function() {
  },

  closeDoor: function() {
    Door.makeFirstResponder(Door.CLOSED);
  }
});

// UI

Door.mainPage = SC.Page.design({
  mainPane: SC.MainPane.design({
    defaultResponder: Door,

    childViews: 'stateLabel openButton closeButton knockButton'.w(),

    stateLabel: SC.LabelView.design({
      layout: { height: 22, width: 250, centerX: 0, centerY: -30 },
      textAlign: SC.ALIGN_CENTER,
      controlSize: SC.LARGE_CONTROL_SIZE
    }),

    openButton: SC.ButtonView.design({
      layout: { height: 24, width: 80, centerX: -80, centerY: 10 },
      title: 'open',
      action: 'openDoor'
    }),

    closeButton: SC.ButtonView.design({
      layout: { height: 24, width: 80, centerX: 0, centerY: 10 },
      title: 'close',
      action: 'closeDoor'
    }),

    knockButton: SC.ButtonView.design({
      layout: { height: 24, width: 80, centerX: 80, centerY: 10 },
      title: 'knock',
      action: 'knockDoor'
    })
  })
});

function main() {
  Door.getPath('mainPage.mainPane').append();

  // start state
  Door.makeFirstResponder(Door.CLOSED);
}
