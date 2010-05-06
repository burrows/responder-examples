
var LockableDoor = SC.Application.create({
  NAMESPACE: 'LockableDoor',
  VERSION: '0.1.0',
}) ;

// responders

LockableDoor.CLOSED = SC.Responder.create({
  didBecomeFirstResponder: function() {
    LockableDoor.setPath('mainPage.mainPane.knockButton.isEnabled', YES);
  },

  knockDoor: function() {
    var title = LockableDoor.getPath('mainPage.mainPane.stateLabel.value');
    LockableDoor.setPath('mainPage.mainPane.stateLabel.value', '*KNOCK KNOCK*');
    (function() {
      LockableDoor.setPath('mainPage.mainPane.stateLabel.value', title);
    }).invokeLater(this, 1000);
  }
});

LockableDoor.LOCKED = SC.Responder.create({
  nextResponder: LockableDoor.CLOSED,

  didBecomeFirstResponder: function() {
    LockableDoor.setPath('mainPage.mainPane.stateLabel.value', 'LOCKED');
    LockableDoor.setPath('mainPage.mainPane.toggleOpenButton.title', 'open');
    LockableDoor.setPath('mainPage.mainPane.toggleOpenButton.isEnabled', NO);
    LockableDoor.setPath('mainPage.mainPane.toggleLockButton.title', 'unlock');
    LockableDoor.setPath('mainPage.mainPane.toggleLockButton.isEnabled', YES);
  },

  toggleLock: function() {
    LockableDoor.makeFirstResponder(LockableDoor.UNLOCKED);
  }
});

LockableDoor.UNLOCKED = SC.Responder.create({
  nextResponder: LockableDoor.CLOSED,

  didBecomeFirstResponder: function() {
    LockableDoor.setPath('mainPage.mainPane.stateLabel.value', 'UNLOCKED');
    LockableDoor.setPath('mainPage.mainPane.toggleOpenButton.title', 'open');
    LockableDoor.setPath('mainPage.mainPane.toggleOpenButton.isEnabled', YES);
    LockableDoor.setPath('mainPage.mainPane.toggleLockButton.title', 'lock');
    LockableDoor.setPath('mainPage.mainPane.toggleLockButton.isEnabled', YES);
  },

  toggleLock: function() {
    LockableDoor.makeFirstResponder(LockableDoor.LOCKED);
  },

  toggleOpen: function() {
    LockableDoor.makeFirstResponder(LockableDoor.OPENED);
  }
});

LockableDoor.OPENED = SC.Responder.create({
  didBecomeFirstResponder: function() {
    LockableDoor.setPath('mainPage.mainPane.stateLabel.value', 'OPENED');
    LockableDoor.setPath('mainPage.mainPane.toggleOpenButton.title', 'close');
    LockableDoor.setPath('mainPage.mainPane.toggleOpenButton.isEnabled', YES);
    LockableDoor.setPath('mainPage.mainPane.toggleLockButton.title', '-');
    LockableDoor.setPath('mainPage.mainPane.toggleLockButton.isEnabled', NO);
    LockableDoor.setPath('mainPage.mainPane.knockButton.isEnabled', NO);
  },

  toggleOpen: function() {
    LockableDoor.makeFirstResponder(LockableDoor.UNLOCKED);
  }
});

// UI

LockableDoor.mainPage = SC.Page.design({
  mainPane: SC.MainPane.design({
    defaultResponder: LockableDoor,

    childViews: 'stateLabel toggleOpenButton toggleLockButton knockButton'.w(),

    stateLabel: SC.LabelView.design({
      layout: { height: 22, width: 250, centerX: 0, centerY: -30 },
      textAlign: SC.ALIGN_CENTER,
      controlSize: SC.LARGE_CONTROL_SIZE
    }),

    toggleOpenButton: SC.ButtonView.design({
      layout: { height: 24, width: 80, centerX: -80, centerY: 10 },
      action: 'toggleOpen'
    }),

    toggleLockButton: SC.ButtonView.design({
      layout: { height: 24, width: 80, centerX: 0, centerY: 10 },
      action: 'toggleLock'
    }),

    knockButton: SC.ButtonView.design({
      layout: { height: 24, width: 80, centerX: 80, centerY: 10 },
      title: 'knock',
      action: 'knockDoor'
    })
  })
});

function main() {
  LockableDoor.getPath('mainPage.mainPane').append();

  // start state
  LockableDoor.makeFirstResponder(LockableDoor.LOCKED);
}
