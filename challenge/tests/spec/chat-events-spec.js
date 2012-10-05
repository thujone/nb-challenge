var chatData = [
    {
        "event_id": 1000,
        "event_type": "enter_room",
        "user_handle": "Cartman",
        "date": "/Date(1224043300000)/"
    },
    {
        "event_id": 1001,
        "event_type": "comment",
        "user_handle": "Cartman",
        "date": "/Date(1224043400000)/",
        "comment": "This sucks, I'm going home!"
    },
    {
        "event_id": 1002,
        "event_type": "exit_room",
        "user_handle": "Cartman",
        "date": "/Date(1224043450000)/"
    },
    {
        "event_id": 1003,
        "event_type": "high_five",
        "user_handle": "Stan",
        "date": "/Date(1224043600000)/",
        "high_fivee": "Kyle"
    }
];

describe('Chat Events', function() {

    beforeEach(function() {
        this.chatEvent = new ChatEvent(chatData[0]);
    });

    it('has an event id', function() {
        expect(this.chatEvent.get('event_id')).toEqual(1000);
    });

    it('has a valid date', function() {
        var jsonDate = this.chatEvent.get('date');
        expect(this.chatEvent.isValidDate(jsonDate)).toBeTruthy();
    });

    describe('Event Types', function() {

        it('has a comment field for comments', function() {
            this.chatEvent = new ChatEvent(chatData[1]);
            expect(this.chatEvent.get('comment')).toBeDefined();
        });

        it('has a recipient for high-fives', function() {
            this.chatEvent = new ChatEvent(chatData[3]);
            expect(this.chatEvent.get('high_fivee')).toBeDefined();
        });

    });


});
