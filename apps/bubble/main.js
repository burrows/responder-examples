var Bubble = SC.Application.create({
  NAMESPACE: 'Bubble',
  VERSION: '0.1.0',
});

Bubble.A = SC.Responder.create({
  didBecomeFirstResponder: function() {
    console.log("A didBecomeFirstResponder");
  },

  myEvent: function() {
    console.log("A myEvent");
  }
});

Bubble.A1 = SC.Responder.create({
  nextResponder: Bubble.A,
  didBecomeFirstResponder: function() {
    console.log("A.1 didBecomeFirstResponder");
  },

  myEvent: function() {
    console.log("A.1 myEvent");
    return NO;
  },

  foo: function() {
    console.log("A.1 foo");
  }
});

Bubble.A11 = SC.Responder.create({
  nextResponder: Bubble.A1,
  didBecomeFirstResponder: function() {
    console.log("A.1.1 didBecomeFirstResponder");
  }
});

Bubble.A2 = SC.Responder.create({
  nextResponder: Bubble.A,
  didBecomeFirstResponder: function() {
    console.log("A.2 didBecomeFirstResponder");
  }
});

Bubble.B = SC.Responder.create({
  didBecomeFirstResponder: function() {
    console.log("B didBecomeFirstResponder");
  }
});

Bubble.B1 = SC.Responder.create({
  nextResponder: Bubble.B,
  didBecomeFirstResponder: function() {
    console.log("B.1 didBecomeFirstResponder");
  }
});

Bubble.mainPage = SC.Page.design({
  mainPane: SC.MainPane.design({})
});

function main() {
  Bubble.getPath('mainPage.mainPane').append();
  Bubble.makeFirstResponder(Bubble.A);
}
